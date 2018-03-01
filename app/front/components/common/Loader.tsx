import * as React from 'react'

import { Spin } from 'antd'
import { css } from 'emotion'

import AlertEnum from 'util/enum/AlertEnum'

import Alert from './Alert'


interface Props {
    loading: boolean
    error: boolean
    children?: any
}

export default (props: Props) =>
    props.error
        ? <Alert message='Произошла ошибка, попробуйте обновить страницу' type={AlertEnum.ERROR} />
        : props.loading
            ? <div className={s.spinContainer}><Spin /></div>
            : props.children

const s = {
    spinContainer: css`
        text-align: center;
    `,
}
