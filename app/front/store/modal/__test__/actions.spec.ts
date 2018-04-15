import creators, { actionTypes, ModalEnum } from '../actions'


test('`show` action creator returns correctly action', () => {
    const action = creators.show(ModalEnum.VACATION_EDIT, 1)

    expect(action).toEqual({
        type: actionTypes.SHOW,
        payload: {
            modal: ModalEnum.VACATION_EDIT,
            id: 1,
        },
    })
})

test('`hide` action creator returns correctly action', () => {
    const action = creators.hide()

    expect(action).toEqual({
        type: actionTypes.HIDE,
    })
})
