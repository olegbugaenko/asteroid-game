module.exports = [{
    name: 'Solar Plant',
    maxLevel: 10000,
    code: 'solarplant',
    cost: [{
        resourceCode: 'metal',
        formulaId: 1,
        A: 35,
        D: 1.4,
        C: 0.3,
    },{
        resourceCode: 'building',
        formulaId: 1,
        A: 55000,
        D: 1.4,
        C: 0.3,
    }],
    production: [{
        resourceCode: 'electricity',
        formulaId: 1,
        isPercentage: false,
        A: 35,
        D: 1.12,
        C: 1,
    },{
        resourceCode: 'water',
        formulaId: 1,
        isPercentage: false,
        A: -15,
        D: 1.1,
        C: 1,
    }],
    reserved: [{
        resourceCode: 'population',
        formulaId: 1,
        isPercentage: false,
        A: 13,
        D: 1.1,
        C: 1,
    }]
}]
