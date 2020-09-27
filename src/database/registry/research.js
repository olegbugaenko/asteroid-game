const connector = require('@database');

class ResearchesRegistry {

    static async researchesList() {
        if(!ResearchesRegistry.researches) {
            ResearchesRegistry.researches = await connector().model('Research').find().lean();
        }
        return ResearchesRegistry.researches;
    }

}

module.exports.ResearchesRegistry = ResearchesRegistry;
