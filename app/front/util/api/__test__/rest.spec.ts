import rest from '../rest'


jest.mock('axios')
import axios from 'axios'

jest.mock('../momentalizeEntity')
import momentalizeEntity from '../momentalizeEntity'
(momentalizeEntity as any).mockImplementation((e: any) => e)


interface Entity {
    '@id': string
    '@type': string
    '@context'?: string
    id: number
}

const { getList, get, put, post, del } = rest<Entity>('entity')

test('get list should returns collection of entities', () => {
    const data = {
        '@context': '/api/contexts/Entity',
        '@id': '/api/entities',
        '@type': 'hydra:Collection',
        'hydra:member': [
            { '@id': '/api/tests/1', '@type': 'Test', id: 1 },
            { '@id': '/api/tests/2', '@type': 'Test', id: 2 },
        ],
        'hydra:totalItems': '2',
    } as any

    (axios as any).get.mockResolvedValue({ data })

    return getList()
        .then(collection => {
            expect(collection.member).toEqual([
                { '@id': '/api/tests/1', '@type': 'Test', id: 1 },
                { '@id': '/api/tests/2', '@type': 'Test', id: 2 },
            ])

            expect(collection.totalItems).toEqual(2)
        })
})

test('get should returns entity', () => {
    const data = { '@id': '/api/tests/1', '@type': 'Test', id: 1 } as any

    (axios as any).get.mockResolvedValue({ data })

    return get(1)
        .then(entity => expect(entity).toEqual(data))
})

test('post should returns entity', () => {
    const data = { '@id': '/api/tests/1', '@type': 'Test', id: 1 } as any

    (axios as any).post.mockResolvedValue({ data })

    return post(data)
        .then(entity => expect(entity).toEqual(data))
})

test('put should returns entity', () => {
    const data = { '@id': '/api/tests/1', '@type': 'Test', id: 1 } as any

    (axios as any).put.mockResolvedValue({ data })

    return put(1, data)
        .then(entity => expect(entity).toEqual(data))
})

test('del should returns true', () => {
    const data = {} as any

    (axios as any).delete.mockResolvedValue({ data })

    return del(1)
        .then(result => expect(result).toBe(true))
})
