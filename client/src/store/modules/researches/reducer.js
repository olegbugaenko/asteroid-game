import { reducer } from "redux-chill";
import * as Actions from './actions';

const ResearchesReducer = reducer({
    list: [],
    queue: [],
})
    .on(Actions.getResearchesList.success, (state, payload) => {
        state.list = payload;
    })
    .on(Actions.getResearchQueue.success, (state, payload) => {
        state.queue = payload;
    });

export default ResearchesReducer;

