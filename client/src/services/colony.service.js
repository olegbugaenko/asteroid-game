import config from './../../config/env';
import ApiService from './api.service';

class ColonyService {

    static fetchColonyStatus() {
        return ApiService.request(`${config.serverUrl}/colony/by-user`, 'get');
    }

}

export {
    ColonyService,
}
