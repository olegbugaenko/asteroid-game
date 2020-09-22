import { make } from 'redux-chill';

const checkAuth = make('[user-auth] check signed in')
    .stage('success', payload => payload);

const authorize = make('[user-auth] sign-in')
    .stage(payload => payload)
    .stage('success', payload => payload)
    .stage('failure', payload => payload);

const signup = make('[user-auth] sign-un')
    .stage(payload => payload)
    .stage('success', payload => payload)
    .stage('failure', payload => payload);

const signOut = make('[user-auth] sign-out')
    .stage('success', payload => payload);

export {
    checkAuth,
    authorize,
    signup,
    signOut
}
