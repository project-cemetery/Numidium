import { Action, handleActions } from 'redux-actions'

import Library from 'model/Library'
import EntityLoadState, { initialState } from 'store/common/api/EntityLoadState'
import { createReducers } from 'store/common/api/reducers'

import actions, { commonActionTypes } from './actions'

const commonReducers = createReducers<Library>(commonActionTypes)

export interface LibrariesState extends EntityLoadState<Library> {
}

export default handleActions(
    {
        ...commonReducers,
    } as any,
    {
        ...initialState,
    },
)
