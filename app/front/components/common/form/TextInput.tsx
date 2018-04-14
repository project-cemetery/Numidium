import * as React from 'react'

import { Field } from 'react-final-form'
import { Input } from 'antd'


interface Props {
    name: string
    placeholder?: string
}

export default (ownProps: Props) =>
    <Field name={ownProps.name}>
        {props => <Input
            value={props.input.value}
            onChange={props.input.onChange}
            placeholder={ownProps.placeholder}
        /> }
    </Field>
