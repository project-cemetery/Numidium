import { Action } from 'redux-actions'

import Collection from 'model/Collection'

import { ActionTypes } from './actions'
import EntityLoadState from './EntityLoadState'


const createHandleGetListRequest = <T>() =>
    (state: EntityLoadState<T>, action: Action<{}>) => ({
        ...state,
        getList: {
            ...state.getList,
            loading: true,
        },
    })

const createHandleGetListSuccess = <T>() =>
    (state: EntityLoadState<T>, action: Action<Collection<T>>) => ({
        ...state,
        getList: {
            ...state.getList,
            loading: false,
            error: false,
        },
        list: action.payload,
    })

const createHandleGetListFailure = <T>() =>
    (state: EntityLoadState<T>, action: Action<{}>) => ({
        ...state,
        getList: {
            ...state.getList,
            loading: false,
            error: !!action.error,
        },
    })

export const createCommonReducers = <T>(types: ActionTypes) => ({
    [types.GET_LIST_REQUEST]: createHandleGetListRequest<T>(),
    [types.GET_LIST_SUCCESS]: createHandleGetListSuccess<T>(),
    [types.GET_LIST_FAILURE]: createHandleGetListFailure<T>(),
})
