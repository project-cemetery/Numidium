import * as React from 'react'

import { Breadcrumb } from 'antd'
import { css } from 'emotion'


interface Props {
    breadcrumbs?: string[]
}

export default (props: Props) =>
    <React.Fragment>
        <Breadcrumb className={s.breadcrumb}>
            {!!props.breadcrumbs && props.breadcrumbs.map((item, i) =>
                <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
            )}
        </Breadcrumb>
    </React.Fragment>


const s = {
    breadcrumb: css`
        margin: -8px 0 8px 0;
    `,
}
