import * as React from 'react'
import * as renderer from 'react-test-renderer'

import { Stats as StatsComponent } from '../Stats'

test('`Stats` widget renders correctly', () => {
    const tree = renderer
        .create(<StatsComponent vacations={[]} />)
        .toJSON()

    expect(tree).toMatchSnapshot()
})
