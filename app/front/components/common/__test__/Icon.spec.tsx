import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Icon, { IconType } from '../Icon'


test('`Icon` renders correctly', () => {
    const tree = renderer
        .create(<Icon type={IconType.ANDROID} />)
        .toJSON()

    expect(tree).toMatchSnapshot()
})
