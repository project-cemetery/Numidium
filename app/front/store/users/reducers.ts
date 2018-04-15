import { Action, handleActions } from 'redux-actions'

import Collection from 'model/Collection'
import User from 'model/User'
import EntityLoadState, { initialState, PartialState } from 'store/common/api/EntityLoadState'
import { createReducers } from 'store/common/api/reducers'

import actions, { actionTypes, commonActionTypes } from './actions'

const commonReducers = createReducers<User>(commonActionTypes)

const handleMeRequest = (state: UsersState, action: Action<{}>) => ({
    ...state,
    me: {
        ...state.me,
        loading: true,
    },
})

const handleMeSuccess = (state: UsersState, action: Action<number>) => ({
    ...state,
    me: {
        ...state.me,
        loading: false,
        error: false,
    },
    meId: action.payload || state.meId,
})

const handleMeError = (state: UsersState, action: Action<{}>) => ({
    ...state,
    me: {
        ...state.me,
        loading: false,
        error: !!action.error,
    },
})

export interface UsersState extends EntityLoadState<User> {
    me: PartialState
    meId?: number
}

export default handleActions(
    {
        ...commonReducers,
        [actionTypes.ME_REQUEST]: handleMeRequest,
        [actionTypes.ME_SUCCESS]: handleMeSuccess,
        [actionTypes.ME_FAILURE]: handleMeError,
    } as any,
    {
        ...initialState,
        me: {
            loading: false,
            error: false,
        } as PartialState,
    },
)
