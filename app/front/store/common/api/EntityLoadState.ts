interface PartialState {
    loading: boolean
    error: boolean
}


export const initialState = {
    getList: {
        loading: false,
        error: false,
    },

    get: {
        loading: false,
        error: false,
    },
} as EntityLoadState

export default interface EntityLoadState {
    getList: PartialState
    get: PartialState
}
