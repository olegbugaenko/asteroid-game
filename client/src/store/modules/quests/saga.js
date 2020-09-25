import { takeLatest, call, put, select } from 'redux-saga/effects';
import { QuestsService } from './../../../services/quests.service';
import * as Actions from './actions';

class QuestsSaga {

    static *updateHiddenStatus({payload}) {
        try {
            console.log('-----');
            const { data } = yield call(QuestsService.hideQuest, payload);
            console.log('pl', payload);
            yield put(Actions.updateQuestStatus({isHidden: payload}));
        } catch (e) {
            console.error(e);
        }
    }

    static *claimReward() {
        try {
            console.log('!!!-----');
            const { data } = yield call(QuestsService.claimReward);
            console.log('pl', payload);
            yield put(Actions.updateQuestStatus({status: 4}));
        } catch (e) {
            console.error(e);
        }
    }

    static *watch(){
        yield takeLatest(Actions.setHiddenStatus.type, QuestsSaga.updateHiddenStatus);
        yield takeLatest(Actions.claimReward.type, QuestsSaga.claimReward);
    }

}

export {
    QuestsSaga,
}
