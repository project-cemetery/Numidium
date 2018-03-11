import encodeQuery from './encodeQuery'

test('encode empty array', () => {
    expect(encodeQuery([])).toBe('?')
})
