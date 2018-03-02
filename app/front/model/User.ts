import Entity from './Entity'

export interface Owner extends Entity {
    id: number
}

export default interface User extends Entity {
    id: number
    email: string
    active: boolean
}
