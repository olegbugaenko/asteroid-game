import axios from 'axios';
import { AuthorizationService } from "./authorization.service";

class ApiService {

    static async request(url, method, options) {
        const token = localStorage.getItem('token');
        try {
            const res = await axios({
                url,
                method,
                headers: {
                    ...((options && options.headers) || {}),
                    token
                }
            });
            return res;
        } catch (e) {
            console.log('-------------');
            console.log('rs', e.response);
            if(e.response && e.response.status === 401) {
                AuthorizationService.removeTokens();
                window.location.reload();
            } else {
                throw new Error(e);
            }
        }

    }

}

export default ApiService;
