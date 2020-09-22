const connector = require('@database');

class BuildingsRegistry {

    static async buildingsList() {
        if(!BuildingsRegistry.buildings) {
            BuildingsRegistry.buildings = await connector().model('Building').find().lean();
        }
        return BuildingsRegistry.buildings;
    }

}

module.exports.BuildingsRegistry = BuildingsRegistry;
