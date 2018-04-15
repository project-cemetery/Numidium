import { AppState } from 'reducers'
import { ActionsCreators, createActionCreators, createTypes } from 'store/common/api/actions'

import Book from 'model/Book'
import rest from 'util/api/rest'

import { BooksState } from './reducers'

const ENTITY = 'books'

export const commonActionTypes = createTypes(ENTITY)
export const commonActionCreators = createActionCreators<Book>(ENTITY, (state: AppState) => state.books)

export interface BooksActions extends ActionsCreators<Book> {
}

export default {
    ...commonActionCreators,
}
