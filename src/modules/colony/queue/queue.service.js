const db = require("@database");
const {
    CalculationBuildingService,
    CalculationResourceService,
    CalculationResearchesService
} = require('@helpers/calculation');

class QueueService {

    static async getPreviousQueueItem({colonyCode, scope}) {
        return db.model('ColonyQueue').findOne({
            colonyCode,
            order: {
                scope,
            }
        }, null, {
            sort: {
                startTime: -1,
            }
        })
    }

    static async getQueueList({colonyCode, statuses, scope}) {
        const filter = {colonyCode};
        if(statuses) {
            filter.status = {
                $in: statuses,
            }
        }
        if(scope) {
            filter['order.scope'] = scope;
        }
        console.log('flt: ', filter);
        return db().model('ColonyQueue').find(filter).sort({
            scheduledTime: 1,
        }).lean();
    }

    static async sortQueueItems({queueItems, status, time}) {
        const potentialTimeStarts = {};
        console.log('sortingItems: ', queueItems);
        const potStatus = JSON.parse(JSON.stringify(status));
        for(let queueItem of queueItems) {
            let startTime = time || queueItem.scheduledTime;
            if(startTime < queueItem.scheduledTime) {
                startTime = queueItem.scheduledTime;
            }
            if(queueItem.status === 'inprogress') {
                startTime = queueItem.startTime;
            }
            if(queueItem.order.scope in potentialTimeStarts && potentialTimeStarts[queueItem.order.scope] > startTime) {
                startTime = potentialTimeStarts[queueItem.order.scope];
            }
            startTime = new Date(startTime);
            let cost = null;
            let prod = null;
            if(queueItem.order.scope === 'building') {
                const currentLevelId = potStatus.buildings
                    .findIndex(item => item.buildingCode === queueItem.order.code);
                if(currentLevelId > -1) {
                    potStatus.buildings[currentLevelId].level += queueItem.order.level;
                } else {
                    potStatus.buildings.push({
                        buildingCode: queueItem.order.code,
                        level: queueItem.order.level,
                        effiency: 1,
                    });
                }
                const costItems = await CalculationBuildingService
                    .getCost(queueItem.order.code, (potStatus.buildings
                        .find(item => item.buildingCode === queueItem.order.code) || {level: 0}).level);
                prod = potStatus.production.find(item => item.resourceCode === 'building').amount;
                cost = costItems.base.find(item => item.resourceCode === 'building').amount;
                // console.log('C: ', cost, prod, costItems.base);
            } else
            if(queueItem.order.scope === 'research') {
                const currentLevelId = potStatus.researches
                    .findIndex(item => item.researchCode === queueItem.order.code);
                if(currentLevelId > -1) {
                    potStatus.researches[currentLevelId].level += queueItem.order.level;
                } else {
                    potStatus.researches.push({
                        researchCode: queueItem.order.code,
                        level: queueItem.order.level,
                        effiency: 1,
                    });
                }
                const costItems = await CalculationResearchesService
                    .getCost(queueItem.order.code, (potStatus.researches
                        .find(item => item.researchCode === queueItem.order.code) || {level: 0}).level);
                prod = potStatus.production.find(item => item.resourceCode === 'research').amount;
                cost = costItems.base.find(item => item.resourceCode === 'research').amount;
                // console.log('C: ', cost, prod, costItems.base);
            }
            queueItem.startTime = startTime;
            if(!cost) {
                queueItem.dT = 0;
            }
            if(!prod) {
                queueItem.dT = cost;
            }

            queueItem.dT = cost/(prod + 0.001);
            potentialTimeStarts[queueItem.order.scope] = (new Date()).setTime(startTime.getTime() + queueItem.dT);
        }
        return queueItems.sort((a,b) => a.startTime > b.startTime ? 1 : -1);
    }

    static async _createQueueItem(queueData) {
        return db().model('ColonyQueue').create(queueData);
    }

    static async sheduleBuildingUpgrade({colonyCode, buildingCode, level}) {
        return QueueService._createQueueItem({
            isFinished: false,
            scheduledTime: new Date,
            colonyCode,
            order: {
                scope: 'building',
                code: buildingCode,
                level: level,
            },
            status: 'scheduled'
        })
    }

    static async sheduleResearchUpgrade({colonyCode, researchCode, level}) {
        return QueueService._createQueueItem({
            isFinished: false,
            scheduledTime: new Date,
            colonyCode,
            order: {
                scope: 'research',
                code: researchCode,
                level: level,
            },
            status: 'scheduled'
        })
    }

}

module.exports = {
    QueueService,
}
