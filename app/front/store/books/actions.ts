import { createTypes, createActionCreators, ActionsCreators } from 'store/common/api/actions'
import { AppState } from 'reducers'


import rest from 'util/api/rest'
import Book from 'model/Book'

import { BooksState } from './reducers'


const ENTITY = 'books'

export const commonActionTypes = createTypes(ENTITY)
export const commonActionCreators = createActionCreators<Book>(ENTITY, (state: AppState) => state.books)

export interface BooksActions extends ActionsCreators<Book> {
}

export default {
    ...commonActionCreators,
}
