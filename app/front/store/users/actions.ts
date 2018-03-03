import { Action } from 'redux-actions'

import { actionType, createTypes, createActionCreators, ActionsCreators } from 'store/common/api/actions'
import { getMyId } from 'util/api/helper'
import Collection from 'model/Collection'
import rest from 'util/api/rest'
import User from 'model/User'

import { UsersState } from './reducers'


const ENTITY = 'users'

export const commonActionTypes = createTypes(ENTITY)
export const commonActionCreators = createActionCreators<User>(ENTITY)

export const actionTypes = {
    SET_CURRENT_ID: actionType(ENTITY)('SET_CURRENT_ID'),
}

const actionCreators = {
    setCurrentId: (id: number) => ({
        type: actionTypes.SET_CURRENT_ID,
        payload: id,
    } as Action<number>),
}

export const userRest = rest<User>(ENTITY)

const getList = () => (dispatch: any) => {
    dispatch(commonActionCreators.getListRequest())

    return userRest.getList()
        .then(
            collection => collection && dispatch(commonActionCreators.getListSuccess(collection)),
            err => dispatch(commonActionCreators.getListFailure())
        )
}

const get = (id?: number) => (dispatch: any) => {
    dispatch(commonActionCreators.getRequest())

    const promise = id
        ? new Promise<number>(resolve => resolve(id))
        : getMyId()
            .then(response => parseInt(response.data, 10))
            .then(id => {
                dispatch(actionCreators.setCurrentId(id))
                return id
            })

    return promise
        .then(id => userRest.get(id))
        .then(
            item => item && dispatch(commonActionCreators.getSuccess(item)),
            err => dispatch(commonActionCreators.getFailure())
        )
}

export interface UsersActions extends ActionsCreators<User> {
    setCurrentId?: (id: number) => void

    getList?: () => Promise<Collection<User>>
    get?: (id?: number) => Promise<User>
}

export default {
    ...commonActionCreators,
    ...actionCreators,
    getList,
    get,
}
