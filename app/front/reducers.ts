import { combineReducers } from 'redux'

import librariesReducers, { LibrariesState } from 'store/libraries/reducers'
import booksReducers, { BooksState } from 'store/books/reducers'
import modalReducers, { ModalState } from 'store/modal/reducers'
import usersReducer, { UsersState } from 'store/users/reducers'
import vacationsReduser, { VacationsState } from 'store/vacations/reducers'

export interface AppState {
    libraries: LibrariesState
    books: BooksState
    modal: ModalState
    users: UsersState
    vacations: VacationsState
}

export default combineReducers({
    libraries: librariesReducers,
    books: booksReducers,
    modal: modalReducers,
    users: usersReducer,
    vacations: vacationsReduser,
})
