const { ColonyController } = require('./colony.controller');

module.exports = (app) => {
    app.get('/colony/:colonyCode/status', ColonyController.getColonyStatus);
    app.get('/colony/:colonyCode/tick', ColonyController.tickColony);
    app.get('/colony/by-user', ColonyController.tickColonyByUser);
    app.post('/colony/buildings/:buildingCode/level', ColonyController.upgradeBuilding);
    app.get('/colony/buildings', ColonyController.listBuildings);
    app.get('/colony/queue/buildings', ColonyController.listBuildingsQueue);

    app.post('/colony/researches/:researchCode/level', ColonyController.upgradeResearch);
    app.get('/colony/researches', ColonyController.listResearches);
    app.get('/colony/queue/researches', ColonyController.listResearchesQueue);
}
