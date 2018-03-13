import creators, { actionTypes, ModalEnum } from '../actions'


test('`show` action creator returns correctly action', () => {
    const action = creators.show(ModalEnum.VACATION, 1)

    expect(action).toEqual({
        type: actionTypes.SHOW,
        payload: {
            modal: ModalEnum.VACATION,
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
