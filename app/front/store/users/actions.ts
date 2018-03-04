import { Action } from 'redux-actions'

import { actionType, createTypes, createActionCreators, ActionsCreators } from 'store/common/api/actions'
import { getMyId } from 'util/api/helper'
import Collection from 'model/Collection'
import rest from 'util/api/rest'
import User from 'model/User'
import { AppState } from 'reducers'

import { UsersState } from './reducers'


const ENTITY = 'users'

export const commonActionTypes = createTypes(ENTITY)
export const commonActionCreators = createActionCreators<User>(
    ENTITY,
    (state: AppState) => state.users
)

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

// Override default `get` action!
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
    get?: (id?: number) => Promise<User>
}

export default {
    ...commonActionCreators,
    ...actionCreators,
    get,
}
