import { make } from 'redux-chill';

const updateQuestStatus = make('[quest-status] update')
    .stage(payload => payload);

const claimReward = make('[quest-status] claim')
    .stage(payload => payload);

const setHiddenStatus = make('[quest-status] set hidden')
    .stage(payload => payload);


export {
    updateQuestStatus,
    claimReward,
    setHiddenStatus
}
