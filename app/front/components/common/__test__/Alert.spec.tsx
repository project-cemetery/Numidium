import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Alert, { AlertType } from '../Alert'

test('`Alert` renders correctly', () => {
    const tree = renderer
        .create(<Alert type={AlertType.INFO} message={'Test message!'} />)
        .toJSON()

    expect(tree).toMatchSnapshot()
})
