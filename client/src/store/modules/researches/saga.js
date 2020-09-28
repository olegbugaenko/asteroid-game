import { takeLatest, call, put, select } from 'redux-saga/effects';
import delay from '@redux-saga/delay-p';
import { ResearchesService } from './../../../services/researches.service';
import * as Actions from './actions';
import * as ColonyActions from './../colony/actions';
import {getResources} from "../colony/selector";

class ResearchesSaga {

    static *listResearches({payload}) {
        try {
            const { data } = yield call(ResearchesService.fetchList);
            yield put(Actions.getResearchesList.success(data));
        } catch (e) {
            console.error(e);
        }

    }

    static *listResearchQueue({payload}) {
        try {
            const { data } = yield call(ResearchesService.fetchQueue);
            yield put(Actions.getResearchQueue.success(data));
            yield put(ColonyActions.getColonyStatus());
        } catch (e) {
            console.error(e);
        }

    }

    static *postResearch({payload}) {
        try {
            console.log('payload', payload);
            const { data } = yield call(ResearchesService.research, payload);
            yield put(Actions.postResearchToQueue.success(data));
            yield put(Actions.getResearchQueue());
        } catch (e) {
            console.error(e);
        }

    }

    static *watch(){
        yield takeLatest(Actions.getResearchesList.type, ResearchesSaga.listResearches);
        yield takeLatest(Actions.postResearchToQueue.type, ResearchesSaga.postResearch);
        yield takeLatest(Actions.getResearchQueue.type, ResearchesSaga.listResearchQueue);
    }

    static *background(){
        while (true) {
            const queueItems = yield select(state => state.researches.queue);
            let shouldReload = false;
            yield put(Actions.getResearchQueue.success(queueItems.map(item => {
                if(item.status !== 'inprogress') {
                    return item;
                }
                let newProgress = item.progress + 1000;
                if(newProgress > item.maxprogress) {
                    console.log(newProgress, item.maxprogress);
                    shouldReload = true;
                }
                return {
                   ...item,
                    progress: newProgress,
                }
            })));
            if(shouldReload) {
                console.log('ReLoAd')
                yield put(Actions.getResearchQueue());
                yield put(Actions.getResearchesList());
                //window.location.reload();
            }
            yield delay(1000);
        }
    }

}

export {
    ResearchesSaga,
}
