import Entity from './Entity'

interface Article extends Entity {
    title: string
    author: string
    year: number
    description: string
    link: string

    libs: any[] // TODO: fix it!
}

export default Article
