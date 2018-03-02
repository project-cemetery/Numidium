import Entity from './Entity'
import { Owner } from './User'

interface Vacation extends Entity {
    id: number
    start: string
    end: string

    user: Owner
}

export default Vacation
