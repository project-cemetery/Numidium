import { createTypes, createActionCreators, ActionsCreators } from 'store/common/api/actions'
import { getMyId } from 'util/api/helper'
import Collection from 'model/Collection'
import rest from 'util/api/rest'
import Vacation from 'model/Vacation'

import { VacationsState } from './reducers'


const ENTITY = 'vacations'

export const commonActionTypes = createTypes(ENTITY)
export const commonActionCreators = createActionCreators<Vacation>(ENTITY)

export const vacationRest = rest<Vacation>(ENTITY)

const getList = (params?: any) => (dispatch: any) => {
    dispatch(commonActionCreators.getListRequest())

    const preparedParams = Object.keys(params).map(key => ({
        key,
        value: params[key],
    }))

    return vacationRest.getList(preparedParams)
        .then(
            collection => dispatch(commonActionCreators.getListSuccess(collection)),
            err => dispatch(commonActionCreators.getListFailure())
        )
}

const get = (id: number) => (dispatch: any) => {
    dispatch(commonActionCreators.getRequest())

    return vacationRest.get(id)
        .then(
            vacation => dispatch(commonActionCreators.getSuccess(vacation)),
            err => dispatch(commonActionCreators.getFailure()),
        )
}

export interface VacationsActions extends ActionsCreators<Vacation> {getList?: (params?: any) => Promise<Collection<Vacation>>
    get?: (id: any) => Promise<Vacation>
}

export default {
    ...commonActionCreators,
    getList,
    get,
}
