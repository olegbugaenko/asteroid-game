module.exports = (mongoose) => {
    const ResourceSchema = new mongoose.Schema({
        name: String,
        code: String,
        isStoreable: {type: Boolean, default: false},
        minQuantity: {type: Number, default: 0},
        isPrimary: Boolean,
    });
    const Resource = mongoose.model('resources', ResourceSchema);
    Resource.onInit = async () => {
        const defaultData = [{
            name: 'Electricity',
            code: 'electricity',
            isStoreable: false,
            minQuantity: 0,
            isPrimary: true,
        },{
            name: 'Population',
            code: 'population',
            isStoreable: true,
            minQuantity: 0,
            isPrimary: true,
        },{
            name: 'Oxygen',
            code: 'oxygen',
            isStoreable: true,
            minQuantity: 0,
            isPrimary: true,
        },{
            name: 'Water',
            code: 'water',
            isStoreable: true,
            minQuantity: 0,
            isPrimary: true,
        },{
            name: 'Metal',
            code: 'metal',
            isStoreable: true,
            minQuantity: 0,
            isPrimary: true,
        },{
            name: 'Crystal',
            code: 'crystal',
            isStoreable: true,
            minQuantity: 0,
            isPrimary: true,
        },{
            name: 'Fuel',
            code: 'fuel',
            isStoreable: true,
            minQuantity: 0,
            isPrimary: true,
        },{
            name: 'Provision',
            code: 'provision',
            isStoreable: true,
            minQuantity: 0,
            isPrimary: true,
        },{
            name: 'Research',
            code: 'research',
            isStoreable: false,
            minQuantity: 0,
        },{
            name: 'Building',
            code: 'building',
            isStoreable: false,
            minQuantity: 0,
        }]
        for(let item of defaultData) {
            await Resource.findOneAndUpdate({
                code: item.code,
            },item, {
                new: true,
                upsert: true,
            })
        }
    }
    return {
        Resource,
    }
}
