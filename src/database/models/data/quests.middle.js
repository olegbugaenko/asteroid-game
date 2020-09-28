module.exports = [{
    title: 'Expansion',
    code: 'middle01',
    description: '<p>It looks like very soon we should be able to do realy a lot of interesting stuff... Mmm, I dreaming about a moment when we build our own ships, go into expeditions... But, first of all we still have a lot of job here. Lets build some facilities to make our furhther development easier</p>',
    reward: [{
        resourceCode: 'metal',
        amount: 1500,
    },{
        resourceCode: 'crystal',
        amount: 1350,
    },{
        resourceCode: 'fuel',
        amount: 150,
    }],
    sort: 20,
    requirements: [{
        scope: 'building',
        code: 'factory',
        level: 1
    }]
},{
    title: 'Even more resources',
    code: 'middle02',
    description: '<p>I now thats boring, but we need to keep improving our resources production to make a real jump. Lets try to up resource buildings a little more</p>',
    reward: [{
        resourceCode: 'metal',
        amount: 2000,
    },{
        resourceCode: 'crystal',
        amount: 350,
    },{
        resourceCode: 'fuel',
        amount: 150,
    }],
    sort: 21,
    requirements: [{
        scope: 'building',
        code: 'metalmine',
        level: 10
    },{
        scope: 'building',
        code: 'crystalmine',
        level: 5
    }]
},{
    title: 'Fuel',
    code: 'middle03',
    description: '<p>One of my advisors have found some liquid substantion, that seems to burn pretty well. I think we need to learn more chemistry and try setup fuel production</p>',
    reward: [{
        resourceCode: 'metal',
        amount: 2000,
    },{
        resourceCode: 'crystal',
        amount: 350,
    },{
        resourceCode: 'fuel',
        amount: 150,
    }],
    sort: 22,
    requirements: [{
        scope: 'building',
        code: 'fuelmine',
        level: 2
    },{
        scope: 'research',
        code: 'chemistry',
        level: 2
    }]
}]
