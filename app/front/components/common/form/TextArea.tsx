import * as React from 'react'

import { Field } from 'react-final-form'
import { Input } from 'antd'

import Alert, { AlertType } from 'components/common/Alert'


interface Props {
    name: string
    placeholder?: string
    rows?: number
}

export default (ownProps: Props) =>
    <Field name={ownProps.name}>
        {props =>
            <React.Fragment>
                <Input.TextArea
                    value={props.input.value}
                    onChange={props.input.onChange}
                    placeholder={ownProps.placeholder}
                    rows={ownProps.rows}
                />
                {!!props.meta.error && <Alert type={AlertType.WARNING} message={props.meta.error} /> }
            </React.Fragment>
        }
    </Field>
