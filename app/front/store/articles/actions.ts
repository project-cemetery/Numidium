import { Actions } from 'rest-api-redux'

import Article, { ARTICLE_ENTITY } from 'model/Article'
import { AppState } from 'reducers'
import createActionCreators from 'store/common/rest/actions'

import { ArticlesState } from './reducers'

export const restActionCreators = createActionCreators<AppState, Article>(
    ARTICLE_ENTITY,
    (state: AppState) => state.articles,
)

export interface ArticlesActions extends Actions<Article> {
}

export default {
    ...restActionCreators,
} as any
