import config from './../../config/env';
import ApiService from './api.service';

class BuildingsService {

    static fetchList() {
        return ApiService.request(`${config.serverUrl}/colony/buildings`, 'get');
    }

    static fetchQueue() {
        return ApiService.request(`${config.serverUrl}/colony/queue/buildings`, 'get');
    }

    static build(code) {
        return ApiService.request(`${config.serverUrl}/colony/buildings/${code}/level`, 'post');
    }
}

export {
    BuildingsService,
}
