import config from './../../config/env';
import ApiService from './api.service';

class ResearchesService {

    static fetchList() {
        return ApiService.request(`${config.serverUrl}/colony/researches`, 'get');
    }

    static fetchQueue() {
        return ApiService.request(`${config.serverUrl}/colony/queue/researches`, 'get');
    }

    static research(code) {
        return ApiService.request(`${config.serverUrl}/colony/researches/${code}/level`, 'post');
    }
}

export {
    ResearchesService,
}
