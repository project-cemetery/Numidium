import Collection from 'model/Collection'


interface PartialState {
    loading: boolean
    error: boolean
}

export const initialState = {
    getList: {
        loading: false,
        error: false,
    } as PartialState,

    get: {
        loading: false,
        error: false,
    } as PartialState,

    post: {
        loading: false,
        error: false,
    } as PartialState,

    put: {
        loading: false,
        error: false,
    } as PartialState,

    delete: {
        loading: false,
        error: false,
    } as PartialState,

    entities: [],
} as EntityLoadState<any>

export default interface EntityLoadState<T> {
    getList: PartialState
    get: PartialState
    post: PartialState
    put: PartialState
    delete: PartialState

    list?: Collection<T>
    entities: T[]
}
