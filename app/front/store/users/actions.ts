import { createTypes, createActionCreators, ActionsCreators } from 'store/common/api/actions'
import { getMyId } from 'util/api/helper'
import Collection from 'model/Collection'
import rest from 'util/api/rest'
import User from 'model/User'

import { UsersState } from './reducers'


const ENTITY = 'users'

export const actionTypes = createTypes(ENTITY)
export const actionCreators = createActionCreators<User>(ENTITY)

export const userRest = rest<User>(ENTITY)

const getList = () => (dispatch: any) => {
    dispatch(actionCreators.getListRequest())

    return userRest.getList()
        .then(
            collection => collection && dispatch(actionCreators.getListSuccess(collection)),
            err => dispatch(actionCreators.getListFailure())
        )
}

const get = (id?: number) => (dispatch: any) => {
    dispatch(actionCreators.getRequest())

    const promise = id
        ? new Promise<number>(resolve => resolve(id))
        : getMyId().then(response => parseInt(response.data, 10))

    return promise
        .then(id => userRest.get(id))
        .then(
            item => item && dispatch(actionCreators.getSuccess(item)),
            err => dispatch(actionCreators.getFailure())
        )
}

export interface UsersActions extends ActionsCreators<User> {
    getList?: () => Promise<Collection<User>>
    get?: (id?: number) => Promise<User>
}

export default {
    ...actionCreators,
    getList,
    get,
}
