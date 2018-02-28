import Entity from './Entity'


interface Collection<T> extends Entity {
    member: T[]
    totalItems: number
}

export default Collection
