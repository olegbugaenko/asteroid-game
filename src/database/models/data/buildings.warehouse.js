module.exports = [{
    name: 'Warehouse',
    maxLevel: 10000,
    code: 'warehouse',
    cost: [{
        resourceCode: 'metal',
        formulaId: 1,
        A: 125,
        D: 1.4,
        C: 0.3,
    },{
        resourceCode: 'building',
        formulaId: 1,
        A: 135000,
        D: 1.4,
        C: 0.3,
    }],
    production: [{
        resourceCode: 'water',
        formulaId: 1,
        isPercentage: false,
        A: -3,
        D: 1.1,
        C: 1,
    },{
        resourceCode: 'oxygen',
        formulaId: 1,
        isPercentage: false,
        A: -3,
        D: 1.1,
        C: 1,
    },{
        resourceCode: 'electricity',
        formulaId: 1,
        isPercentage: false,
        A: -6,
        C: 1,
        D: 1.1,
    }],
    reserved: [{
        resourceCode: 'population',
        formulaId: 1,
        isPercentage: false,
        A: 11,
        D: 1.4,
        C: 1,
    }],
    capacity: [{
        resourceCode: 'metal',
        formulaId: 1,
        isPercentage: false,
        A: 2000,
        D: 1.4,
        C: 1,
    },{
        resourceCode: 'crystal',
        formulaId: 1,
        isPercentage: false,
        A: 2000,
        D: 1.4,
        C: 1,
    }],
    requirements: [{
        scope: 'building',
        code: 'metalmine',
        level: 5
    }]
}]
