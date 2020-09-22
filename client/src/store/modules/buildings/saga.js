import { takeLatest, call, put, select } from 'redux-saga/effects';
import delay from '@redux-saga/delay-p';
import { BuildingsService } from './../../../services/buildings.service';
import * as Actions from './actions';
import * as ColonyActions from './../colony/actions';
import {getResources} from "../colony/selector";

class BuildingsSaga {

    static *listBuildings({payload}) {
        try {
            const { data } = yield call(BuildingsService.fetchList);
            yield put(Actions.getBuildingsList.success(data));
        } catch (e) {
            console.error(e);
        }

    }

    static *listBuildingQueue({payload}) {
        try {
            const { data } = yield call(BuildingsService.fetchQueue);
            yield put(Actions.getBuildingQueue.success(data));
            yield put(ColonyActions.getColonyStatus());
        } catch (e) {
            console.error(e);
        }

    }

    static *postBuilding({payload}) {
        try {
            console.log('payload', payload);
            const { data } = yield call(BuildingsService.build, payload);
            yield put(Actions.postBuildingToQueue.success(data));
            yield put(Actions.getBuildingQueue());
        } catch (e) {
            console.error(e);
        }

    }

    static *watch(){
        yield takeLatest(Actions.getBuildingsList.type, BuildingsSaga.listBuildings);
        yield takeLatest(Actions.postBuildingToQueue.type, BuildingsSaga.postBuilding);
        yield takeLatest(Actions.getBuildingQueue.type, BuildingsSaga.listBuildingQueue);
    }

    static *background(){
        while (true) {
            const queueItems = yield select(state => state.buildings.queue);
            let shouldReload = false;
            yield put(Actions.getBuildingQueue.success(queueItems.map(item => {
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
                yield put(Actions.getBuildingQueue());
                yield put(Actions.getBuildingsList());
                //window.location.reload();
            }
            yield delay(1000);
        }
    }

}

export {
    BuildingsSaga,
}
