import Entity from './Entity'

// tslint:disable-next-line:no-empty-interface
export interface Owner extends Entity {
}

export default interface User extends Owner {
    email: string
    active: boolean
}
