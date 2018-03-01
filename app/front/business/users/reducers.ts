import { Dispatch } from 'redux'
import { handleActions, Action } from 'redux-actions'

import EntityLoadState, { initialState } from 'business/EntityLoadState'
import Collection from 'model/Collection'
import User from 'model/User'

import actions, {
    REQUEST_LIST, RECEIVE_LIST,
    RequestAction, ReceiveAction,
} from './actions'
import { Rest } from 'util/rest'


const handleRequestList = (state: UsersState, action: RequestAction) => ({
    ...state,
    loading: true,
})

const handleRecieveList = (state: UsersState, action: ReceiveAction) => ({
    ...state,
    loading: false,
    users: action.payload,
})

export interface UsersState extends EntityLoadState {
    users?: Collection<User>
    user?: User
}

export default handleActions(
    {
        [REQUEST_LIST]: handleRequestList,
        [RECEIVE_LIST]: handleRecieveList,
    },
    {
        ...initialState,
    }
)
