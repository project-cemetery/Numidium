import { Action, handleActions } from 'redux-actions'

import Book from 'model/Book'
import EntityLoadState, { initialState } from 'store/common/api/EntityLoadState'
import { createReducers } from 'store/common/api/reducers'

import actions, { commonActionTypes } from './actions'

const commonReducers = createReducers<Book>(commonActionTypes)

export interface BooksState extends EntityLoadState<Book> {
}

export default handleActions(
    {
        ...commonReducers,
    } as any,
    {
        ...initialState,
    },
)
