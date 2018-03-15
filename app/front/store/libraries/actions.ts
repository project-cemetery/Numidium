import { createTypes, createActionCreators, ActionsCreators } from 'store/common/api/actions'
import { AppState } from 'reducers'

import { getMyId } from 'util/api/helper'
import rest from 'util/api/rest'

import Collection from 'model/Collection'
import Library from 'model/Library'

import { LibrariesState } from './reducers'


const ENTITY = 'libraries'

export const commonActionTypes = createTypes(ENTITY)
export const commonActionCreators = createActionCreators<Library>(ENTITY, (state: AppState) => state.libraries)

export interface LibrariesActions extends ActionsCreators<Library> {
}

export default {
    ...commonActionCreators,
}
