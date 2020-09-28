module.exports = [{
    name: 'Factory',
    maxLevel: 100000,
    code: 'factory',
    cost: [],
    production: [{
        resourceCode: 'oxygen',
        formulaId: 1,
        isPercentage: false,
        A: -20,
        C: 1,
        D: 1,
    },{
        resourceCode: 'water',
        formulaId: 1,
        isPercentage: false,
        A: -20,
        C: 1,
        D: 1,
    },{
        resourceCode: 'electricity',
        formulaId: 1,
        isPercentage: false,
        A: -15,
        C: 1,
        D: 1,
    },{
        resourceCode: 'building',
        formulaId: 1,
        isPercentage: false,
        A: 1,
        C: 1,
        D: 1,
    }],
    reserved: [{
        resourceCode: 'population',
        formulaId: 1,
        isPercentage: false,
        A: 45,
        D: 1.8,
        C: 1,
    }],
    requirements: [{
        scope: 'building',
        code: 'metalmine',
        level: 7
    },{
        scope: 'research',
        code: 'physics',
        level: 3,
    },{
        scope: 'research',
        code: 'math',
        level: 2,
    }],
    capacity: []
},{
    name: 'Laboratory',
    maxLevel: 100000,
    code: 'laboratory',
    cost: [],
    production: [{
        resourceCode: 'oxygen',
        formulaId: 1,
        isPercentage: false,
        A: -20,
        C: 1,
        D: 1,
    },{
        resourceCode: 'water',
        formulaId: 1,
        isPercentage: false,
        A: -20,
        C: 1,
        D: 1,
    },{
        resourceCode: 'electricity',
        formulaId: 1,
        isPercentage: false,
        A: -15,
        C: 1,
        D: 1,
    },{
        resourceCode: 'research',
        formulaId: 1,
        isPercentage: false,
        A: 1,
        C: 1,
        D: 1,
    }],
    reserved: [{
        resourceCode: 'population',
        formulaId: 1,
        isPercentage: false,
        A: 45,
        D: 1.8,
        C: 1,
    }],
    requirements: [{
        scope: 'building',
        code: 'crystalmine',
        level: 3
    },{
        scope: 'research',
        code: 'physics',
        level: 2,
    },{
        scope: 'research',
        code: 'math',
        level: 3,
    }],
    capacity: []
}]
