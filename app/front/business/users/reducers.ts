import { Dispatch } from 'redux'
import { handleActions, Action } from 'redux-actions'

import EntityLoadState, { initialState } from 'business/EntityLoadState'
import Collection from 'model/Collection'
import User from 'model/User'

import actions, {
    FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE,
    RequestAction, SuccessAction, FailureAction,
} from './actions'
import { Rest } from 'util/rest'


const handleFetchListRequest = (state: UsersState, action: RequestAction) => ({
    ...state,
    loading: true,
})

const handleFetchListSuccess = (state: UsersState, action: SuccessAction) => ({
    ...state,
    loading: false,
    error: false,
    users: action.payload,
})

const handleFetchListFailure = (state: UsersState, action: FailureAction) => ({
    ...state,
    loading: false,
    error: !!action.error,
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
    },
    {
        ...initialState,
    }
)
