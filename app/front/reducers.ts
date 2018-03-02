import { combineReducers } from 'redux'

import usersReducer, { UsersState } from 'store/users/reducers'
import vacationsReduser, { VacationsState } from 'store/vacations/reducers'
import modalReducers, { ModalState } from 'store/modal/reducers'

export interface AppState {
    users: UsersState
    vacations: VacationsState
    modal: ModalState
}

export default combineReducers({
    users: usersReducer,
    vacations: vacationsReduser,
    modal: modalReducers,
})
