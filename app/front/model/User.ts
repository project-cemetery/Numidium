import Entity from './Entity'

export interface Owner extends Entity {
}

export default interface User extends Owner {
    email: string
    active: boolean
}
