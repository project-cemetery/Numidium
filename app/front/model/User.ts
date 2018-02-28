import Entity from './Entity'


interface User extends Entity {
    id: number
    email: string
    active: boolean
}

export default User
