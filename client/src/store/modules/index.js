import { combineReducers } from 'redux';
import UserReducer from './user/reducer';
import ColonyReducer from './colony/reducer';
import BuildingsReducer from './buildings/reducer';

const mainReducer = combineReducers({
    user: UserReducer,
    colony: ColonyReducer,
    buildings: BuildingsReducer,
});

export default mainReducer;
