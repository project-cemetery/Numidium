import { Action } from 'redux-actions'
import { MiddlewareAPI } from 'redux'

import Collection from 'model/Collection'
import User from 'model/User'
import rest from 'util/rest'

import { UsersState } from './reducers'


const actionType = (name: string) => `users/${name}`

export const FETCH_LIST_REQUEST = actionType('FETCH_LIST_REQUEST')
export const FETCH_LIST_FAILURE = actionType('FETCH_LIST_FAILURE')
export const FETCH_LIST_SUCCESS = actionType('FETCH_LIST_SUCCESS')

export type RequestAction = Action<{}>
export type FailureAction = Action<{}>
export type SuccessAction = Action<Collection<User>>

const fetchListRequest = () => ({
    type: FETCH_LIST_REQUEST,
} as RequestAction)

const fetchListSuccess = (users: Collection<User>) => ({
    type: FETCH_LIST_SUCCESS,
    payload: users,
} as SuccessAction)

const fetchListFailure = () => ({
    type: FETCH_LIST_FAILURE,
    error: true,
} as FailureAction)



const fetchUsers = () => (dispatch: any) => {
    dispatch(fetchListRequest())

    return rest<User>('users').getList()
        .then(response => response.data)
        .then(collection => collection && dispatch(fetchListSuccess(collection)))
}

export interface UsersActions {
    fetchListRequest?: () => RequestAction
    fetchListSuccess?: () => SuccessAction
    fetchListFailure?: () => FailureAction
    fetchUsers?: () => Promise<Collection<User>>
}

export default {
    fetchListRequest,
    fetchListSuccess,
    fetchListFailure,
    fetchUsers,
}
