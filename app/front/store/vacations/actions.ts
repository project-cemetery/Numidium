import Collection from 'model/Collection'
import Vacation from 'model/Vacation'
import { AppState } from 'reducers'
import { ActionsCreators, createActionCreators, createTypes } from 'store/common/api/actions'
import { getMyId } from 'util/api/helper'
import rest from 'util/api/rest'

import { VacationsState } from './reducers'

const ENTITY = 'vacations'

export const commonActionTypes = createTypes(ENTITY)
export const commonActionCreators = createActionCreators<Vacation>(ENTITY, (state: AppState) => state.vacations)

export interface VacationsActions extends ActionsCreators<Vacation> {
}

export default {
    ...commonActionCreators,
}
