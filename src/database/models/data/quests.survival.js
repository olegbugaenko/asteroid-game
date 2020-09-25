module.exports = [{
    title: 'Trying to survive',
    code: 'survive',
    description: '<p>Unfortunately, I could not contact anybody from Earth...</p>'
        + '<p>So, looks like we need to stay here for a while. In any way, seems like this asteroid has some resources '
        + 'that may help us to survive. First of all we need water to drink and oxygen to breath. </p>',
    reward: [{
        resourceCode: 'metal',
        amount: 300,
    },{
        resourceCode: 'crystal',
        amount: 50,
    }],
    sort: 2,
    requirements: [{
        scope: 'building',
        code: 'watergenerator',
        level: 1
    },{
        scope: 'building',
        code: 'oxygengenerator',
        level: 1
    }]
}]
