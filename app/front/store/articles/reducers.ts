import { handleActions, Action } from 'redux-actions'

import EntityLoadState, { initialState } from 'store/common/api/EntityLoadState'
import { createReducers } from 'store/common/api/reducers'
import Article from 'model/Article'

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
    }
)
