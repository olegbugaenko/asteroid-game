import { takeLatest, call, put } from 'redux-saga/effects';
import { AuthorizationService } from './../../../services/authorization.service';
import * as Actions from './actions';

class UserSaga {

    static *putUserInfo() {
        const authData = yield call(AuthorizationService.getUserToken);
        yield put(Actions.checkAuth.success(authData));
    }

    static *attemptAuthorize({payload}) {
        try {
            const { data } = yield call(AuthorizationService.signIn, payload);
            yield put(Actions.authorize.success(data));
            yield call(AuthorizationService.addTokens, {
                userCode: data.code,
                token: data.token.token,
            });
        } catch (e) {
            console.error(e);
            yield put(Actions.authorize.failure(e.response && e.response.data));
        }

    }

    static *attemptRegister({payload}) {
        try {
            const { data } = yield call(AuthorizationService.signUp, payload);
            yield put(Actions.signup.success(data));
            yield call(AuthorizationService.addTokens, {
                userCode: data.code,
                token: data.token.token,
            });
        } catch (e) {
            console.error(e);
            yield put(Actions.signup.failure(e.response && e.response.data));
        }
    }

    static *logOut() {
        yield call(AuthorizationService.removeTokens);
        yield put(Actions.checkAuth.success({}));
    }

    static *watch(){
        yield takeLatest(Actions.checkAuth.type, UserSaga.putUserInfo);
        yield takeLatest(Actions.authorize.type, UserSaga.attemptAuthorize);
        yield takeLatest(Actions.signup.type, UserSaga.attemptRegister);
        yield takeLatest(Actions.signOut.type, UserSaga.logOut);
    }

}

export {
    UserSaga,
}
