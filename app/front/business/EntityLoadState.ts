export const initialState = {
    loading: false,
    error: false,
} as EntityLoadState

export default interface EntityLoadState {
    loading: boolean
    error: boolean
}
