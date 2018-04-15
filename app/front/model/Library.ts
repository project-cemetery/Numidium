import Entity from './Entity'
import Article from './Article'
import Book from './Book'

interface Vacation extends Entity {
    title: string
    description: string
    articles: Article[]
    books: Book[]
}

export default Vacation
