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
},{
    title: 'Nowhere to live',
    code: 'survive2',
    description: '<p>Now, since we have enough elementary resources to survive, another urgent need is housing</p>'
        + '<p>It\'s a little cold to sleep under solar plant panels, you know?'
        + ' Lets build some homes for our people so that they have where to live </p>',
    reward: [{
        resourceCode: 'population',
        amount: 200,
    },{
        resourceCode: 'water',
        amount: 150,
    },{
        resourceCode: 'oxygen',
        amount: 150,
    }],
    sort: 3,
    requirements: [{
        scope: 'building',
        code: 'housing',
        level: 1
    }]
},{
    title: 'Still not safe',
    code: 'survive3',
    description: '<p>We can\'t relay on such small amounts of oxygen and water.</p>'
        + '<p>Let\'s boost our production of these critical resources, cause its really'
        + ' unacceptable to run out of them. But, keep in mind that we need to keep supplying our buildings with electricity.</p>',
    reward: [{
        resourceCode: 'metal',
        amount: 400,
    },{
        resourceCode: 'water',
        amount: 150,
    },{
        resourceCode: 'oxygen',
        amount: 150,
    }],
    sort: 4,
    requirements: [{
        scope: 'building',
        code: 'oxygengenerator',
        level: 3
    },{
        scope: 'building',
        code: 'watergenerator',
        level: 3
    }]
},{
    title: 'What\'s on Earth',
    code: 'survive4',
    description: '<p>Oh, seems like we are doing not bad progress. Do we really still need any resque mission?</p>'
        + '<p>By the way, I repaired our communication facilities, and did another attempt to contact with Earth - '
        + ' and still no success... Im getting nervous about it. Well, lets try settle here. We will need a lot metal in future, so lets try to set up its production.</p>',
    reward: [{
        resourceCode: 'metal',
        amount: 500,
    },{
        resourceCode: 'crystal',
        amount: 250,
    },{
        resourceCode: 'population',
        amount: 150,
    }],
    sort: 5,
    requirements: [{
        scope: 'building',
        code: 'solarplant',
        level: 3
    },{
        scope: 'building',
        code: 'metalmine',
        level: 3
    }]
},{
    title: 'More hands',
    code: 'survive5',
    description: '<p>Nice, now we have almost everything we need to survive another couple months.</p>'
        + '<p>But, we still need more working people. Today we met an expedition of people, sent to investigate small asteroids and commets.'
        + 'Thay lost connection with Earth as well as we did. They happy to join us, but we havent enought space to place them. Lets improve our houses!</p>',
    reward: [{
        resourceCode: 'metal',
        amount: 350,
    },{
        resourceCode: 'population',
        amount: 150,
    }],
    sort: 6,
    requirements: [{
        scope: 'building',
        code: 'housing',
        level: 3
    }]
},{
    title: 'Electricity shut down...',
    code: 'survive6',
    description: '<p>We are building more and more, and all our facilities need enought electricity</p>'
        + '<p>Each time we experiance lack of electricity effiency of our production buildings decreases.'
        + 'Lets provide more electricity to our colony.</p>',
    reward: [{
        resourceCode: 'metal',
        amount: 750,
    },{
        resourceCode: 'crystal',
        amount: 150,
    },{
        resourceCode: 'population',
        amount: 50,
    }],
    sort: 7,
    requirements: [{
        scope: 'building',
        code: 'solarplant',
        level: 5
    }]
},{
    title: 'Something wrong...',
    code: 'survive7',
    description: '<p>Just met another couple of strangers, walking by their sales cargo. And, they told they having same issues with contacting anyone from Marsian trade post</p>'
        + '<p>Seems like we left here on our own for a while. So, lets try to do another couple steps so that we can live here for a while'
        + 'We will need a lot of building materials, and its not just metal. Minerals are used for more advanced buildings and technoloigies. So, lets go ahead and expand our capabilities.</p>',
    reward: [{
        resourceCode: 'metal',
        amount: 850,
    },{
        resourceCode: 'crystal',
        amount: 250,
    },{
        resourceCode: 'population',
        amount: 150,
    }],
    sort: 8,
    requirements: [{
        scope: 'building',
        code: 'metalmine',
        level: 5
    },{
        scope: 'building',
        code: 'crystalmine',
        level: 3
    }]
},{
    title: 'Keep building fundament',
    code: 'survive8',
    description: '<p>Whatever we plan to do, it will need more people, more industrial facilities</p>'
        + '<p>This will increase water and oxygen consumption. So, lets try to do another step, and improve our production of water and oxygen'
        + '</p>',
    reward: [{
        resourceCode: 'population',
        amount: 250,
    }],
    sort: 9,
    requirements: [{
        scope: 'building',
        code: 'oxygengenerator',
        level: 5
    },{
        scope: 'building',
        code: 'watergenerator',
        level: 5
    }]
},{
    title: 'Research is our future',
    code: 'survive9',
    description: '<p>Without research we can\'t be efficient enought, and it would be much harder to survive</p>'
        + '<p>First of all, we need to start from improving our understanding of some fundamental sciences.'
        + 'Lets research physics and maths.</p>',
    reward: [{
        resourceCode: 'metal',
        amount: 1750,
    },{
        resourceCode: 'crystal',
        amount: 250,
    },{
        resourceCode: 'fuel',
        amount: 50,
    }],
    sort: 10,
    requirements: [{
        scope: 'research',
        code: 'math',
        level: 2
    },{
        scope: 'research',
        code: 'physics',
        level: 2
    }]
},{
    title: 'Where to store this all?',
    code: 'survive10',
    description: '<p>I just talked to some of our workers. They complaining about corossion ate tones of our metal.</p>'
        + '<p>We can\'t waste our resource so. Lets build warehouse to store this all.'
        + '</p>',
    reward: [{
        resourceCode: 'metal',
        amount: 1750,
    },{
        resourceCode: 'crystal',
        amount: 250,
    },{
        resourceCode: 'fuel',
        amount: 50,
    }],
    sort: 11,
    requirements: [{
        scope: 'building',
        code: 'warehouse',
        level: 1
    }]
},{
    title: 'Keep building fundament',
    code: 'survive11',
    description: '<p>Whatever we plan to do, it will need more people, more industrial facilities</p>'
        + '<p>This will increase water and oxygen consumption. So, lets try to do another step, and improve our production of water and oxygen'
        + '</p>',
    reward: [{
        resourceCode: 'population',
        amount: 250,
    }],
    sort: 12,
    requirements: [{
        scope: 'building',
        code: 'oxygengenerator',
        level: 7
    },{
        scope: 'building',
        code: 'watergenerator',
        level: 7
    }]
},{
    title: 'Keep building fundament (2)',
    code: 'survive12',
    description: '<p>Lets build tank to store our resources</p>',
    reward: [{
        resourceCode: 'metal',
        amount: 1250,
    },{
        resourceCode: 'crystal',
        amount: 750,
    }],
    sort: 13,
    requirements: [{
        scope: 'building',
        code: 'tank',
        level: 1
    }]
},{
    title: 'Advancing technologies',
    code: 'survive13',
    description: '<p>Hey! One of our engineers says that we can significantly optimize our production</p>'
        + '<p>I guess we could research energetics and geology to improve our capabilities.'
        + '</p>',
    reward: [{
        resourceCode: 'metal',
        amount: 550,
    },{
        resourceCode: 'crystal',
        amount: 250,
    },{
        resourceCode: 'fuel',
        amount: 250,
    }],
    sort: 14,
    requirements: [{
        scope: 'research',
        code: 'geology',
        level: 2
    },{
        scope: 'research',
        code: 'energetics',
        level: 2
    }]
},{
    title: 'Need more resources',
    code: 'survive14',
    description: '<p>Lets keep upgrading our mines, to make it possible to advance. We also need upgrade warehouse to store it.</p>',
    reward: [{
        resourceCode: 'metal',
        amount: 1550,
    },{
        resourceCode: 'crystal',
        amount: 750,
    },{
        resourceCode: 'fuel',
        amount: 450,
    }],
    sort: 15,
    requirements: [{
        scope: 'building',
        code: 'metalmine',
        level: 7
    },{
        scope: 'building',
        code: 'warehouse',
        level: 2
    }]
},{
    title: 'Keep upgrading knowledge',
    code: 'survive15',
    description: '<p>Lets keep upgrading our mines, to make it possible to advance. We also need upgrade warehouse to store it.</p>',
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
    sort: 16,
    requirements: [{
        scope: 'research',
        code: 'math',
        level: 4
    },{
        scope: 'research',
        code: 'physics',
        level: 4
    }]
}]
