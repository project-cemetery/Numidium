import { combineReducers } from 'redux'

import usersReducer, { UsersState } from 'business/users/reducers'

export interface AppState {
    users: UsersState
}

export default combineReducers({
    users: usersReducer,
})
