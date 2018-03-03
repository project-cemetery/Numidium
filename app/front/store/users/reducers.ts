import { handleActions, Action } from 'redux-actions'

import EntityLoadState, { initialState } from 'store/common/api/EntityLoadState'
import { createReducers } from 'store/common/api/reducers'
import Collection from 'model/Collection'
import User from 'model/User'

import actions, { actionTypes, commonActionTypes } from './actions'


const commonReducers = createReducers<User>(commonActionTypes)

const handleSetCurrentId = (state: UsersState, action: Action<{ id: number }>) => ({
    ...state,
    currentId: action.payload,
})

export interface UsersState extends EntityLoadState<User> {
    currentId?: number
}

export default handleActions(
    {
        ...commonReducers,
        [actionTypes.SET_CURRENT_ID]: handleSetCurrentId,
    } as any,
    {
        ...initialState,
    }
)
