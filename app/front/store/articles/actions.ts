import { AppState } from 'reducers'
import { ActionsCreators, createActionCreators, createTypes } from 'store/common/api/actions'

import Article from 'model/Article'
import rest from 'util/api/rest'

import { ArticlesState } from './reducers'

const ENTITY = 'articles'

export const commonActionTypes = createTypes(ENTITY)
export const commonActionCreators = createActionCreators<Article>(ENTITY, (state: AppState) => state.articles)

export interface ArticlesActions extends ActionsCreators<Article> {
}

export default {
    ...commonActionCreators,
}
