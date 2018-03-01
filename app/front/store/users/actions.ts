import { Action } from 'redux-actions'
import { MiddlewareAPI } from 'redux'

import Collection from 'model/Collection'
import User from 'model/User'
import rest from 'util/rest'
import { getMyId } from 'util/helperApi'

import { UsersState } from './reducers'


const actionType = (name: string) => `users/${name}`

export const FETCH_LIST_REQUEST = actionType('FETCH_LIST_REQUEST')
export const FETCH_LIST_FAILURE = actionType('FETCH_LIST_FAILURE')
export const FETCH_LIST_SUCCESS = actionType('FETCH_LIST_SUCCESS')

export const FETCH_ITEM_REQUEST = actionType('FETCH_ITEM_REQUEST')
export const FETCH_ITEM_FAILURE = actionType('FETCH_ITEM_FAILURE')
export const FETCH_ITEM_SUCCESS = actionType('FETCH_ITEM_SUCCESS')

export type ListRequestAction = Action<{}>
export type ListFailureAction = Action<{}>
export type ListSuccessAction = Action<Collection<User>>

export type ItemRequestAction = Action<{}>
export type ItemFailureAction = Action<{}>
export type ItemSuccessAction = Action<User>

const fetchListRequest = () => ({
    type: FETCH_LIST_REQUEST,
} as ListRequestAction)

const fetchListSuccess = (users: Collection<User>) => ({
    type: FETCH_LIST_SUCCESS,
    payload: users,
} as ListSuccessAction)

const fetchListFailure = () => ({
    type: FETCH_LIST_FAILURE,
    error: true,
} as ListFailureAction)

const fetchUsers = () => (dispatch: any) => {
    dispatch(fetchListRequest())

    return rest<User>('users').getList()
        .then(response => response.data)
        .then(collection => collection && dispatch(fetchListSuccess(collection)))
}

const fetchItemRequest = () => ({
    type: FETCH_ITEM_REQUEST,
} as ItemRequestAction)

const fetchItemSuccess = (user: User) => ({
    type: FETCH_ITEM_SUCCESS,
    payload: user,
} as ItemSuccessAction)

const fetchItemFailure = () => ({
    type: FETCH_ITEM_FAILURE,
    error: true,
} as ItemFailureAction)

const fetchUser = (id?: number) => (dispatch: any) => {
    dispatch(fetchItemRequest())

    const promise = id
        ? new Promise<number>(resolve => resolve(id))
        : getMyId().then(response => parseInt(response.data, 10))

    return promise
        .then(id => rest<User>('users').get(id))
        .then(response => response.data)
        .then(
            item => item && dispatch(fetchItemSuccess(item)),
            err => dispatch(fetchItemFailure())
        )
}

export interface UsersActions {
    fetchListRequest?: () => ListRequestAction
    fetchListSuccess?: () => ListSuccessAction
    fetchListFailure?: () => ListFailureAction
    fetchUsers?: () => Promise<Collection<User>>

    fetchItemRequest?: () => ItemRequestAction
    fetchItemSuccess?: () => ItemSuccessAction
    fetchItemFailure?: () => ItemFailureAction
    fetchUser?: (id?: number) => Promise<User>
}

export default {
    fetchListRequest,
    fetchListSuccess,
    fetchListFailure,
    fetchUsers,

    fetchItemRequest,
    fetchItemSuccess,
    fetchItemFailure,
    fetchUser,
}
