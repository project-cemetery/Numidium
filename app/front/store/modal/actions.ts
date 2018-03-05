import { Action } from 'redux-actions'

const actionType = (name: string) => `modal/${name}`

export const actionTypes = {
    SHOW: actionType('SHOW'),
    HIDE: actionType('HIDE'),
}

export enum ModalEnum {
    VACATION = 'vacation',
}

export interface ModalActions {
    show?: (type: ModalEnum, id?: number) => Action<{modal: ModalEnum, id?: number}>
    hide?: () => Action<{}>
}

export default {
    show: (type: ModalEnum, id?: number) => ({
        type: actionTypes.SHOW,
        payload: {
            modal: ModalEnum.VACATION,
            id,
        },
    } as Action<{modal: ModalEnum, id?: number}>),

    hide: () => ({
        type: actionTypes.HIDE,
    } as Action<{}>),
}
