const { ResourceEffect } = require('@database/models/parts/resources-data');

module.exports = (mongoose) => {
    const QuestSchema = new mongoose.Schema({
        title: String,
        code: String,
        description: String,
        reward: [ResourceEffect],
        sort: Number,
        requirements: [new mongoose.Schema({
            scope: String,
            code: String,
            level: String
        })]
    });

    const Quest = mongoose.model('quests', QuestSchema);
    Quest.onInit = async () => {
        const defaultData = [
            ...require('./../data/quests.intro'),
        ]
        for(let item of defaultData) {
            await Quest.findOneAndUpdate({
                code: item.code,
            },item, {
                new: true,
                upsert: true,
            })
        }
    }
    return {
        Quest,
    }
}
