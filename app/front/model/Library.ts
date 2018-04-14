import Entity from './Entity'
import { Owner } from './User'
import Article from './Article'

interface Vacation extends Entity {
    title: string
    description: string
    articles: Article[]

    author: Owner
}

export default Vacation
