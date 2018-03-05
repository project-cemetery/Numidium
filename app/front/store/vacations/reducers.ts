import { handleActions, Action } from 'redux-actions'

import EntityLoadState, { initialState } from 'store/common/api/EntityLoadState'
import { createReducers } from 'store/common/api/reducers'
import Collection from 'model/Collection'
import Vacation from 'model/Vacation'

import actions, { commonActionTypes } from './actions'
import Vacations from 'components/vacations/Vacations'


const commonReducers = createReducers<Vacation>(commonActionTypes)

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
