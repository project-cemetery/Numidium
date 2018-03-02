import { combineReducers } from 'redux'

import usersReducer, { UsersState } from 'store/users/reducers'
import vacationsReduser, { VacationsState } from 'store/vacations/reducers'

export interface AppState {
    users: UsersState
    vacations: VacationsState
}

export default combineReducers({
    users: usersReducer,
    vacations: vacationsReduser,
})
