import config from './../../config/env';
import ApiService from './api.service';

class QuestsService {

    static hideQuest(isHidden) {
        return ApiService.request(`${config.serverUrl}/quests/hide`, 'put', {data: {isHidden}});
    }

    static claimReward() {
        return ApiService.request(`${config.serverUrl}/quests/claim`, 'put');
    }

}

export {
    QuestsService,
}
