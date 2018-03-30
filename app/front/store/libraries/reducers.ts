import { handleActions, Action } from 'redux-actions'

import EntityLoadState, { initialState } from 'store/common/api/EntityLoadState'
import { createReducers } from 'store/common/api/reducers'
import Library from 'model/Library'

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
    }
)
