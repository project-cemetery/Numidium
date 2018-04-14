import Entity from './Entity'


interface Book extends Entity {
    title: string
    author: string
    year: number
    description: string
    paper: boolean
}

export default Book
