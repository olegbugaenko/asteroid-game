const db = require("@database");
const { QuestsRegistry } = require('./../../database/registry/quests');
const { BuildingsRegistry } = require('./../../database/registry/buildings');
const { ResearchesRegistry } = require('./../../database/registry/research');

class QuestsService {

    static async listQuestsWithData() {
        const list = await QuestsRegistry.questsList();
        const buildings = await BuildingsRegistry.buildingsList();
        const researches = await ResearchesRegistry.researchesList();
        const listWithData = list.map(quest => {
            if(quest.requirements) {
                for(let i=0; i<quest.requirements.length;i++) {
                    const req = quest.requirements[i];
                    // console.log('R: ', req);
                    if(req.scope === 'building') {
                        const data = buildings.find(b => b.code === req.code);
                        if(data) {
                            quest.requirements[i].name = data.name;
                        }
                    }
                    if(req.scope === 'research') {
                        const data = researches.find(b => b.code === req.code);
                        if(data) {
                            quest.requirements[i].name = data.name;
                        }
                    }
                }
            }
            return quest;
        });
        return listWithData;
    }

    static async getQuestStatuses(status) {
        const list = await QuestsService.listQuestsWithData();
        const actualQuests = status.quests || [];
        const updatedStatuses = list.map(item => ({
            questCode: item.code,
            status: (actualQuests.find(q => q.questCode === item.code) || {status: 0}).status,
            sort: item.sort,
            isHidden: (actualQuests.find(q => q.questCode === item.code) || {isHidden: false}).isHidden,
        })).sort((a, b) => a.sort < b.sort ? -1 : 1);
        return updatedStatuses;
    }

    static async tickNextQuest(status) {
        const statuses = await QuestsService.getQuestStatuses(status);
        const list = await QuestsService.listQuestsWithData();
        let index = 0;
        while(statuses.length > index && statuses[index].status > 3) {
            index++;
        }
        const currentQuestId = index;
        if(statuses[index].status < 2) {
            if(QuestsService.statusRequirementsMet(status, statuses[index], list.find(item => item.code === statuses[index].questCode))) {
                statuses[index].status = 2;
                statuses[index].isHidden = false;
            }
        }
        let bounty = [];
        if(statuses[index].status === 3) {
            statuses[index].status = 4;
            bounty = list.find(item => item.code === statuses[index].questCode).reward;
            console.log('BBBOOOUNTYYY: ',bounty);
        }
        return {
            quests: statuses.map(statusq => ({
                ...statusq,
                ...list.find(item => item.code === statusq.questCode)
            })),
            currentId: currentQuestId,
            bounty
        };
    }

    static statusRequirementsMet(status, questStatus, quest) {
        const reqs = quest.requirements;
        console.log('quest: ', questStatus, quest, status.buildings);
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
            if(req.scope === 'research') {
                const currentLevel = status.researches.find(item => item.researchCode === req.code);
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

    static async updateQuestStatus(colonyCode, status) {
        const colony = await db().model('Colony').findOne({
            code: colonyCode,
        }).lean();
        const statuses = await QuestsService.getQuestStatuses(colony.status);
        let index = 0;
        while(statuses.length > index && statuses[index].status >= 4) {
            index++;
        }
        if(status === 3 && statuses[index].status >= 2) {
            statuses[index].status = status;
            await db().model('Colony').findOneAndUpdate({
                code: colonyCode,
            },{
                "status.quests": statuses,
            });
        }

        return statuses;
    }

    static async updateHiddenStatus(colonyCode, isHidden) {
        const colony = await db().model('Colony').findOne({
            code: colonyCode,
        }).lean();
        const statuses = await QuestsService.getQuestStatuses(colony.status);
        let index = 0;
        while(statuses.length > index && statuses[index].status >= 4) {
            index++;
        }
        statuses[index].isHidden = isHidden;
        await db().model('Colony').findOneAndUpdate({
            code: colonyCode,
        },{
            "status.quests": statuses,
        });
        return statuses;
    }

}

module.exports = {
    QuestsService,
}
