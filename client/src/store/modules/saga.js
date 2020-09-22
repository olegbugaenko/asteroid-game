import { all, call } from 'redux-saga/effects';
import { UserSaga } from './user/saga';
import { ColonySaga } from './colony/saga';
import { BuildingsSaga } from './buildings/saga';

class RootSaga {

    static *watch() {
        yield all([
            call(UserSaga.watch),
            call(ColonySaga.watch),
            call(ColonySaga.background),
            call(BuildingsSaga.watch),
            call(BuildingsSaga.background)
        ]);
    }

}

export {
    RootSaga
}
