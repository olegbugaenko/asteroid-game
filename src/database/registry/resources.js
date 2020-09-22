const connector = require('@database');

class ResourcesRegistry {

    static async resourcesList() {
        if(!ResourcesRegistry.resources) {
            ResourcesRegistry.resources = await connector().model('Resource').find().lean();
        }
        return ResourcesRegistry.resources;
    }

}

module.exports.ResourcesRegistry = ResourcesRegistry;
