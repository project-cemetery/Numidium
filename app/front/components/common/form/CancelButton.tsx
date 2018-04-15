import * as React from 'react'

import { Button } from 'antd'
import { css } from 'emotion'


interface Props {
    label: string
    cancel: () => void
}

export default (props: Props) =>
    <Button onClick={props.cancel} className={styles}>
        {props.label}
    </Button>

const styles = css`
    margin-left: 8px;
`
