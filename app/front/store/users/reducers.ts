import { handleActions, Action } from 'redux-actions'

import EntityLoadState, { initialState } from 'store/common/api/EntityLoadState'
import Collection from 'model/Collection'
import User from 'model/User'

import actions, {
    actionTypes,
} from './actions'


const handleFetchListRequest = (state: UsersState, action: Action<{}>) => ({
    ...state,
    getList: {
        ...state.getList,
        loading: true,
    },
})

const handleFetchListSuccess = (state: UsersState, action: Action<Collection<User>>) => ({
    ...state,
    getList: {
        ...state.getList,
        loading: false,
        error: false,
    },
    users: action.payload,
})

const handleFetchListFailure = (state: UsersState, action: Action<{}>) => ({
    ...state,
    getList: {
        ...state.getList,
        loading: false,
        error: !!action.error,
    },
})

const handleFetchItemRequest = (state: UsersState, action: Action<{}>) => ({
    ...state,
    get: {
        ...state.get,
        loading: true,
    },
})

// TODO: type of action
const handleFetchItemSuccess = (state: UsersState, action: any) => ({
    ...state,
    get: {
        ...state.get,
        loading: false,
        error: false,
    },
    user: action.payload,
})

const handleFetchItemFailure = (state: UsersState, action: Action<{}>) => ({
    ...state,
    get: {
        ...state.get,
        loading: false,
        error: !!action.error,
    },
})

export interface UsersState extends EntityLoadState {
    users?: Collection<User>
    user?: User
}

export default handleActions(
    {
        [actionTypes.GET_LIST_REQUEST]: handleFetchListRequest,
        [actionTypes.GET_LIST_SUCCESS]: handleFetchListSuccess,
        [actionTypes.GET_LIST_FAILURE]: handleFetchListFailure,

        [actionTypes.GET_REQUEST]: handleFetchItemRequest,
        [actionTypes.GET_SUCCESS]: handleFetchItemSuccess,
        [actionTypes.GET_FAILURE]: handleFetchItemFailure,
    },
    {
        ...initialState,
    }
)
