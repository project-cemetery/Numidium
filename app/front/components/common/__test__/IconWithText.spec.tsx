import * as React from 'react'
import * as renderer from 'react-test-renderer'

import IconWithText, { IconType } from '../IconWithText'

test('`Icon` renders correctly', () => {
    const tree = renderer
        .create(<IconWithText icon={IconType.ANDROID} text={'My favorite text'} />)
        .toJSON()

    expect(tree).toMatchSnapshot()
})
