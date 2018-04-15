import * as React from 'react'

import { Spin } from 'antd'
import { css } from 'emotion'

import Alert, { AlertType } from './Alert'

interface Props {
    loading: boolean
    error: boolean
    children?: any
}

export default (props: Props) =>
    props.error
        ? <Alert message="Произошла ошибка, попробуйте обновить страницу" type={AlertType.ERROR} />
        : props.loading
            ? <div className={s.spinContainer}><Spin /></div>
            : props.children

const s = {
    spinContainer: css`
        text-align: center;
    `,
}
