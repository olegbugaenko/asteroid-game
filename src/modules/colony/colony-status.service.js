const { uuid } = require('uuidv4');
const { ProductionIntervalsService } = require('./intervals-process/production-intervals.service');
const { QueueService } = require('./queue/queue.service');
const { QuestsService } = require('./../quests/quests.service');
const {
    CalculationBuildingService,
    CalculationResourcesService,
    CalculationResearchesService
} = require('@helpers/calculation');
const db = require("@database");

class ColonyStatusService {

    static async getStatus({code, time}) {
        const colony = await db().model('Colony').findOne({
            code,
        }).lean();
        const recalculated = await ColonyStatusService.calculate({
            colony,
            time: time ? new Date(time) : new Date(),
        })
        return recalculated;
    }

    static async calculate({
        colony,
        time
    }) {
        const intervals = [];
        const status = colony.status;
        const timeFrom = new Date(colony.status.time);
        const dT = time.getTime() - timeFrom.getTime();
        intervals.push({
            status,
            timeFrom: timeFrom.getTime(),
            dT
        });
        intervals.push({
            status,
            timeFrom: timeFrom.getTime() + dT,
            dT: 0,
        });
        console.log('intervals: ', intervals, time);
        const intrvs = await ProductionIntervalsService.processIntervals(intervals);
        return intrvs;
    }

    static async getCalculatedStatus({ colony, time }) {
        const result = await ColonyStatusService.calculate({
            colony,
            time
        });
        if(!result.length) return null;

        return {
            ...result[result.length - 1],
            status: {
                ...result[result.length - 1].status,
                time: new Date(time),
            }
        };
    }

    static async makeTick({ colonyCode, timeTick = new Date(), isTest }) {
        const queuedActions = await QueueService.getQueueList({
            colonyCode: colonyCode,
            statuses: ['scheduled', 'inprogress']
        });
        const colony = await db().model('Colony').findOne({
            code: colonyCode,
        }).lean();
        const currentAssert = new Date(colony.status.time);
        let statusNew = {...colony};
        const queueItemsUpdate = [];
        let queueSortedItems = [...queuedActions];
        console.log('Q: ', queueSortedItems, currentAssert);
        while(currentAssert < new Date(timeTick)) {
            console.log('Q2: ', queueSortedItems, currentAssert);
            if(queueSortedItems.length <= 0) {
                statusNew = await ColonyStatusService.getCalculatedStatus({ colony: statusNew, time: new Date(timeTick) });
                currentAssert.setTime((new Date(timeTick)).getTime());
                continue;
            }
            statusNew = await ColonyStatusService.getCalculatedStatus({ colony: statusNew, time: currentAssert });
            queueSortedItems = await QueueService.sortQueueItems({queueItems: queueSortedItems, status: statusNew.status, time: currentAssert});

            // do staff with scheduled items
            // here we need:
            // if item scheduled - calculate time and resources needed, make in-progress if first in queue
            // if item in progress - check if finished. if yes - increment status
            const [ currentItem ] = queueSortedItems;
            if(queueSortedItems[0].status === 'scheduled' && queueSortedItems[0].startTime <= currentAssert) {
                let resRequired;
                let resReserved;
                if(currentItem.order.scope === 'building') {
                    resRequired = await CalculationBuildingService.getCost(currentItem.order.code, currentItem.order.level + (statusNew.status.buildings
                        .find(item => item.buildingCode === currentItem.order.code) || {level: 0}).level);
                    resReserved = await CalculationBuildingService.getReservedDelta(currentItem.order.code, (statusNew.status.buildings
                        .find(item => item.buildingCode === currentItem.order.code) || {level: 0}).level, 1);
                    console.log('resReserved', resReserved, currentItem.order.level + (statusNew.status.buildings
                        .find(item => item.buildingCode === currentItem.order.code) || {level: 0}).level);
                    if(!CalculationBuildingService.isBuildingAvailable(currentItem.order.code, currentItem.order.level + (statusNew.status.buildings
                        .find(item => item.buildingCode === currentItem.order.code) || {level: 0}).level)) {
                        console.log('nAvailTime: ',currentAssert);
                        queueSortedItems[0].status = 'canceled';
                        queueItemsUpdate.push(queueSortedItems.shift());
                        continue;
                    }
                }
                if(currentItem.order.scope === 'research') {
                    resRequired = await CalculationResearchesService.getCost(currentItem.order.code, currentItem.order.level + (statusNew.status.researches
                        .find(item => item.researchCode === currentItem.order.code) || {level: 0}).level);
                    resReserved = await CalculationResearchesService.getReservedDelta(currentItem.order.code, (statusNew.status.researches
                        .find(item => item.researchCode === currentItem.order.code) || {level: 0}).level, 1);
                    console.log('resReserved', resReserved, currentItem.order.level + (statusNew.status.researches
                        .find(item => item.researchCode === currentItem.order.code) || {level: 0}).level);
                    if(!CalculationResearchesService.isResearchAvailable(currentItem.order.code, currentItem.order.level + (statusNew.status.researches
                        .find(item => item.researchCode === currentItem.order.code) || {level: 0}).level)) {
                        console.log('nAvailTime: ',currentAssert);
                        queueSortedItems[0].status = 'canceled';
                        queueItemsUpdate.push(queueSortedItems.shift());
                        continue;
                    }
                }
                if(resRequired) {

                    const newAmount = await CalculationResourcesService.subtractResources(statusNew.status.resourcesAfter, resRequired.base);
                    let afterReserve = newAmount;
                    if(resReserved) {
                        afterReserve = await CalculationResourcesService.subtractResources(newAmount, resReserved);
                    }

                    const isEnought = await CalculationResourcesService.isEnought(afterReserve);
                    if(!isEnought) {
                        console.log('nETime: ',currentAssert);
                        queueSortedItems[0].status = 'canceled';
                        queueItemsUpdate.push(queueSortedItems.shift());
                        continue;
                    }
                    statusNew.status.resources = newAmount;
                    console.log('newAmount: ', newAmount)
                }
                queueSortedItems[0].status = 'inprogress';
                queueItemsUpdate.push(queueSortedItems[0]);
                //get if enough resources
            }
            if(queueSortedItems[0].status === 'inprogress') {
                const newTime = new Date(currentAssert);
                newTime.setTime((new Date(queueSortedItems[0].startTime)).getTime() + queueSortedItems[0].dT);
                console.log('newTime: ', newTime);
                if(newTime <= currentAssert) {
                    queueSortedItems[0].status = 'done';
                    //get bonuses, and update base
                    if(queueSortedItems[0].order.scope === 'building') {
                       const bInd = statusNew.status.buildings
                           .findIndex(building => building.buildingCode === queueSortedItems[0].order.code);
                       console.log('BUILT: ', bInd);
                        if(bInd > -1) {
                            statusNew.status.buildings[bInd].level += queueSortedItems[0].order.level;
                        } else {
                            statusNew.status.buildings.push({
                                buildingCode: queueSortedItems[0].order.code,
                                level: queueSortedItems[0].order.level,
                                effiency: 1,
                            });
                        }
                    }
                    if(queueSortedItems[0].order.scope === 'research') {
                        const bInd = statusNew.status.researches
                            .findIndex(research => research.researchCode === queueSortedItems[0].order.code);
                        console.log('BUILT: ', bInd);
                        if(bInd > -1) {
                            statusNew.status.researches[bInd].level += queueSortedItems[0].order.level;
                        } else {
                            statusNew.status.researches.push({
                                researchCode: queueSortedItems[0].order.code,
                                level: queueSortedItems[0].order.level,
                            });
                        }
                    }
                    statusNew.status.buildings = statusNew.status.buildings.map(building => ({...building, effiency: 1}));
                    queueItemsUpdate.push(queueSortedItems.shift());
                }
                else {
                    if(queueSortedItems.length > 1) {
                        currentAssert.setTime((new Date(queueSortedItems[1].startTime)).getTime());
                        console.log('NextStart: ', currentAssert, queueSortedItems[1].startTime);
                    } else {
                        currentAssert.setTime(newTime.getTime());
                        console.log('newTime: ', currentAssert, newTime);
                    }
                    continue;
                }

            }
            if(queueSortedItems.length > 0) {
                currentAssert.setTime((new Date(queueSortedItems[0].startTime)).getTime());
            }
            console.log('ITER: ', currentAssert, queueSortedItems);
        }
        console.log('ATFINISH: ',statusNew.status.resources, statusNew.status.resourcesAfter);
        // statusNew.status.resources = {...statusNew.status.resourcesAfter};
        statusNew = await ColonyStatusService.getCalculatedStatus({ colony: statusNew, time: new Date(timeTick) });

        const newQuestsStatuses = await QuestsService.tickNextQuest(statusNew.status);

        if(newQuestsStatuses.bounty && newQuestsStatuses.bounty.length) {
            const newAmount = await CalculationResourcesService.modifyResources(statusNew.status.resourcesAfter, newQuestsStatuses.bounty);
            statusNew.status.resources = newAmount;
            statusNew = await ColonyStatusService.getCalculatedStatus({ colony: statusNew, time: new Date(timeTick) });
        }

        if(!isTest && new Date(timeTick) < new Date()) {
            const updated = await db().model('Colony').findOneAndUpdate({
                code: colonyCode,
            },{
                status: {...statusNew.status, resources: statusNew.status.resourcesAfter, quests: newQuestsStatuses.quests.map(item => ({
                        questCode: item.questCode,
                        status: item.status,
                        isHidden: item.isHidden,
                    }))},
            });
            for(let updated of queueItemsUpdate) {
                const updatedData = await db().model('ColonyQueue').findOneAndUpdate({
                    _id: updated._id,
                },updated);
            }
        }
        return {
            name: colony.name,
            statusNew,
            queueItemsUpdate,
            quests: newQuestsStatuses,
        }
    }

    static async listBuildingsAvailable({ colonyCode }) {
        const {statusNew} = await ColonyStatusService.makeTick({ colonyCode, timeTick: new Date()});
        const buildingsList = statusNew.status.buildings;
        const buildingsAvailable = await CalculationBuildingService.listWithPrices(statusNew.status);
        return buildingsAvailable;
    }

    static async listBuildingsQueue({ colonyCode }) {
        const {statusNew} = await ColonyStatusService.makeTick({ colonyCode, timeTick: new Date()});
        const buildingsList = statusNew.status.buildings;
        const queuedBuildings = await QueueService.getQueueList({
            colonyCode: colonyCode,
            statuses: ['scheduled', 'inprogress'],
            scope: 'building'
        });
        const buildingsInQueue = await CalculationBuildingService.listInQueue(statusNew.status, queuedBuildings);
        return buildingsInQueue;
    }

    static async listResearchesAvailable({ colonyCode }) {
        const {statusNew} = await ColonyStatusService.makeTick({ colonyCode, timeTick: new Date()});
        const researchesList = statusNew.status.researches;
        const researchesAvailable = await CalculationResearchesService.listWithPrices(statusNew.status);
        return researchesAvailable;
    }

    static async listResearchesQueue({ colonyCode }) {
        const {statusNew} = await ColonyStatusService.makeTick({ colonyCode, timeTick: new Date()});
        const researchesList = statusNew.status.researches;
        const queuedResearches = await QueueService.getQueueList({
            colonyCode: colonyCode,
            statuses: ['scheduled', 'inprogress'],
            scope: 'research'
        });
        const researchesInQueue = await CalculationResearchesService.listInQueue(statusNew.status, queuedResearches);
        return researchesInQueue;
    }

    static async createNewColony() {
        const code = uuid();
        return db().model('Colony').create({
            name: code,
            code,
            status: {
                time: new Date(),
                resources: [{
                    resourceCode: 'metal',
                    amount: 500,
                },{
                    resourceCode: 'oxygen',
                    amount: 300,
                },{
                    resourceCode: 'water',
                    amount: 300,
                },{
                    resourceCode: 'population',
                    amount: 300,
                }],
                researches: [],
                buildings: [{
                    buildingCode: 'colony',
                    level: 1,
                }],
            }
        });
    }
}

module.exports.ColonyStatusService = ColonyStatusService;
