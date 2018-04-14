import * as React from 'react'

import { Form } from 'antd'

interface Props {
    tail?: boolean
    children?: any
    label?: string
}

export default (props: Props) =>
    <Form.Item {...getItemLayout(!!props.tail)} label={props.label}>
        {props.children}
    </Form.Item>

const getItemLayout = (tail: boolean) => tail
    ? {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    }
    : {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
        },
    }