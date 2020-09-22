import { takeLatest, call, put, select } from 'redux-saga/effects';
import delay from '@redux-saga/delay-p';
import { getResources } from "./selector";
import { ColonyService } from './../../../services/colony.service';
import * as Actions from './actions';

class ColonySaga {

    static *getColonyInfo({payload}) {
        try {
            const { data } = yield call(ColonyService.fetchColonyStatus);
            yield put(Actions.getColonyStatus.success(data));
        } catch (e) {
            console.error(e);
        }

    }

    static *watch(){
        yield takeLatest(Actions.getColonyStatus.type, ColonySaga.getColonyInfo);
    }

    static *background(){
        while (true) {
            const resources = yield select(getResources);
            yield put(Actions.updateAmounts(resources.map(resource => {
                if(!resource.amount.isStoreable) {
                    return resource;
                }
                let newAmount = resource.amount.amount + resource.production.amount/(3600);
                if(newAmount > resource.capacity.amount && resource.amount.isStoreable) {
                    newAmount = resource.capacity.amount;
                };
                return {
                    resourceCode: resource.amount.resourceCode,
                    newAmount,
                }
            })))
            yield delay(1000);
        }
    }

}

export {
    ColonySaga,
}
