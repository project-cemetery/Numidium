import Entity from './Entity'

interface Book extends Entity {
    title: string
    author: string
    year: number
    description: string
    paper: boolean

    libs: any[] // TODO: fix it!
}

export default Book
