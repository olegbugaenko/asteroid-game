import { reducer } from "redux-chill";
import * as Actions from './actions';

const ColonyReducer = reducer({
    resources: [],
})
    .on(Actions.getColonyStatus.success, (state, payload) => {
        state.resources = payload.statusNew.status.resourcesAfter;
        state.production = payload.statusNew.status.production;
        state.capacity = payload.statusNew.status.capacity;
        state.reserved = payload.statusNew.status.reserved;
    })
    .on(Actions.updateAmounts, (state, payload) => {
        state.resources = state.resources.map(resource => ({
            ...resource,
            amount: payload.find(res => res.resourceCode === resource.resourceCode)
                ? payload.find(res => res.resourceCode === resource.resourceCode).newAmount
            : resource.amount,
        }))
    });

export default ColonyReducer;

