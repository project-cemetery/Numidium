import * as React from 'react'

import { Button } from 'antd'


interface Props {
    label: string
}

export default (props: Props) =>
    <Button type='primary' htmlType='submit'>
        {props.label}
    </Button>
