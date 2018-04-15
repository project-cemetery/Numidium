import { Action } from 'redux-actions'

import Collection from 'model/Collection'
import User from 'model/User'
import { AppState } from 'reducers'
import {
    ActionsCreators, actionType, createActionCreators, createFailureActionCreator,
    createRequestActionCreator, createSuccessActionCreator, createTypes,
} from 'store/common/api/actions'
import { getMyId } from 'util/api/helper'
import rest from 'util/api/rest'

import { UsersState } from './reducers'

const ENTITY = 'users'

export const commonActionTypes = createTypes(ENTITY)
export const commonActionCreators = createActionCreators<User>(
    ENTITY,
    (state: AppState) => state.users,
)

export const actionTypes = {
    ME_REQUEST: actionType(ENTITY)('ME_REQUEST'),
    ME_SUCCESS: actionType(ENTITY)('ME_SUCCESS'),
    ME_FAILURE: actionType(ENTITY)('ME_FAILURE'),
}

const actionCreators = {
    meRequest: createRequestActionCreator(actionTypes.ME_REQUEST),
    meSuccess: createSuccessActionCreator<number>(actionTypes.ME_SUCCESS),
    meFailure: createFailureActionCreator(actionTypes.ME_FAILURE),
}

export const userRest = rest<User>(ENTITY)

const getMe = () => (dispatch: any, getState: () => AppState) => {
    const loading = getState().users.me.loading

    dispatch(actionCreators.meRequest())

    return !loading
        ? getMyId()
            .then(
                (id) => {
                    dispatch(actionCreators.meSuccess(id))
                    dispatch(commonActionCreators.get(id))
                },
                (err) => dispatch(actionCreators.meFailure()),
            )
        : Promise.resolve()
}

export interface UsersActions extends ActionsCreators<User> {
    meRequest?: () => Action<{}>
    meSuccess?: (id: number) => Action<number>
    meFailure?: () => Action<{}>

    getMe?: () => Promise<number>
}

export default {
    ...commonActionCreators,
    ...actionCreators,
    getMe,
}
