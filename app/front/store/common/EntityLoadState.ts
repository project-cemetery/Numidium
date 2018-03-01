export const initialState = {
    loadingList: false,
    loadingItem: false,

    errorList: false,
    errorItem: false,
} as EntityLoadState

export default interface EntityLoadState {
    loadingList: boolean
    loadingItem: boolean

    errorList: boolean
    errorItem: boolean
}
