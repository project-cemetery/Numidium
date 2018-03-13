import * as React from 'react'
import * as renderer from 'react-test-renderer'
import User from 'model/User'

import { UserComponent } from '../User'


test('`User` widget renders correctly', () => {
    const user = {
        '@id': '1',
        '@type': 'TestUser',
        id: 1,
        email: 'test@example.com',
        active: true,
    } as User

    const tree = renderer
        .create(<UserComponent user={user} />)
        .toJSON()

    expect(tree).toMatchSnapshot()
})
