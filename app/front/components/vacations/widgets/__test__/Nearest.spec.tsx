import * as React from 'react'
import * as renderer from 'react-test-renderer'

import { Owner } from 'model/User'
import * as moment from 'moment'
import Vacation from 'model/Vacation'

import { Nearest as NearestComponent } from '../Nearest'


test('`Nearest` widget renders correctly without items', () => {
    const tree = renderer
        .create(<NearestComponent vacations={[]} openModal={() => null} />)
        .toJSON()

    expect(tree).toMatchSnapshot()
})

test('`Nearest` widget renders correctly with soon items', () => {
    const owner = {
        '@id': '1',
        '@type': 'TestUser',
        id: 1,
    } as Owner

    const vacations = [
        {
            '@id': '1',
            '@type': 'TestVacation',
            id: 1,
            start: moment('2018-01-01'),
            end: moment('2018-03-02'),
            user: owner,
        } as Vacation,
        {
            '@id': '2',
            '@type': 'TestVacation',
            id: 2,
            start: moment('2019-01-01'),
            end: moment('2019-03-02'),
            user: owner,
        } as Vacation,
    ]

    const tree = renderer
        .create(<NearestComponent vacations={vacations} openModal={() => null} />)
        .toJSON()

    expect(tree).toMatchSnapshot()
})
