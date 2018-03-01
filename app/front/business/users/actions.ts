import { Action } from 'redux-actions'

import Collection from 'model/Collection'
import User from 'model/User'


const actionType = (name: string) => `users/${name}`

export const REQUEST_LIST = actionType('REQUEST_LIST')
export const RECEIVE_LIST = actionType('RECEIVE_LIST')

export type RequestAction = Action<{}>
export type ReceiveAction = Action<Collection<User>>

const requestList = () => ({
    type: REQUEST_LIST,
} as ReceiveAction)

const receiveList = (users: Collection<User>) => ({
    type: RECEIVE_LIST,
    payload: users,
} as ReceiveAction)

export interface UsersActions {
    requestList?: () => RequestAction
    receiveList?: () => ReceiveAction
}

export default {
    requestList,
    receiveList,
}
