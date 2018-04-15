import Article from './Article'
import Book from './Book'
import Entity from './Entity'

interface Vacation extends Entity {
    title: string
    description: string
    articles: Article[]
    books: Book[]
}

export default Vacation
