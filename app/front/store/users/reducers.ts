import { handleActions, Action } from 'redux-actions'

import EntityLoadState, { initialState } from 'store/common/api/EntityLoadState'
import { createCommonReducers } from 'store/common/api/reducers'
import Collection from 'model/Collection'
import User from 'model/User'

import actions, { actionTypes } from './actions'


const commonReducers = createCommonReducers<User>(actionTypes)

const handleFetchItemRequest = (state: UsersState, action: Action<{}>) => ({
    ...state,
    get: {
        ...state.get,
        loading: true,
    },
})

// TODO: type of action
const handleFetchItemSuccess = (state: UsersState, action: any) => ({
    ...state,
    get: {
        ...state.get,
        loading: false,
        error: false,
    },
    user: action.payload,
})

const handleFetchItemFailure = (state: UsersState, action: Action<{}>) => ({
    ...state,
    get: {
        ...state.get,
        loading: false,
        error: !!action.error,
    },
})

export interface UsersState extends EntityLoadState<User> {
    user?: User
}

export default handleActions(
    {
        ...commonReducers,

        [actionTypes.GET_REQUEST]: handleFetchItemRequest,
        [actionTypes.GET_SUCCESS]: handleFetchItemSuccess,
        [actionTypes.GET_FAILURE]: handleFetchItemFailure,
    } as any,
    {
        ...initialState,
    }
)
