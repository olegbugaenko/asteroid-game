import { combineReducers } from 'redux';
import UserReducer from './user/reducer';
import ColonyReducer from './colony/reducer';
import BuildingsReducer from './buildings/reducer';
import QuestsReducer from './quests/reducer';

const mainReducer = combineReducers({
    user: UserReducer,
    colony: ColonyReducer,
    buildings: BuildingsReducer,
    quests: QuestsReducer,
});

export default mainReducer;
