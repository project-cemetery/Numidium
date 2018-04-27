import { Action, handleActions } from 'redux-actions'
import { EntityLoadState, getInitialState } from 'rest-api-redux'

import Article, { ARTICLE_ENTITY } from 'model/Article'
import createReducers from 'store/common/rest/reducers'

const restReducers = createReducers<Article>(ARTICLE_ENTITY)

export interface ArticlesState extends EntityLoadState<Article> {
}

export default handleActions(
    { ...restReducers } as any,
    { ...getInitialState<Article>() },
)
