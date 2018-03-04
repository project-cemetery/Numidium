import { Action } from 'redux-actions'

import Collection from 'model/Collection'

const createRequestActionCreator = (type: string) =>
    () => ({ type } as Action<{}>)

const createSuccessActionCreator = <T>(type: string) =>
    (object: T) => ({
        type,
        payload: object,
    } as Action<T>)

const createFailureActionCreator = (type: string) =>
    () => ({
        type,
        error: true,
    } as Action<{}>)

export const actionType = (entity: string) => (name: string) => `${entity}/${name}`

export const createTypes = (entity: string) => ({
    GET_LIST_REQUEST: actionType(entity)('GET_LIST_REQUEST'),
    GET_LIST_FAILURE: actionType(entity)('GET_LIST_FAILURE'),
    GET_LIST_SUCCESS: actionType(entity)('GET_LIST_SUCCESS'),

    GET_REQUEST: actionType(entity)('GET_REQUEST'),
    GET_FAILURE: actionType(entity)('GET_FAILURE'),
    GET_SUCCESS: actionType(entity)('GET_SUCCESS'),

    POST_REQUEST: actionType(entity)('POST_REQUEST'),
    POST_SUCCESS: actionType(entity)('POST_SUCCESS'),
    POST_FAILURE: actionType(entity)('POST_FAILURE'),

    PUT_REQUEST: actionType(entity)('PUT_REQUEST'),
    PUT_SUCCESS: actionType(entity)('PUT_SUCCESS'),
    PUT_FAILURE: actionType(entity)('PUT_FAILURE'),

    DELETE_REQUEST: actionType(entity)('DELETE_REQUEST'),
    DELETE_SUCCESS: actionType(entity)('DELETE_SUCCESS'),
    DELETE_FAILURE: actionType(entity)('DELETE_FAILURE'),
})

export interface ActionTypes {
    GET_LIST_REQUEST: string
    GET_LIST_FAILURE: string
    GET_LIST_SUCCESS: string

    GET_REQUEST: string
    GET_FAILURE: string
    GET_SUCCESS: string

    POST_REQUEST: string
    POST_FAILURE: string
    POST_SUCCESS: string

    PUT_REQUEST: string
    PUT_FAILURE: string
    PUT_SUCCESS: string

    DELETE_REQUEST: string
    DELETE_FAILURE: string
    DELETE_SUCCESS: string
}

export const createActionCreators = <T>(entity: string) => {
    const types = createTypes(entity)

    return {
        // List
        getListRequest: createRequestActionCreator(types.GET_LIST_REQUEST),
        getListSuccess: createSuccessActionCreator<Collection<T>>(types.GET_LIST_SUCCESS),
        getListFailure: createFailureActionCreator(types.GET_LIST_FAILURE),

        // Get
        getRequest: createRequestActionCreator(types.GET_REQUEST),
        getSuccess: createSuccessActionCreator<T>(types.GET_SUCCESS),
        getFailure: createFailureActionCreator(types.GET_FAILURE),

        // Post
        postRequest: createRequestActionCreator(types.POST_REQUEST),
        postSuccess: createSuccessActionCreator<T>(types.POST_SUCCESS),
        postFailure: createFailureActionCreator(types.POST_FAILURE),

        // Put
        putRequest: createRequestActionCreator(types.PUT_REQUEST),
        putSuccess: createSuccessActionCreator<T>(types.PUT_SUCCESS),
        putFailure: createFailureActionCreator(types.PUT_FAILURE),

        // Delete
        deleteRequest: createRequestActionCreator(types.DELETE_REQUEST),
        deleteSuccess: createSuccessActionCreator<boolean>(types.DELETE_SUCCESS),
        deleteFailure: createFailureActionCreator(types.DELETE_FAILURE),
    }
}

export interface ActionsCreators<T> {
    getListRequest?: () => Action<{}>,
    getListSuccess?: (collection: Collection<T>) => Action<Collection<T>>,
    getListFailure?: () => Action<{}>,

    getRequest?: () => Action<{}>,
    getSuccess?: (object: T) => Action<T>,
    getFailure?: () => Action<{}>,

    postRequest?: () => Action<{}>,
    postSuccess?: (object: T) => Action<T>,
    postFailure?: () => Action<{}>,

    putRequest?: () => Action<{}>,
    putSuccess?: (object: T) => Action<T>,
    putFailure?: () => Action<{}>,

    deleteRequest?: () => Action<{}>,
    deleteSuccess?: (flag: boolean) => Action<boolean>,
    deleteFailure?: () => Action<{}>,
}
