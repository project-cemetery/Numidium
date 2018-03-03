import { Action } from 'redux-actions'

import Collection from 'model/Collection'
import Entity from 'model/Entity'

import { ActionTypes } from './actions'
import State from './EntityLoadState'


const createHandleGetListRequest = <T extends Entity>() => (state: State<T>, action: Action<{}>) => ({
    ...state,
    getList: {
        ...state.getList,
        loading: true,
    },
})

const createHandleGetListSuccess = <T extends Entity>() => (state: State<T>, action: Action<Collection<T>>) => ({
    ...state,
    getList: {
        ...state.getList,
        loading: false,
        error: false,
    },
    list: action.payload,
})

const createHandleGetListFailure = <T extends Entity>() => (state: State<T>, action: Action<{}>) => ({
    ...state,
    getList: {
        ...state.getList,
        loading: false,
        error: !!action.error,
    },
})

const createHandleGetRequest = <T extends Entity>() => (state: State<T>, action: Action<{}>) => ({
    ...state,
    get: {
        ...state.get,
        loading: true,
    },
})

const createHandleGetSuccess = <T extends Entity>() => (state: State<T>, action: Action<T>) => ({
    ...state,
    get: {
        ...state.get,
        loading: false,
        error: false,
    },
    entities: [
        ...state.entities.filter(e => e['@id'] !== (action.payload as Entity)['@id']),
        action.payload,
    ],
})

const createHandleGetFailure = <T extends Entity>() => (state: State<T>, action: Action<{}>) => ({
    ...state,
    get: {
        ...state.get,
        loading: false,
        error: !!action.error,
    },
})

export const createReducers = <T extends Entity>(types: ActionTypes) => ({
    [types.GET_LIST_REQUEST]: createHandleGetListRequest<T>(),
    [types.GET_LIST_SUCCESS]: createHandleGetListSuccess<T>(),
    [types.GET_LIST_FAILURE]: createHandleGetListFailure<T>(),

    [types.GET_REQUEST]: createHandleGetRequest<T>(),
    [types.GET_SUCCESS]: createHandleGetSuccess<T>(),
    [types.GET_FAILURE]: createHandleGetFailure<T>(),
})
