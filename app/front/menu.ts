import IconEnum from 'util/enum/IconEnum'


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
    {
        icon: IconEnum.CALENDAR,
        title: 'Отпуска', key: 'vacations', path: '/vacations',
    } as MenuItem,
]
