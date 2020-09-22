const mongoose = require('mongoose');
const {ResourceAmount} = require('./resources-data');

const BuildingStatus = mongoose.Schema({
    buildingCode: String,
    level: Number,
    effiency: {type: Number, default: 1},
    isEnabled: {
        type: Boolean,
        default: true,
    }
});

const ResearchStatus = mongoose.Schema({
    researchCode: String,
    level: Number,
});

const QuestStatus = mongoose.Schema({
    questCode: String,
    status: Number,
    isHidden: Boolean,
});

const ColonyStatus = mongoose.Schema({
    buildings: [BuildingStatus],
    researches: [ResearchStatus],
    time: Date,
    resources: [ResourceAmount],
    capacity: [ResourceAmount],
    production: [ResourceAmount],
    reserved: [ResourceAmount],
    quests: [QuestStatus]
})

module.exports = {
    BuildingStatus,
    ResearchStatus,
    ColonyStatus,
}
