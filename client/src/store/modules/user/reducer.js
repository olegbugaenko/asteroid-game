import { reducer } from "redux-chill";
import * as Actions from './actions';

const UserReducer = reducer({
    ui: {
        signin: {
            error: null,
        },
        signup: {
            error: null,
        }
    }
})
    .on(Actions.checkAuth.success, (state, {userCode, token}) => {
        state.userCode = userCode;
        state.token = token;
        if(state.userCode && state.token) {
            state.isAuthorized = true;
        } else {
            state.isAuthorized = false;
        }
    })
    .on(Actions.authorize, (state) => {
        state.ui.signin.error = null;
    })
    .on(Actions.authorize.failure, (state, error) => {
        state.ui.signin.error = error;
    })
    .on(Actions.authorize.success, (state, {code: userCode, token: {token: token}, ...payload}) => {
        state.userCode = userCode;
        state.token = token;
        if(state.userCode && state.token) {
            state.isAuthorized = true;
        } else {
            state.isAuthorized = false;
        }
        state.data = payload;
    })
    .on(Actions.signup, (state) => {
        state.ui.signup.error = null;
    })
    .on(Actions.signup.success, (state, {code: userCode, token: {token: token}, ...payload}) => {
        state.userCode = userCode;
        state.token = token;
        if(state.userCode && state.token) {
            state.isAuthorized = true;
        } else {
            state.isAuthorized = false;
        }
        state.data = payload;
    })
    .on(Actions.signup.failure, (state, error) => {
        state.ui.signup.error = error;

    });

export default UserReducer;

