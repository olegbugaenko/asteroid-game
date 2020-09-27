import { make } from 'redux-chill';

const getResearchesList = make('[researches] get')
    .stage('success', payload => payload)
    .stage('failure', payload => payload);

const postResearchToQueue = make('[researches] upgrade')
    .stage(payload => payload)
    .stage('success', payload => payload)
    .stage('failure', payload => payload);

const getResearchQueue = make('[researches] get queue')
    .stage(payload => payload)
    .stage('success', payload => payload)
    .stage('failure', payload => payload);

export {
    getResearchesList,
    postResearchToQueue,
    getResearchQueue
}
