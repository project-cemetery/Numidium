import { combineReducers } from 'redux'

import usersReducer, { UsersState } from 'store/users/reducers'

export interface AppState {
    users: UsersState
}

export default combineReducers({
    users: usersReducer,
})
