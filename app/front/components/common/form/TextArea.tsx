import * as React from 'react'

import { Field } from 'react-final-form'
import { Input } from 'antd'


interface Props {
    name: string
    placeholder?: string
    rows?: number
}

export default (ownProps: Props) =>
    <Field name={ownProps.name}>
        {props => <Input.TextArea
            {...props}
            placeholder={ownProps.placeholder}
            rows={ownProps.rows}
        /> }
    </Field>
