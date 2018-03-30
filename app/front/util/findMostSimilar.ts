interface Counter<T> {
    item: T | undefined
    intersection: number
}

export default <T>(
    needle: string,
    haystack: T[],
    getField: (e: T) => string | undefined
) => {
    const exact = haystack.find(value => getField(value) === needle)

    if (!!exact)
        return exact

    return haystack
        .filter(value => (getField(value) || '').includes(needle) || needle.includes(getField(value) || ''))
        .map((value, index) => ({
            item: value,
            intersection: intersectionLength(getField(value) || '', needle),
        } as Counter<T>))
        .reduce(
            (prev, current) => (prev.intersection >= current.intersection) ? prev : current,
            { item: undefined, intersection: 0 } as Counter<T>
        ).item
}

const findIntersectionFromStart = (a: string, b: string) => {
    for (let i = a.length; i > 0; i--) {
        const d = a.substring(0, i)
        const j = b.indexOf(d)
        if (j >= 0) {
            return ({
                position: j,
                length: i,
            })
        }
    }

    return undefined
}

const findIntersection = (a: string, b: string) => {
    let bestResult = undefined
    for (let i = 0; i < a.length - 1; i++) {
        const result = findIntersectionFromStart(a.substring(i), b)
        if (result) {
            if (!bestResult) {
                bestResult = result
            } else {
                if (result.length > bestResult.length) {
                    bestResult = result
                }
            }
        }
        if (bestResult && bestResult.length >= a.length - i)
            break
    }
    return bestResult
}

const intersectionLength = (a: string, b: string) => (findIntersection(a, b) || '').length
