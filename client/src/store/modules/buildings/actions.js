import { make } from 'redux-chill';

const getBuildingsList = make('[buildings] get')
    .stage('success', payload => payload)
    .stage('failure', payload => payload);

const postBuildingToQueue = make('[buildings] upgrade')
    .stage(payload => payload)
    .stage('success', payload => payload)
    .stage('failure', payload => payload);

const getBuildingQueue = make('[buildings] get queue')
    .stage(payload => payload)
    .stage('success', payload => payload)
    .stage('failure', payload => payload);

export {
    getBuildingsList,
    postBuildingToQueue,
    getBuildingQueue
}
