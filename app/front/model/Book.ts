import Entity from './Entity'

interface Book extends Entity {
    title: string
    author: string
    year: number
    description: string
    paper: boolean
    shopLink: string

    libs: any[] // TODO: fix it!
}

export default Book
