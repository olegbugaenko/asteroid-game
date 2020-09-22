module.exports = [{
    title: 'What happened',
    code: 'intro',
    description: '<p>Oh, thanks to the Gods we have managed somehow to land this ship here. We are really happy to be alive.</p>'
    + '<p>So, I\'ll try somehow to contact with Earth so that they can send resque mission for us, but it looks like '
    +'all our technics have broken... At least, we need to survive for a first time. First of all, we need electricity to make remaining parts of our '
    +'ship working </p>',
    reward: [{
        resourceCode: 'metal',
        amount: 200,
    },{
        resourceCode: 'crystal',
        amount: 50,
    }],
    sort: 1,
    requirements: [{
        scope: 'building',
        code: 'solarplant',
        level: 1
    }]
}]
