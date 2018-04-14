import Entity from './Entity'


interface Article extends Entity {
    title: string
    author: string
    year: number
    description: string
    link: string
}

export default Article
