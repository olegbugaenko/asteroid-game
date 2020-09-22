const connector = require('@database');

class QuestsRegistry {

    static async questsList() {
        if(!QuestsRegistry.quests) {
            QuestsRegistry.quests = await connector().model('Quest').find().lean();
        }
        return QuestsRegistry.quests;
    }

}

module.exports.QuestsRegistry = QuestsRegistry;
