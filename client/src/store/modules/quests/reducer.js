import { reducer } from "redux-chill";
import * as Actions from './actions';
import * as ColonyActions from './../colony/actions'

const QuestsReducer = reducer({
    list: [],
    currentId: 0,
})
    .on(ColonyActions.getColonyStatus.success, (state, payload) => {
        state.list = payload.quests.quests || [];
        state.currentId = payload.quests.currentId;
    })
    .on(Actions.updateQuestStatus, (state, payload) => {
        const currentId = state.currentId;
        if(currentId > -1 && currentId < state.list.length) {
            if('isHidden' in payload) {
                state.list[currentId].isHidden = !!payload.isHidden;
            }
            if('status' in payload) {
                state.list[currentId].state = payload.status;
            }
        }
    });

export default QuestsReducer;

