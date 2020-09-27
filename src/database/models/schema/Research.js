const { ResourceEffect } = require('@database/models/parts/resources-data');

module.exports = (mongoose) => {
    const ResearchSchema = new mongoose.Schema({
        name: String,
        code: String,
        cost: [ResourceEffect],
        production: [ResourceEffect],
        capacity: [ResourceEffect],
        reserved: [ResourceEffect],
        maxLevel: Number,
        requirements: [new mongoose.Schema({
            scope: {
                type: String,
                required: true,
            },
            code: {
                type: String,
                required: true,
            },
            level: {
                type: Number,
                required: true,
            }
        })]
    });

    const Research = mongoose.model('researches', ResearchSchema);
    Research.onInit = async () => {
        const defaultData = [
            ...require('../data/research.fundamental'),
        ]
        for(let item of defaultData) {
            await Research.findOneAndUpdate({
                code: item.code,
            },item, {
                new: true,
                upsert: true,
            })
        }
    }
    return {
        Research,
    }
}
