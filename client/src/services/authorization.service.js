import axios from 'axios';
import config from './../../config/env';

class AuthorizationService {

    static getUserToken() {
        const token = localStorage.getItem('token');
        const userCode = localStorage.getItem('userCode');
        if(!token || !userCode) {
            return false;
        }
        return {
            token,
            userCode,
        }
    }

    static removeTokens() {
        localStorage.removeItem('token');
        localStorage.removeItem('userCode');
    }

    static addTokens({ userCode, token }) {
        localStorage.setItem('token', token);
        localStorage.setItem('userCode', userCode);
    }

    static signIn({email, password}) {
        return axios.put(`${config.serverUrl}/users/sign-in`, {
            email,
            password,
        });
    }

    static signUp({email, password, firstName, lastName}) {
        return axios.post(`${config.serverUrl}/users/sign-in`, {
            data: {
                email,
                password,
                firstName,
                lastName,
            }
        });
    }

}

export {
    AuthorizationService,
}
