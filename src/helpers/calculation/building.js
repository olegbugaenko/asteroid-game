const { BuildingsRegistry } = require('@database/registry/buildings');
const { CalculationResourcesService } = require('./resources');

class CalculationBuildingService {

    static async getBuilding(code) {
        const buildings = await BuildingsRegistry.buildingsList();
        return buildings.find(item => item.code === code);
    }

    static async listWithPrices(status) {
        const buildings = await BuildingsRegistry.buildingsList();
        const mappedBuildings = buildings.map(building => ({
            _id: building._id,
            code: building.code,
            maxLevel: building.maxLevel,
            name: building.name,
            description: building.description,
            level: (status.buildings.find(sb => sb.buildingCode === building.code) || {level: 0}).level,
        }));
        for(let i = 0; i < mappedBuildings.length; i++) {
            const mb = mappedBuildings[i];
            console.log(mb);
            const costs = await CalculationBuildingService.getCost(mb.code, mb.level + 1);
            let time = 0;
            for(let cost of costs.base) {
                if(cost.resourceCode === 'building') {
                    time = cost.amount /
                        (status.production.find(item => item.resourceCode === 'building').amount + 0.001);
                }
            }
            mappedBuildings[i].cost = costs.base;
            mappedBuildings[i].time = time;
            mappedBuildings[i].isUpgradeAvailable = await CalculationBuildingService.isBuildingAvailable(mb.code, mb.level, status);
            const reserved = await CalculationBuildingService.getReserved(mb.code, mb.level + 1, 1);
            mappedBuildings[i].reserved = reserved.base;
            const productions = await CalculationBuildingService.getProductions(mb.code, mb.level + 1, 1);
            mappedBuildings[i].production = productions.base;
        }
        return mappedBuildings;
    }

    static async listInQueue(status, queue) {
        const buildings = await BuildingsRegistry.buildingsList();
        return queue.map(q => {
            const info = buildings.find(building => building.code === q.order.code);
            let progress = 0;
            const maxprogress = q.dT;
            if(q.status === 'inprogress') {
                progress = ((new Date()).getTime() - (new Date(q.startTime)).getTime());
            }
            const percentage = progress / (maxprogress + 0.0001);
            const cb = status.buildings.find(mb => mb.buildingCode === q.order.code);
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
                buildingCode: q.order.code,
                status: q.status,
            }
        })
    }

    static async getProductions(code, level, effiency) {
        const result =  {
            base: await CalculationResourcesService.fillEmptyAmounts(),
            bonuses: await CalculationResourcesService.fillEmptyBonuses(),
        }
        const buildingInfo = await CalculationBuildingService.getBuilding(code);
        const production = buildingInfo.production;
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
        const buildingInfo = await CalculationBuildingService.getBuilding(code);
        const production = buildingInfo.capacity || [];
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

    static async mapBuildingEffiency(building, lackCode, effiency) {
        const productions = await CalculationBuildingService.getProductions(building.buildingCode, building.level, building.effiency);
        // console.log('prods', productions);
        console.log('EFF: ', lackCode, building.effiency, effiency);
        const foundConsumption = productions.base.find(res => res.resourceCode === lackCode);
        if(foundConsumption.amount < 0) {
            return ({
                ...building,
                effiency: building.effiency * effiency,
            })
        }
        return building;
    }

    static async getCost(code, level) {
        const result =  {
            base: await CalculationResourcesService.fillEmptyAmounts(),
            bonuses: await CalculationResourcesService.fillEmptyBonuses(),
        }
        const buildingInfo = await CalculationBuildingService.getBuilding(code);
        if(!buildingInfo) {
            throw new Error(`Unable to find building ${code}`);
        }
        const cost = buildingInfo.cost;
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
        const buildingInfo = await CalculationBuildingService.getBuilding(code);
        if(!buildingInfo) {
            throw new Error(`Unable to find building ${code}`);
        }
        const reserved = buildingInfo.reserved || [];
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
        const nextReserved = await CalculationBuildingService.getReserved(code, level+1, 1);
        const prevReserved = await CalculationBuildingService.getReserved(code, level, 1);
        return CalculationResourcesService.subtractResources(nextReserved.base, prevReserved.base);
    }

    static async isBuildingAvailable(code, level, status) {
        const buildingInfo = await CalculationBuildingService.getBuilding(code);
        if(buildingInfo.maxLevel <= level) {
            return false;
        }
        if(buildingInfo.requirements) {
            for(let requirement of buildingInfo.requirements) {
                if(requirement.scope === 'building') {
                    const currentLevel = status.buildings
                        .find(item => item.buildingCode === requirement.code);
                    console.log('RRREQ: ', requirement, currentLevel, status.buildings);
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
    CalculationBuildingService,
}
