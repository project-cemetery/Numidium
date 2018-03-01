import * as React from 'react'

import { Spin } from 'antd'
import { css } from 'emotion'


interface Props {
    loading: boolean
    error: boolean
    children?: any
}

export default (props: Props) =>
    props.error
        ? <p>error</p>
        : props.loading
            ? <div className={s.spinContainer}><Spin /></div>
            : props.children

const s = {
    spinContainer: css`
        text-align: center;
    `,
}
