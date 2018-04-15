import { createTypes, createActionCreators, ActionsCreators } from 'store/common/api/actions'
import { AppState } from 'reducers'


import rest from 'util/api/rest'
import Article from 'model/Article'

import { ArticlesState } from './reducers'


const ENTITY = 'articles'

export const commonActionTypes = createTypes(ENTITY)
export const commonActionCreators = createActionCreators<Article>(ENTITY, (state: AppState) => state.articles)

export interface ArticlesActions extends ActionsCreators<Article> {
}

export default {
    ...commonActionCreators,
}
