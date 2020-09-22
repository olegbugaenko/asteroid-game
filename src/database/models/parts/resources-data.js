const mongoose = require('mongoose');

const ResourceEffect = mongoose.Schema({
    resourceCode: String,
    formulaId: {type: Number, default: 1},
    A: {type: Number, default: 0},
    B: {type: Number, default: 0},
    C: {type: Number, default: 0},
    D: {type: Number, default: 0},
    isPercentage: Boolean
});

const ResourceAmount = mongoose.Schema({
    resourceCode: String,
    amount: String,
})

module.exports = {
    ResourceEffect,
    ResourceAmount
}


