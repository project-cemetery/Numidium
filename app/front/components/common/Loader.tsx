import * as React from 'react'

import { Spin } from 'antd'
import { css } from 'emotion'


interface Props {
    predicate: boolean
    children?: any
}

export default (props: Props) =>
    props.predicate
        ? props.children
        : <div className={s.spinContainer}><Spin /></div>

const s = {
    spinContainer: css`
        text-align: center;
    `,
}
