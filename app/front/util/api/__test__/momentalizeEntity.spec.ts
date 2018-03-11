import * as moment from 'moment'

import momentalizeEntity from '../momentalizeEntity'


test('momentalize empty object', () => {
    expect(momentalizeEntity({})).toEqual({})
})

test('momenttalize not momentalizable object', () => {
    const obj = {
        name: 'Petro',
        age: '12',
    }

    expect(momentalizeEntity(obj)).toEqual(obj)
})

test('momentalize momentalizeable object', () => {
    const obj = {
        title: 'Party',
        date: '2018-03-11T06:44:02.909Z',
    }

    expect(momentalizeEntity(obj)).toEqual({
        title: 'Party',
        date: moment('2018-03-11T06:44:02.909Z'),
    })
})
