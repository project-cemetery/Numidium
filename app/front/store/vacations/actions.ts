import { createTypes, createActionCreators, ActionsCreators } from 'store/common/api/actions'
import { getMyId } from 'util/api/helper'
import Collection from 'model/Collection'
import rest from 'util/api/rest'
import Vacation from 'model/Vacation'
import { AppState } from 'reducers'

import { VacationsState } from './reducers'


const ENTITY = 'vacations'

export const vacationRest = rest<Vacation>(ENTITY)

export const commonActionTypes = createTypes(ENTITY)
export const commonActionCreators = createActionCreators<Vacation>(
    ENTITY,
    (state: AppState) => state.vacations
)

const get = (id: number) => (dispatch: any) => {
    dispatch(commonActionCreators.getRequest())

    return vacationRest.get(id)
        .then(
            vacation => dispatch(commonActionCreators.getSuccess(vacation)),
            err => dispatch(commonActionCreators.getFailure())
        )
}

const post = (vacation: Vacation) => (dispatch: any) => {
    dispatch(commonActionCreators.postRequest())

    return vacationRest.post(vacation)
        .then(
            vacation => dispatch(commonActionCreators.postSuccess(vacation)),
            err => dispatch(commonActionCreators.postFailure())
        )
}

const put = (vacation: Vacation) => (dispatch: any) => {
    dispatch(commonActionCreators.putRequest())

    return vacationRest.put(vacation.id, vacation)
        .then(
            vacation => dispatch(commonActionCreators.putSuccess(vacation)),
            err => dispatch(commonActionCreators.putFailure())
        )
}

export interface VacationsActions extends ActionsCreators<Vacation> {
    get?: (id: any) => Promise<Vacation>
    post?: (vacation: Vacation) => Promise<Vacation>
    put?: (vacation: Vacation) => Promise<Vacation>
}

export default {
    ...commonActionCreators,
    get,
    post,
    put,
}
