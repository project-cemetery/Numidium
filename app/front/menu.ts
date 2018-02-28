import IconEnum from 'util/IconEnum'


export const INDEX_PAGE = 'INDEX_PAGE'

export interface MenuItem {
    title: string
    key: string
    path?: string
    icon?: IconEnum
    children?: MenuItem[]
}

export default [
    {
        icon: IconEnum.HOME,
        title: 'Обзор', key: INDEX_PAGE, path: '/',
    } as MenuItem,
]
