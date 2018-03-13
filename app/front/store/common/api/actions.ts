import { Action } from 'redux-actions'

import Collection from 'model/Collection'
import rest from 'util/api/rest'
import { AppState } from 'reducers'
import EntityLoadState from './EntityLoadState'
import Entity from 'model/Entity'

// Request-Success-Failure
export const createRequestActionCreator = (type: string) =>
    () => ({ type } as Action<{}>)

export const createSuccessActionCreator = <T>(type: string) =>
    (object: T) => ({
        type,
        payload: object,
    } as Action<T>)

export const createFailureActionCreator = (type: string) =>
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

export const createActionCreators = <T extends Entity>(
    entity: string,
    getEntityState: (state: AppState) => EntityLoadState<T>
) => {
    const types = createTypes(entity)
    const entityRest = rest<T>(entity)

    const actionCreators =  {
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

    const getList = (params: any = {}) => (dispatch: any, getState: () => AppState) => {
        const loading = getEntityState(getState()).getList.loading

        dispatch(actionCreators.getListRequest())

        const preparedParams = Object.keys(params).map(key => ({
            key,
            value: params[key],
        }))

        return !loading
            ? entityRest.getList(preparedParams)
                .then(
                    collection => dispatch(actionCreators.getListSuccess(collection)),
                    err => dispatch(actionCreators.getListFailure())
                )
            : Promise.resolve()
    }

    const get = (id: number) => (dispatch: any, getState: () => AppState) => {
        const loading = getEntityState(getState()).get.loading

        dispatch(actionCreators.getRequest())

        return !loading
            ? entityRest.get(id)
                .then(
                    reponse => dispatch(actionCreators.getSuccess(reponse)),
                    err => dispatch(actionCreators.getFailure())
                )
            : Promise.resolve()
    }

    const post = (object: T) => (dispatch: any, getState: () => AppState) => {
        const loading = getEntityState(getState()).post.loading

        dispatch(actionCreators.postRequest())

        return !loading
            ? entityRest.post(object)
                .then(
                    response => dispatch(actionCreators.postSuccess(response)),
                    err => dispatch(actionCreators.postFailure())
                )
            : Promise.resolve()
    }

    const put = (object: T) => (dispatch: any, getState: () => AppState) => {
        const loading = getEntityState(getState()).put.loading

        dispatch(actionCreators.putRequest())

        return !loading
            ? entityRest.put(object.id, object)
                .then(
                    reponse => dispatch(actionCreators.putSuccess(reponse)),
                    err => dispatch(actionCreators.putFailure())
                )
            : Promise.resolve()
    }

    return {
        ...actionCreators,
        getList,
        get,
        post,
        put,
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

    getList?: (params?: any) => Promise<Collection<T>>
    get?: (id: number) => Promise<T>
    post?: (object: T) => Promise<T>
    put?: (object: T) => Promise<T>
}
