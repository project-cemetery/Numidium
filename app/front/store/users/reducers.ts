import { Dispatch } from 'redux'
import { handleActions, Action } from 'redux-actions'

import EntityLoadState, { initialState } from 'store/EntityLoadState'
import Collection from 'model/Collection'
import User from 'model/User'

import actions, {
    FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE,
    ListRequestAction, ListSuccessAction, ListFailureAction,

    FETCH_ITEM_REQUEST, FETCH_ITEM_SUCCESS, FETCH_ITEM_FAILURE,
    ItemRequestAction, ItemSuccessAction, ItemFailureAction,
} from './actions'


const handleFetchListRequest = (state: UsersState, action: ListRequestAction) => ({
    ...state,
    loadingList: true,
})

const handleFetchListSuccess = (state: UsersState, action: ListSuccessAction) => ({
    ...state,
    loadingList: false,
    errorList: false,
    users: action.payload,
})

const handleFetchListFailure = (state: UsersState, action: ListFailureAction) => ({
    ...state,
    loadingList: false,
    errorList: !!action.error,
})

const handleFetchItemRequest = (state: UsersState, action: ItemRequestAction) => ({
    ...state,
    loadingItem: true,
})

// TODO: type of action
const handleFetchItemSuccess = (state: UsersState, action: any) => ({
    ...state,
    loadingItem: false,
    errorItem: false,
    user: action.payload,
})

const handleFetchItemFailure = (state: UsersState, action: ItemFailureAction) => ({
    ...state,
    loadingItem: false,
    errorItem: !!action.error,
})

export interface UsersState extends EntityLoadState {
    users?: Collection<User>
    user?: User
}

export default handleActions(
    {
        [FETCH_LIST_REQUEST]: handleFetchListRequest,
        [FETCH_LIST_SUCCESS]: handleFetchListSuccess,
        [FETCH_LIST_FAILURE]: handleFetchListFailure,

        [FETCH_ITEM_REQUEST]: handleFetchItemRequest,
        [FETCH_ITEM_SUCCESS]: handleFetchItemSuccess,
        [FETCH_ITEM_FAILURE]: handleFetchItemFailure,
    },
    {
        ...initialState,
    }
)
