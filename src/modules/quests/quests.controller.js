const { QuestsService } = require('./quests.service');
const { ColonyStatusService } = require('./../colony/colony-status.service');

class QuestsController {

    static async hideQuest(req, res) {
        try {
            const rs = await QuestsService.updateHiddenStatus(req.user.colonyCode, req.body.isHidden);
            res.send(rs);
        } catch (e) {
            console.error(e);
            res.status(400);
            return res.send(e && e.message);
        }
    }

    static async claimQuest(req, res) {
        try {
            const rs = await QuestsService.updateQuestStatus(req.user.colonyCode, 3);
            await ColonyStatusService.makeTick({colonyCode: req.user.colonyCode});
            res.send(rs);
        } catch (e) {
            console.error(e);
            res.status(400);
            return res.send(e && e.message);
        }
    }
}

module.exports = {
    QuestsController,
}
