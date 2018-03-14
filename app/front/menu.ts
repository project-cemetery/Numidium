import { IconType } from 'components/common/Icon'


export const INDEX_PAGE = 'INDEX_PAGE'

export interface MenuItem {
    title: string
    key: string
    path?: string
    icon?: IconType
    children?: MenuItem[]
}

export default [
    {
        icon: IconType.HOME,
        title: 'Обзор', key: INDEX_PAGE, path: '/',
    } as MenuItem,
    {
        icon: IconType.CALENDAR,
        title: 'Отпуска', key: 'vacations', path: '/vacations',
    } as MenuItem,
    {
        icon: IconType.BOOK,
        title: 'Библиотека', key: 'libs', path: '/libs',
    } as MenuItem,
]
