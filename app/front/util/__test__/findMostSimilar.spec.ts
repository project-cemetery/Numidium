import findMostSimilar from '../findMostSimilar'


test('`mostSimilarString` should return exact first', () => {
    const result = findMostSimilar<string>('needle', [ 'needle', 'other needle' ], v => v)

    expect(result).toEqual('needle')
})

test('`mostSimilarString` should return similar 1', () => {
    const result = findMostSimilar<string>('needle one', [ 'needle', 'my favorite needle' ], v => v)

    expect(result).toEqual('needle')
})

test('`mostSimilarString` should return similar 2', () => {
    const result = findMostSimilar<string>('needle', [ 'needle one', 'my favorite needle' ], v => v)

    expect(result).toEqual('needle one')
})

test('`mostSimilarString` should return longest similar', () => {
    const result = findMostSimilar<string>('/lib/png', [ '/', '/lib' ], v => v)

    expect(result).toEqual('/lib')
})

test('`mostSimilarString` should return undefined', () => {
    const result = findMostSimilar<string>('inn', [ 'needle', 'my favorite needle' ], v => v)

    expect(result).toEqual(undefined)
})
