import { handleActions, Action } from 'redux-actions'

import EntityLoadState, { initialState } from 'store/common/api/EntityLoadState'
import { createCommonReducers } from 'store/common/api/reducers'
import Collection from 'model/Collection'
import Vacation from 'model/Vacation'

import actions, { actionTypes } from './actions'
import Vacations from 'components/vacations/Vacations';


const commonReducers = createCommonReducers<Vacation>(actionTypes)

export interface VacationsState extends EntityLoadState<Vacation> {
}

export default handleActions(
    {
        ...commonReducers,
    } as any,
    {
        ...initialState,
    }
)
