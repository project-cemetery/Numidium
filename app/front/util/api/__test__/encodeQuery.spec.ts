import encodeQuery from '../encodeQuery'

test('encode empty array', () => {
    expect(encodeQuery([])).toBe('')
})

test('encode correct array', () => {
    const params = [
        { key: 'page',   value: '1' },
        { key: 'search', value: 'test' },
    ]

    expect(encodeQuery(params)).toBe('?page=1&search=test')
})
