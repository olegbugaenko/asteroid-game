const { ColonyStatusService } = require('./colony-status.service');
const { QueueService } = require('./queue/queue.service');

class ColonyController {

    static async getColonyStatus(req, res) {
        try {
            const updatedStatus = await ColonyStatusService.getStatus({
                code: req.params.colonyCode,
                time: req.query.time,
            });
            res.send(updatedStatus)
        } catch (e) {
            console.error(e);
            res.status(400);
            return res.send(e && e.message);
        }
    }

    static async tickColony(req, res) {
        try {
            const updatedStatus = await ColonyStatusService.makeTick({
                colonyCode: req.params.colonyCode,
                timeTick: req.query.time,
            });
            res.send(updatedStatus)
        } catch (e) {
            console.error(e);
            res.status(400);
            return res.send(e && e.message);
        }
    }

    static async tickColonyByUser(req, res) {
        try {
            const updatedStatus = await ColonyStatusService.makeTick({
                colonyCode: req.user.colonyCode,
                timeTick: req.query.time,
            });
            res.send(updatedStatus)
        } catch (e) {
            console.error(e);
            res.status(400);
            return res.send(e && e.message);
        }
    }

    static async upgradeBuilding(req, res) {
        try {
            const updatedStatus = await QueueService.sheduleBuildingUpgrade({
                colonyCode: req.user.colonyCode,
                buildingCode: req.params.buildingCode,
                level: 1,
            });
            res.send(updatedStatus)
        } catch (e) {
            console.error(e);
            res.status(400);
            return res.send(e && e.message);
        }
    }

    static async listBuildings(req, res) {
        try {
            const buildings = await ColonyStatusService.listBuildingsAvailable({
                colonyCode: req.user.colonyCode,
            });
            res.send(buildings);
        } catch (e) {
            console.error(e);
            res.status(400);
            return res.send(e && e.message);
        }
    }

    static async listBuildingsQueue(req, res) {
        try {
            const buildings = await ColonyStatusService.listBuildingsQueue({
                colonyCode: req.user.colonyCode,
            });
            res.send(buildings);
        } catch (e) {
            console.error(e);
            res.status(400);
            return res.send(e && e.message);
        }
    }


}

module.exports.ColonyController = ColonyController;
