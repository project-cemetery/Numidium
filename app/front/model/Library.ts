import Entity from './Entity'
import { Owner } from './User'
import Article from './Article'
import Book from './Book'

interface Vacation extends Entity {
    title: string
    description: string
    articles: Article[]
    books: Book[]

    author: Owner
}

export default Vacation
