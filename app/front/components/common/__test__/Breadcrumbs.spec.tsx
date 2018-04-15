import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Breadcrumbs from '../Breadcrumbs'

test('`Breadcrumbs` renders correctly with items', () => {
    const breadcrumbs = [ 'Home', 'Profile' ]

    const tree = renderer
        .create(<Breadcrumbs breadcrumbs={breadcrumbs} />)
        .toJSON()

    expect(tree).toMatchSnapshot()
})

test('`Breadcrumbs` renders correctly withpout items', () => {
    const tree = renderer
        .create(<Breadcrumbs />)
        .toJSON()

    expect(tree).toMatchSnapshot()
})
