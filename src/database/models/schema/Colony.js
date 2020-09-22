const { ColonyStatus } = require('@database/models/parts/colony-data');

module.exports = (mongoose) => {
    const ColonySchema = new mongoose.Schema({
        name: String,
        code: String,
        status: ColonyStatus,
    });
    const Colony = mongoose.model('colonies', ColonySchema);
    /*Colony.onInit = async () => {
        const defaultData = [{
            name: 'MyTestColony',
            code: 'my-test',
            status: {
                researches: [],
                buildings: [{
                    buildingCode: 'colony',
                    level: 1,
                },{
                    buildingCode: 'housing',
                    level: 2,
                }],
                time: new Date(),
                resources: [{
                    resourceCode: 'metal',
                    amount: 100,
                },{
                    resourceCode: 'population',
                    amount: 100,
                },{
                    resourceCode: 'water',
                    amount: 100,
                },{
                    resourceCode: 'oxygen',
                    amount: 100,
                }],
            }
        }]
        for(let item of defaultData) {
            await Colony.findOneAndUpdate({
                code: item.code,
            },item, {
                new: true,
                upsert: true,
            })
        }
    }*/
    return {
        Colony,
    }
}
