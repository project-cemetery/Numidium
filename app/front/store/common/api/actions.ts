import { Action } from 'redux-actions'

import Collection from 'model/Collection'


export const actionType = (entity: string) => (name: string) => `${entity}/${name}`

export const createTypes = (entity: string) => ({
    GET_LIST_REQUEST: actionType(entity)('GET_LIST_REQUEST'),
    GET_LIST_FAILURE: actionType(entity)('GET_LIST_FAILURE'),
    GET_LIST_SUCCESS: actionType(entity)('GET_LIST_SUCCESS'),

    GET_REQUEST: actionType(entity)('GET_REQUEST'),
    GET_FAILURE: actionType(entity)('GET_FAILURE'),
    GET_SUCCESS: actionType(entity)('GET_SUCCESS'),
})

export interface ActionTypes {
    GET_LIST_REQUEST: string
    GET_LIST_FAILURE: string
    GET_LIST_SUCCESS: string

    GET_REQUEST: string
    GET_FAILURE: string
    GET_SUCCESS: string
}

export const createActionCreators = <T>(entity: string) => ({
    // List
    getListRequest: () => ({
        type: createTypes(entity).GET_LIST_REQUEST,
    } as Action<{}>),

    getListSuccess: (collection: Collection<T>) => ({
        type: createTypes(entity).GET_LIST_SUCCESS,
        payload: collection,
    } as Action<Collection<T>>),

    getListFailure: () => ({
        type: createTypes(entity).GET_LIST_FAILURE,
        error: true,
    } as Action<{}>),

    // Get
    getRequest: () => ({
        type: createTypes(entity).GET_REQUEST,
    } as Action<{}>),

    getSuccess: (object: T) => ({
        type: createTypes(entity).GET_SUCCESS,
        payload: object,
    } as Action<T>),

    getFailure: () => ({
        type: createTypes(entity).GET_FAILURE,
        error: true,
    } as Action<{}>),
})

export interface ActionsCreators<T> {
    getListRequest?: () => Action<{}>,
    getListSuccess?: (collection: Collection<T>) => Action<Collection<T>>,
    getListFailure?: () => Action<{}>,

    getRequest?: () => Action<{}>,
    getSuccess?: (object: T) => Action<T>,
    getFailure?: () => Action<{}>,
}
