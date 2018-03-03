import { createTypes, createActionCreators, ActionsCreators } from 'store/common/api/actions'
import { getMyId } from 'util/api/helper'
import Collection from 'model/Collection'
import rest from 'util/api/rest'
import Vacation from 'model/Vacation'

import { VacationsState } from './reducers'


const ENTITY = 'vacations'

export const actionTypes = createTypes(ENTITY)
export const actionCreators = createActionCreators<Vacation>(ENTITY)

export const vacationRest = rest<Vacation>(ENTITY)

const getList = (params?: any) => (dispatch: any) => {
    dispatch(actionCreators.getListRequest())

    const preparedParams = Object.keys(params).map(key => ({
        key,
        value: params[key],
    }))

    return vacationRest.getList(preparedParams)
        .then(
            collection => dispatch(actionCreators.getListSuccess(collection)),
            err => dispatch(actionCreators.getListFailure())
        )
}

const get = (id: number) => (dispatch: any) => {
    dispatch(actionCreators.getRequest())

    return vacationRest.get(id)
        .then(
            vacation => dispatch(actionCreators.getSuccess(vacation)),
            err => dispatch(actionCreators.getFailure()),
        )
}

export interface VacationsActions extends ActionsCreators<Vacation> {
    getList?: (params?: any) => Promise<Collection<Vacation>>
    get?: (id: any) => Promise<Vacation>
}

export default {
    ...actionCreators,
    getList,
    get,
}
