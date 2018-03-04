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

const createHandleGetListSuccess = <T extends Entity>() => (state: State<T>, action: Action<Collection<T>>) => {
    const newIds = action.payload
        ? action.payload.member.map(v => v['@id'])
        : []

    return ({
        ...state,
        getList: {
            ...state.getList,
            loading: false,
            error: false,
        },
        list: action.payload,
        entities: [
            ...state.entities.filter(e => newIds.indexOf(e['@id']) === -1),
            ...(action.payload ? action.payload.member : []),
        ],
    })
}

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

const createHandlePostRequest = <T extends Entity>() => (state: State<T>, action: Action<{}>) => ({
    ...state,
    post: {
        ...state.get,
        loading: true,
    },
})

const createHandlePostSuccess = <T extends Entity>() => (state: State<T>, action: Action<T>) => ({
    ...state,
    post: {
        ...state.get,
        loading: false,
        error: false,
    },
    entities: [
        ...state.entities.filter(e => e['@id'] !== (action.payload as Entity)['@id']),
        action.payload,
    ],
})

const createHandlePostFailure = <T extends Entity>() => (state: State<T>, action: Action<{}>) => ({
    ...state,
    post: {
        ...state.get,
        loading: false,
        error: !!action.error,
    },
})

const createHandlePutRequest = <T extends Entity>() => (state: State<T>, action: Action<{}>) => ({
    ...state,
    put: {
        ...state.get,
        loading: true,
    },
})

const createHandlePutSuccess = <T extends Entity>() => (state: State<T>, action: Action<T>) => ({
    ...state,
    put: {
        ...state.get,
        loading: false,
        error: false,
    },
    entities: [
        ...state.entities.filter(e => e['@id'] !== (action.payload as Entity)['@id']),
        action.payload,
    ],
})

const createHandlePutFailure = <T extends Entity>() => (state: State<T>, action: Action<{}>) => ({
    ...state,
    put: {
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

    [types.POST_REQUEST]: createHandlePostRequest<T>(),
    [types.POST_SUCCESS]: createHandlePostSuccess<T>(),
    [types.POST_FAILURE]: createHandlePostFailure<T>(),

    [types.PUT_REQUEST]: createHandlePutRequest<T>(),
    [types.PUT_SUCCESS]: createHandlePutSuccess<T>(),
    [types.PUT_FAILURE]: createHandlePutFailure<T>(),
})
