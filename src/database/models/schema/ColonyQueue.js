const { ColonyStatus } = require('@database/models/parts/colony-data');

module.exports = (mongoose) => {
    const ColonyQueueSchema = new mongoose.Schema({
        colonyCode: String,
        order: new mongoose.Schema({
            scope: {
                type: String,
                enum: ['building', 'research', 'fleet', 'flight', 'battle']
            },
            code: String,
            level: Number,
        }),
        // newStatus: ColonyStatus,
        scheduledTime: Date,
        startTime: Date,
        dT: Number,
        status: {
            type: String,
            enums: ['scheduled','inprogress','finished','canceled']
        },
    });
    const ColonyQueue = mongoose.model('colony_queues', ColonyQueueSchema);

    return {
        ColonyQueue,
    }
}
