import Entity from './Entity'
import { Owner } from './User'

interface Vacation extends Entity {
    title: string
    description: string

    author: Owner
}

export default Vacation
