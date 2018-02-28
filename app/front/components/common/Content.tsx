import * as React from 'react'

import { Breadcrumb } from 'antd'
import { css } from 'emotion'


interface Props {
    breadcrumbs?: string[]
    children?: any
}

export default (props: Props) =>
    <React.Fragment>
        <Breadcrumb className={s.breadcrumb}>
            {!!props.breadcrumbs && props.breadcrumbs.map((item, i) =>
                <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
            )}
        </Breadcrumb>
        <div className={s.content}>
            {props.children}
        </div>
    </React.Fragment>


const s = {
    breadcrumb: css`
        margin: 16px 0;
    `,
    content: css`
        padding: 24px;
        min-height: 360px;
    `,
}
