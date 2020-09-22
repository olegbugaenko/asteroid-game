import { reducer } from "redux-chill";
import * as Actions from './actions';

const BuildingsReducer = reducer({
    list: [],
    queue: [],
})
    .on(Actions.getBuildingsList.success, (state, payload) => {
        state.list = payload;
    })
    .on(Actions.getBuildingQueue.success, (state, payload) => {
        state.queue = payload;
    });

export default BuildingsReducer;

