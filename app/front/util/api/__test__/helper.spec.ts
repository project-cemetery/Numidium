import axios from 'axios'

import { getMyId } from '../helper'


jest.mock('axios')

test('get me should return mine id', () => {
    (axios as any).get.mockResolvedValue({ data: '1' })

    return getMyId()
        .then(id => expect(id).toBe(1))
})
