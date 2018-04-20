import { Action, handleActions } from 'redux-actions'

import Collection from 'model/Collection'
import Vacation from 'model/Vacation'
import EntityLoadState, { initialState } from 'store/common/api/EntityLoadState'
import { createReducers } from 'store/common/api/reducers'

import Vacations from 'components/vacations/Vacations'
import actions, { commonActionTypes } from './actions'

const commonReducers = createReducers<Vacation>(commonActionTypes)

export interface VacationsState extends EntityLoadState<Vacation> {
}

export default handleActions(
    {
        ...commonReducers,
    } as any,
    {
        ...initialState,
    },
)
