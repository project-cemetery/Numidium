import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Content from '../Content'


test('`Content` renders correctly', () => {
    const tree = renderer
        .create(
            <Content>
                <p>First s</p>
            </Content>
        )
        .toJSON()

    expect(tree).toMatchSnapshot()
})
