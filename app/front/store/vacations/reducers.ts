import { handleActions, Action } from 'redux-actions'

import EntityLoadState, { initialState } from 'store/common/api/EntityLoadState'
import Collection from 'model/Collection'
import Vacation from 'model/Vacation'

import actions, {
    actionTypes,
} from './actions'


const handleFetchListRequest = (state: VacationsState, action: Action<{}>) => ({
    ...state,
    getList: {
        ...state.getList,
        loading: true,
    },
} as VacationsState)

const handleFetchListSuccess = (state: VacationsState, action: Action<Collection<Vacation>>) => ({
    ...state,
    getList: {
        ...state.getList,
        loading: false,
        error: false,
    },
    vacations: action.payload,
})

const handleFetchListFailure = (state: VacationsState, action: Action<{}>) => ({
    ...state,
    getList: {
        ...state.getList,
        loading: false,
        error: !!action.error,
    },
})

export interface VacationsState extends EntityLoadState {
    vacations?: Collection<Vacation>
}

export default handleActions(
    {
        [actionTypes.GET_LIST_REQUEST]: handleFetchListRequest,
        [actionTypes.GET_LIST_SUCCESS]: handleFetchListSuccess,
        [actionTypes.GET_LIST_FAILURE]: handleFetchListFailure,
    },
    {
        ...initialState,
    }
)
