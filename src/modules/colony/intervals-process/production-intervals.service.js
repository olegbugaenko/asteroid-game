const {
    CalculationResourcesService,
} = require('@helpers/calculation/resources');

const {
    CalculationBuildingService
} = require('@helpers/calculation/building');

const {
    CalculationResearchesService
} = require('@helpers/calculation/research');

class ProductionIntervalsService {

    static async processIntervals(intervals) {
        while (intervals.filter(item => !item.isProcessed).length > 0) {
            const index = intervals.findIndex(item => !item.isProcessed);
            //console.log('index', index, intervals);
            await ProductionIntervalsService.processInterval(intervals, index);
        }
        console.log('intervals: ', intervals);
        return intervals;
    }

    static async getResourcesIncome(status) {
        const productions = await CalculationResourcesService.fillEmptyAmounts();
        const consumptions = await CalculationResourcesService.fillEmptyAmounts();
        const income = await CalculationResourcesService.fillEmptyAmounts();
        const bonusesTotal = await CalculationResourcesService.fillEmptyBonuses();

        for(let building of status.buildings) {
            const {
                base,
                bonuses
            } = await CalculationBuildingService.getProductions(building.buildingCode, building.level, building.effiency);
            //console.log('bD: ', building);
            for(let res of base) {
                if(res.amount > 0) {
                    const i = productions.findIndex(item => item.resourceCode === res.resourceCode);
                    if(i > -1) {
                        productions[i].amount += res.amount;
                    }
                }

                if(res.amount < 0) {
                    const i = consumptions.findIndex(item => item.resourceCode === res.resourceCode);
                    if(i > -1) {
                        consumptions[i].amount += res.amount;
                    }
                }
                //here should be some logic to store consumers
            }
            for(let res of bonuses) {
                if(res.amount > 0) {
                    const i = bonusesTotal.findIndex(item => item.resourceCode === res.resourceCode);
                    if(i > -1) {
                        bonusesTotal[i].amount *= res.amount;
                    }
                }
            }
        }

        for(let research of status.researches) {
            const {
                base,
                bonuses
            } = await CalculationResearchesService.getProductions(research.researchCode, research.level, 1);
            //console.log('bD: ', building);
            for(let res of base) {
                if(res.amount > 0) {
                    const i = productions.findIndex(item => item.resourceCode === res.resourceCode);
                    if(i > -1) {
                        productions[i].amount += res.amount;
                    }
                }

                if(res.amount < 0) {
                    const i = consumptions.findIndex(item => item.resourceCode === res.resourceCode);
                    if(i > -1) {
                        consumptions[i].amount += res.amount;
                    }
                }
                //here should be some logic to store consumers
            }
            for(let res of bonuses) {
                if(res.amount > 0) {
                    const i = bonusesTotal.findIndex(item => item.resourceCode === res.resourceCode);
                    if(i > -1) {
                        bonusesTotal[i].amount *= res.amount;
                    }
                }
            }
        }

        return {
            income: income.map(inc => ({
                ...inc,
                amount: productions.find(p => p.resourceCode === inc.resourceCode).amount
                    * bonusesTotal.find(p => p.resourceCode === inc.resourceCode).amount
                    + consumptions.find(p => p.resourceCode === inc.resourceCode).amount
            })),
            productions: productions.map(prod => ({
                ...prod,
                amount: prod.amount * bonusesTotal.find(p => p.resourceCode === prod.resourceCode).amount
            })),
            consumptions,
            bonuses: bonusesTotal,
        }

    }

    static async getResourcesCaps(status) {
        const caps = await CalculationResourcesService.fillEmptyAmounts();
        const income = await CalculationResourcesService.fillEmptyAmounts();
        const bonusesTotal = await CalculationResourcesService.fillEmptyBonuses();

        for(let building of status.buildings) {
            const {
                base,
                bonuses
            } = await CalculationBuildingService.getCapacities(building.buildingCode, building.level, building.effiency);
            for(let res of base) {
                if(res.amount > 0) {
                    const i = caps.findIndex(item => item.resourceCode === res.resourceCode);
                    if(i > -1) {
                        caps[i].amount += res.amount;
                    }
                }
            }
            for(let res of bonuses) {
                if(res.amount > 0) {
                    const i = bonusesTotal.findIndex(item => item.resourceCode === res.resourceCode);
                    if(i > -1) {
                        bonusesTotal[i].amount *= res.amount;
                    }
                }
            }
        }

        for(let research of status.researches) {
            const {
                base,
                bonuses
            } = await CalculationResearchesService.getProductions(research.researchCode, research.level, 1);
            //console.log('bD: ', building);
            for(let res of base) {
                if(res.amount > 0) {
                    const i = caps.findIndex(item => item.resourceCode === res.resourceCode);
                    if(i > -1) {
                        caps[i].amount += res.amount;
                    }
                }
            }
            for(let res of bonuses) {
                if(res.amount > 0) {
                    const i = bonusesTotal.findIndex(item => item.resourceCode === res.resourceCode);
                    if(i > -1) {
                        bonusesTotal[i].amount *= res.amount;
                    }
                }
            }
        }

        return {
            capacity: income.map(inc => ({
                ...inc,
                amount: caps.find(p => p.resourceCode === inc.resourceCode).amount
                    * bonusesTotal.find(p => p.resourceCode === inc.resourceCode).amount
            })),
        }

    }

    static async getReservedAmounts(status) {
        const reserved = await CalculationResourcesService.fillEmptyAmounts();
        const income = await CalculationResourcesService.fillEmptyAmounts();
        const bonuses = await CalculationResourcesService.fillEmptyBonuses();

        for(let building of status.buildings) {
            const {
                base,
                bonuses
            } = await CalculationBuildingService.getReserved(building.buildingCode, building.level, building.effiency);
            for(let res of base) {
                if(res.amount > 0) {
                    const i = reserved.findIndex(item => item.resourceCode === res.resourceCode);
                    if(i > -1) {
                        reserved[i].amount += res.amount;
                    }
                }
            }
            for(let res of bonuses) {
                if(res.amount > 0) {
                    const i = bonuses.findIndex(item => item.resourceCode === res.resourceCode);
                    if(i > -1) {
                        bonuses[i].amount *= res.amount;
                    }
                }
            }
        }

        return {
            reserved: income.map(inc => ({
                ...inc,
                amount: reserved.find(p => p.resourceCode === inc.resourceCode).amount
                    * bonuses.find(p => p.resourceCode === inc.resourceCode).amount
            })),
        }

    }

    static async processInterval(intervals, index) {
        // first of all, get productions and usages
        const increment = await ProductionIntervalsService.getResourcesIncome(intervals[index].status);
        const {capacity} = await ProductionIntervalsService.getResourcesCaps(intervals[index].status);
        const {reserved} = await ProductionIntervalsService.getReservedAmounts(intervals[index].status);
        const amount = intervals[index].status.resources; //for some reason at some point rolls back.
        // console.log('increment: ', increment);
        // now check if need to divide
        // first of all, obtain negative increments
        let newAmount = await CalculationResourcesService.newAmount({
            production: increment.income,
            capacity: capacity,
            previousAmount: amount,
            dT: intervals[index].dT
        });
        // console.log('newAmountCalculated', newAmount);
        let minResource = null;
        for(let resource of newAmount) {
            const fndInc = increment.income.find(inc => inc.resourceCode === resource.resourceCode);
            if(!fndInc) {
                throw new Error('Not found increment '+resource.resourceCode);
            }
            if('min' in resource && resource.amount < resource.min && Math.abs(fndInc.amount) > 1.e-8) { //do need to calculate, ho much time ago it went over min
                const lack = resource.min - resource.amount;
                let dTreturn = - 3600 * 1000 * lack / (fndInc.amount + 0.001);
                if(dTreturn > intervals[index].dT) {
                    dTreturn = intervals[index].dT;
                }
                console.log('NOW: ', fndInc, resource.min, resource.amount, dTreturn);


                if(!minResource || dTreturn - minResource.dTreturn > 0) {
                    minResource = {
                        dTreturn,
                        resource
                    }
                }
            }
        }
        if(minResource) {
            const oldT = intervals[index].dT;
            intervals[index].dT = intervals[index].dT - minResource.dTreturn;
            //console.log('--- old ', oldT / (3600 * 1000), minResource.dTreturn / (3600 * 1000), minResource.resource);
            const lackCode = minResource.resource.resourceCode;
            const actual = increment.income.find(inc => inc.resourceCode === lackCode);
            const needed = increment.consumptions.find(inc => inc.resourceCode === lackCode);
            console.log('Needed', lackCode, actual, needed, oldT, minResource);
            if(!actual || !needed) {
                throw new Error('Not found needed', lackCode, actual, needed);
            }
            // calculate over effiencies
            const effiency = Math.min(1, 1 - actual.amount/(needed.amount + 0.001));
            const newTime = new Date();
            newTime.setTime(oldT + intervals[index].timeFrom - minResource.dTreturn);
            const newBuildings = await Promise.all(
                intervals[index].status.buildings
                    .map(async building => await CalculationBuildingService.mapBuildingEffiency(building, lackCode, effiency))
                );
            console.log('newBuildings',newBuildings, intervals[index].dT);
            if(intervals[index].dT < 0) {
                process.exit(0);
            }
            //process.exit(0);
            for(let effb of newBuildings) {
                if(effb.effiency < 0) {
                    process.exit(0);
                }
            }
            const newAmounts = await CalculationResourcesService.newAmount({
                production: increment.income,
                capacity: capacity,
                previousAmount: amount,
                dT: oldT - minResource.dTreturn,
            });
            intervals.splice(index+1, 0, {
                dT: minResource.dTreturn,
                timeFrom: oldT + intervals[index].timeFrom - minResource.dTreturn,
                status: {
                    ...intervals[index].status,
                    time: newTime,
                    buildings: newBuildings,
                    resources: newAmounts,
                    reserved,
                },
            })
        } else {
            if(intervals.length > index + 1) {
                intervals[index + 1].status.resources = newAmount;
            }
        }
        // check if all are valid
        intervals[index].isProcessed = true;
        intervals[index].status.production = increment.income;
        intervals[index].status.capacity = capacity;
        intervals[index].status.resourcesAfter = newAmount;
        intervals[index].status.reserved = reserved;
        return {...increment, newAmount};
    }
}

module.exports = {
    ProductionIntervalsService
};
