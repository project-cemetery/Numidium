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
