import { make } from 'redux-chill';

const getColonyStatus = make('[colony-status] get')
    .stage('success', payload => payload)
    .stage('failure', payload => payload);

const updateAmounts = make('[colony-status] update amounts')
    .stage(payload => payload);

export {
    getColonyStatus,
    updateAmounts
}
