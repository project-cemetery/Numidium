import { createTypes, createActionCreators, ActionsCreators } from 'store/common/api/actions'
import { AppState } from 'reducers'

import rest from 'util/api/rest'
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
