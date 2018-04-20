import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Loader from '../Loader'

test('`Loader` renders correctly with loading state', () => {
    const tree = renderer
        .create(
            <Loader loading={true} error={false}>
                <p>Content</p>
            </Loader>,
        )
        .toJSON()

    expect(tree).toMatchSnapshot()
})

test('`Loader` renders correctly with error state', () => {
    const tree = renderer
        .create(
            <Loader loading={false} error={true}>
                <p>Content</p>
            </Loader>,
        )
        .toJSON()

    expect(tree).toMatchSnapshot()
})

test('`Loader` renders correctly with content', () => {
    const tree = renderer
        .create(
            <Loader loading={false} error={false}>
                <p>Content</p>
            </Loader>,
        )
        .toJSON()

    expect(tree).toMatchSnapshot()
})
