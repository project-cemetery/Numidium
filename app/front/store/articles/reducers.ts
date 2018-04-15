import { Action, handleActions } from 'redux-actions'

import Article from 'model/Article'
import EntityLoadState, { initialState } from 'store/common/api/EntityLoadState'
import { createReducers } from 'store/common/api/reducers'

import actions, { commonActionTypes } from './actions'

const commonReducers = createReducers<Article>(commonActionTypes)

export interface ArticlesState extends EntityLoadState<Article> {
}

export default handleActions(
    {
        ...commonReducers,
    } as any,
    {
        ...initialState,
    },
)
