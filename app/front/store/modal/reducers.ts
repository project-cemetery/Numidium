import { handleActions, Action } from 'redux-actions'

import actionCreator, { actionTypes, ModalEnum } from './actions'


const handleShow = (state: ModalState, action: Action<{modal: ModalEnum, id?: number}>) => ({
    ...state,
    show: true,
    type: !!action.payload && action.payload.modal,
    id: !!action.payload && action.payload.id,
})

const handleHide = (state: ModalState, action: Action<{}>) => ({
    ...state,
    show: false,
})

export interface ModalState {
    show: boolean
    type?: ModalEnum
    id?: number
}

const initialState = {
    show: false,
} as ModalState

export default handleActions(
    {
        [actionTypes.SHOW]: handleShow,
        [actionTypes.HIDE]: handleHide,
    } as any,
    {
        ...initialState,
    }
)
