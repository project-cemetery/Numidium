import { Moment } from 'moment'

import Entity from './Entity'
import { Owner } from './User'

interface Vacation extends Entity {
    id: number
    start: Moment
    end: Moment

    user: Owner
}

export default Vacation
