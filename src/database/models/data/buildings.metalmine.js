module.exports = [{
    name: 'Metal Mine',
    maxLevel: 10000,
    code: 'metalmine',
    cost: [{
        resourceCode: 'metal',
        formulaId: 1,
        A: 25,
        D: 1.4,
        C: 0.3,
    },{
        resourceCode: 'building',
        formulaId: 1,
        A: 35000,
        D: 1.4,
        C: 0.3,
    }],
    production: [{
        resourceCode: 'metal',
        formulaId: 1,
        isPercentage: false,
        A: 45,
        D: 1.1,
        C: 1,
    },{
        resourceCode: 'water',
        formulaId: 1,
        isPercentage: false,
        A: -7,
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
        A: -13,
        C: 1,
        D: 1.1,
    }],
    reserved: [{
        resourceCode: 'population',
        formulaId: 1,
        isPercentage: false,
        A: 23,
        D: 1.1,
        C: 1,
    }],
    capacity: [{
        resourceCode: 'metal',
        formulaId: 1,
        isPercentage: false,
        A: 350,
        D: 1.1,
        C: 1,
    }]
},{
    name: 'Crystal Mine',
    maxLevel: 10000,
    code: 'crystalmine',
    cost: [{
        resourceCode: 'metal',
        formulaId: 1,
        A: 125,
        D: 1.4,
        C: 0.3,
    },{
        resourceCode: 'building',
        formulaId: 1,
        A: 75000,
        D: 1.4,
        C: 0.3,
    },{
        resourceCode: 'crystal',
        formulaId: 1,
        A: 25,
        D: 1.4,
        C: 0.3,
    }],
    production: [{
        resourceCode: 'crystal',
        formulaId: 1,
        isPercentage: false,
        A: 15,
        D: 1.1,
        C: 1,
    },{
        resourceCode: 'water',
        formulaId: 1,
        isPercentage: false,
        A: -12,
        D: 1.1,
        C: 1,
    },{
        resourceCode: 'oxygen',
        formulaId: 1,
        isPercentage: false,
        A: -15,
        D: 1.1,
        C: 1,
    },{
        resourceCode: 'electricity',
        formulaId: 1,
        isPercentage: false,
        A: -18,
        C: 1,
        D: 1.1,
    }],
    reserved: [{
        resourceCode: 'population',
        formulaId: 1,
        isPercentage: false,
        A: 43,
        D: 1.1,
        C: 1,
    }],
    capacity: [{
        resourceCode: 'crystal',
        formulaId: 1,
        isPercentage: false,
        A: 350,
        D: 1.1,
        C: 1,
    }],
    requirements: [{
        scope: 'building',
        code: 'solarplant',
        level: 5
    }]
},{
    name: 'Fuel Collector',
    maxLevel: 10000,
    code: 'fuelmine',
    cost: [{
        resourceCode: 'metal',
        formulaId: 1,
        A: 185,
        D: 1.4,
        C: 0.3,
    },{
        resourceCode: 'building',
        formulaId: 1,
        A: 55000,
        D: 1.4,
        C: 0.3,
    },{
        resourceCode: 'crystal',
        formulaId: 1,
        A: 35,
        D: 1.4,
        C: 0.3,
    }],
    production: [{
        resourceCode: 'fuel',
        formulaId: 1,
        isPercentage: false,
        A: 25,
        D: 1.1,
        C: 1,
    },{
        resourceCode: 'water',
        formulaId: 1,
        isPercentage: false,
        A: -22,
        D: 1.1,
        C: 1,
    },{
        resourceCode: 'oxygen',
        formulaId: 1,
        isPercentage: false,
        A: -15,
        D: 1.1,
        C: 1,
    },{
        resourceCode: 'electricity',
        formulaId: 1,
        isPercentage: false,
        A: -18,
        C: 1,
        D: 1.1,
    }],
    reserved: [{
        resourceCode: 'population',
        formulaId: 1,
        isPercentage: false,
        A: 38,
        D: 1.1,
        C: 1,
    }],
    capacity: [{
        resourceCode: 'crystal',
        formulaId: 1,
        isPercentage: false,
        A: 350,
        D: 1.1,
        C: 1,
    }],
    requirements: [{
        scope: 'building',
        code: 'solarplant',
        level: 6
    },{
        scope: 'research',
        code: 'chemistry',
        level: 2,
    }]
}]
