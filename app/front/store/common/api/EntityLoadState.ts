import Collection from "model/Collection"


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

    entities: [],
} as EntityLoadState<any>

export default interface EntityLoadState<T> {
    getList: PartialState
    get: PartialState

    list?: Collection<T>
    entities: T[]
}
