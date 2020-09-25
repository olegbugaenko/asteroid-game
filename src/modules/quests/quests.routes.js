const { QuestsController } = require('./quests.controller');

module.exports = (app) => {
    app.put('/quests/hide', QuestsController.hideQuest);
    app.put('/quests/claim', QuestsController.claimQuest);
}
