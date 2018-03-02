import * as React from 'react'

import { css } from 'emotion'


interface Props {
    children?: any
}

export default (props: Props) =>
    <React.Fragment>
        <div className={s.content}>
            {props.children}
        </div>
    </React.Fragment>


const s = {
    content: css`
        padding: 24px;
        min-height: 360px;
    `,
}
