const { ResourceEffect } = require('@database/models/parts/resources-data');

module.exports = (mongoose) => {
    const BuildingSchema = new mongoose.Schema({
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

    const Building = mongoose.model('buildings', BuildingSchema);
    Building.onInit = async () => {
        const defaultData = [
            ...require('./../data/buildings.housing'),
            ...require('./../data/buildings.colony'),
            ...require('./../data/buildings.oxygen-generator'),
            ...require('./../data/buildings.water-generator'),
            ...require('./../data/buildings.metalmine'),
            ...require('./../data/buildings.solarplant'),
            ...require('./../data/buildings.warehouse'),
            ...require('./../data/buildings.tank'),
        ]
        for(let item of defaultData) {
            await Building.findOneAndUpdate({
                code: item.code,
            },item, {
                new: true,
                upsert: true,
            })
        }
    }
    return {
        Building,
    }
}
