import { AppState } from 'reducers'
import { ActionsCreators, createActionCreators, createTypes } from 'store/common/api/actions'

import Library from 'model/Library'
import rest from 'util/api/rest'

import { LibrariesState } from './reducers'

const ENTITY = 'libraries'

export const commonActionTypes = createTypes(ENTITY)
export const commonActionCreators = createActionCreators<Library>(ENTITY, (state: AppState) => state.libraries)

export interface LibrariesActions extends ActionsCreators<Library> {
}

export default {
    ...commonActionCreators,
}
