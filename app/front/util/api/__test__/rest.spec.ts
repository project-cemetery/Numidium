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
