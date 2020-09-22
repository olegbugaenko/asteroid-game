module.exports = [{
    name: 'Tank',
    maxLevel: 10000,
    code: 'tank',
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
        A: -5,
        D: 1.1,
        C: 1,
    },{
        resourceCode: 'oxygen',
        formulaId: 1,
        isPercentage: false,
        A: -5,
        D: 1.1,
        C: 1,
    },{
        resourceCode: 'electricity',
        formulaId: 1,
        isPercentage: false,
        A: -9,
        C: 1,
        D: 1.1,
    }],
    reserved: [{
        resourceCode: 'population',
        formulaId: 1,
        isPercentage: false,
        A: 14,
        D: 1.4,
        C: 1,
    }],
    capacity: [{
        resourceCode: 'water',
        formulaId: 1,
        isPercentage: false,
        A: 2000,
        D: 1.4,
        C: 1,
    },{
        resourceCode: 'oxygen',
        formulaId: 1,
        isPercentage: false,
        A: 2000,
        D: 1.4,
        C: 1,
    },{
        resourceCode: 'fuel',
        formulaId: 1,
        isPercentage: false,
        A: 2000,
        D: 1.4,
        C: 1,
    }],
    requirements: [{
        scope: 'building',
        code: 'watergenerator',
        level: 5
    },{
        scope: 'building',
        code: 'oxygengenerator',
        level: 5
    }]
}]
