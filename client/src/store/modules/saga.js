import { all, call } from 'redux-saga/effects';
import { UserSaga } from './user/saga';
import { ColonySaga } from './colony/saga';
import { BuildingsSaga } from './buildings/saga';
import { ResearchesSaga } from './researches/saga';
import { QuestsSaga } from "./quests/saga";

class RootSaga {

    static *watch() {
        yield all([
            call(UserSaga.watch),
            call(ColonySaga.watch),
            call(ColonySaga.background),
            call(BuildingsSaga.watch),
            call(BuildingsSaga.background),
            call(ResearchesSaga.watch),
            call(ResearchesSaga.background),
            call(QuestsSaga.watch)
        ]);
    }

}

export {
    RootSaga
}
