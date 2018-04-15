import * as React from 'react'
import * as renderer from 'react-test-renderer'

import { Owner } from 'model/User'
import Vacation from 'model/Vacation'
import * as moment from 'moment'

import { Nearest as NearestComponent } from '../Nearest'

test('`Nearest` widget renders correctly without items', () => {
    const tree = renderer
        .create(<NearestComponent vacations={[]} openModal={() => null} />)
        .toJSON()

    expect(tree).toMatchSnapshot()
})
