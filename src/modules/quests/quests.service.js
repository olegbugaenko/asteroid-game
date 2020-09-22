const db = require("@database");
const { QuestsRegistry } = require('./../../database/registry/quests');

class QuestsService {

    static async getQuestStatuses(status) {
        const list = await QuestsRegistry.questsList();
        const actualQuests = status.quests || [];
        const updatedStatuses = list.map(item => ({
            questCode: item.code,
            status: (actualQuests.find(q => q.questCode === item.code) || {status: 0}).status,
            sort: item.sort
        })).sort((a, b) => a.sort > b.sort ? -1 : 1);
        return updatedStatuses;
    }

    static async tickNextQuest(status) {
        const statuses = await QuestsService.getQuestStatuses(status);
        const list = await QuestsRegistry.questsList();
        let index = 0;
        while(statuses.length > index && statuses[index].status > 3) {
            index++;
        }
        const currentQuestId = index;
        if(statuses[index].status < 2) {
            if(QuestsService.statusRequirementsMet(status, statuses[index], list.find(item => item.code === statuses[index].questCode))) {
                statuses[index].status = 2;
            }
        }
        return statuses;
    }

    static async statusRequirementsMet(status, questStatus, quest) {
        const reqs = quest.requirements;
        let isDone = true;
        for(let req of reqs) {
            if(req.scope === 'building') {
                const currentLevel = status.buildings.find(item => item.buildingCode === req.code);
                if(!currentLevel) {
                    return false;
                }
                if(currentLevel.level < req.level) {
                    return false;
                }
            }
        }
        return true;
    }

    static async updateQuestStatus(status) {
        const statuses = await QuestsService.getQuestStatuses(status);
        let index = 0;
        while(statuses.length > index && statuses[index].status < 4) {
            index++;
        }
        statuses[index].status = status;
    }

}

module.exports = {
    QuestsService,
}
