import {
    createRequestActionCreator,
    createSuccessActionCreator,
    createFailureActionCreator,
} from '../actions'


test('`createRequestActionCreator` will lead to correctly action', () => {
    const action = createRequestActionCreator('TestType')()

    expect(action).toEqual({ type: 'TestType' })
})

test('`createSuccessActionCreator` will lead to correctly action', () => {
    const action = createSuccessActionCreator('TestType')({ name: 'Petro' })

    expect(action).toEqual({
        type: 'TestType',
        payload: {
            name: 'Petro',
        },
    })
})

test('`createFailureActionCreator` will lead to correctly action', () => {
    const action = createFailureActionCreator('TestType')()

    expect(action).toEqual({
        type: 'TestType',
        error: true,
    })
})
