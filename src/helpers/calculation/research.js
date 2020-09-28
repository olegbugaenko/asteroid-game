const { ResearchesRegistry } = require('@database/registry/research');
const { CalculationResourcesService } = require('./resources');

class CalculationResearchesService {

    static async getResearch(code) {
        const researches = await ResearchesRegistry.researchesList();
        return researches.find(item => item.code === code);
    }

    static async listWithPrices(status) {
        const researches = await ResearchesRegistry.researchesList();
        const mappedResearches = researches.map(research => ({
            _id: research._id,
            code: research.code,
            maxLevel: research.maxLevel,
            name: research.name,
            description: research.description,
            level: (status.researches.find(sb => sb.researchCode === research.code) || {level: 0}).level,
        }));
        for(let i = 0; i < mappedResearches.length; i++) {
            const mb = mappedResearches[i];
            console.log(mb);
            const costs = await CalculationResearchesService.getCost(mb.code, mb.level + 1);
            let time = 0;
            for(let cost of costs.base) {
                if(cost.resourceCode === 'research') {
                    time = cost.amount /
                        (status.production.find(item => item.resourceCode === 'research').amount + 0.001);
                }
            }
            mappedResearches[i].cost = costs.base;
            mappedResearches[i].time = time;
            mappedResearches[i].isUpgradeAvailable = await CalculationResearchesService.isResearchAvailable(mb.code, mb.level, status);
            const reserved = await CalculationResearchesService.getReserved(mb.code, mb.level + 1, 1);
            mappedResearches[i].reserved = reserved.base;
            const productions = await CalculationResearchesService.getProductions(mb.code, mb.level + 1, 1);
            mappedResearches[i].production = productions.bonuses;
        }
        return mappedResearches;
    }

    static async listInQueue(status, queue) {
        const researches = await ResearchesRegistry.researchesList();
        return queue.map(q => {
            const info = researches.find(research => research.code === q.order.code);
            let progress = 0;
            const maxprogress = q.dT;
            if(q.status === 'inprogress') {
                progress = ((new Date()).getTime() - (new Date(q.startTime)).getTime());
            }
            const percentage = progress / (maxprogress + 0.0001);
            const cb = status.researches.find(mb => mb.researchCode === q.order.code);
            let level = 0;
            if(cb) {
                level = cb.level;
            }
            return {
                name: info.name,
                level: level + q.order.level,
                progress,
                maxprogress: maxprogress ? maxprogress : 1,
                percentage,
                researchCode: q.order.code,
                status: q.status,
            }
        })
    }

    static async getProductions(code, level, effiency) {
        const result =  {
            base: await CalculationResourcesService.fillEmptyAmounts(),
            bonuses: await CalculationResourcesService.fillEmptyBonuses(),
        }
        const researchInfo = await CalculationResearchesService.getResearch(code);
        const production = researchInfo.production;
        for(const resource of production) {
            const amount = CalculationResourcesService.calculateFormula(resource, level, effiency);
            if(resource.isPercentage) {
                const i = result.bonuses.findIndex(item => item.resourceCode === resource.resourceCode);
                result.bonuses[i].amount = amount;
            } else {
                const i = result.base.findIndex(item => item.resourceCode === resource.resourceCode);
                result.base[i].amount = amount;
            }
        }
        return result;
    }

    static async getCapacities(code, level, effiency) {
        const result =  {
            base: await CalculationResourcesService.fillEmptyAmounts(),
            bonuses: await CalculationResourcesService.fillEmptyBonuses(),
        }
        const researchInfo = await CalculationResearchesService.getResearch(code);
        const production = researchInfo.capacity || [];
        for(const resource of production) {
            const amount = CalculationResourcesService.calculateFormula(resource, level, effiency);
            if(resource.isPercentage) {
                const i = result.bonuses.findIndex(item => item.resourceCode === resource.resourceCode);
                result.bonuses[i].amount = amount;
            } else {
                const i = result.base.findIndex(item => item.resourceCode === resource.resourceCode);
                result.base[i].amount = amount;
            }
        }
        return result;
    }

    static async getCost(code, level) {
        const result =  {
            base: await CalculationResourcesService.fillEmptyAmounts(),
            bonuses: await CalculationResourcesService.fillEmptyBonuses(),
        }
        const researchInfo = await CalculationResearchesService.getResearch(code);
        if(!researchInfo) {
            throw new Error(`Unable to find research ${code}`);
        }
        const cost = researchInfo.cost;
        for(const resource of cost) {
            const amount = CalculationResourcesService.calculateFormula(resource, level, 1);
            if(resource.isPercentage) {
                const i = result.bonuses.findIndex(item => item.resourceCode === resource.resourceCode);
                result.bonuses[i].amount = amount;
            } else {
                const i = result.base.findIndex(item => item.resourceCode === resource.resourceCode);
                result.base[i].amount = amount;
            }
        }
        return result;
    }

    static async getReserved(code, level, effiency) {
        const result =  {
            base: await CalculationResourcesService.fillEmptyAmounts(),
            bonuses: await CalculationResourcesService.fillEmptyBonuses(),
        }
        const researchInfo = await CalculationResearchesService.getResearch(code);
        if(!researchInfo) {
            throw new Error(`Unable to find research ${code}`);
        }
        const reserved = researchInfo.reserved || [];
        for(const resource of reserved) {
            const amount = CalculationResourcesService.calculateFormula(resource, level, effiency);
            if(resource.isPercentage) {
                const i = result.bonuses.findIndex(item => item.resourceCode === resource.resourceCode);
                result.bonuses[i].amount = amount;
            } else {
                const i = result.base.findIndex(item => item.resourceCode === resource.resourceCode);
                result.base[i].amount = amount;
            }
        }
        return result;
    }

    static async getReservedDelta(code, level) {
        const nextReserved = await CalculationResearchesService.getReserved(code, level+1, 1);
        const prevReserved = await CalculationResearchesService.getReserved(code, level, 1);
        return CalculationResourcesService.subtractResources(nextReserved.base, prevReserved.base);
    }

    static async isResearchAvailable(code, level, status) {
        const researchInfo = await CalculationResearchesService.getResearch(code);
        if(researchInfo.maxLevel <= level) {
            return false;
        }
        if(researchInfo.requirements) {
            for(let requirement of researchInfo.requirements) {
                if(requirement.scope === 'research') {
                    const currentLevel = status.researches
                        .find(item => item.researchCode === requirement.code);
                    console.log('RRREQ_RES: ', requirement, currentLevel, status.researches);
                    if(!currentLevel) {
                        return false;
                    }
                    if(currentLevel.level < requirement.scope.level) {
                        return false;
                    }
                }
                if(requirement.scope === 'research') {
                    const currentLevel = status.researches
                        .find(item => item.researchCode === requirement.code);
                    console.log('RRREQ: ', requirement, currentLevel, status.researches);
                    if(!currentLevel) {
                        return false;
                    }
                    if(currentLevel.level < requirement.scope.level) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

}

module.exports = {
    CalculationResearchesService,
}
