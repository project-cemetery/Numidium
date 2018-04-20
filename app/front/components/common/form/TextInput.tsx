import * as React from 'react'

import { Input } from 'antd'
import { Field } from 'react-final-form'

import Alert, { AlertType } from 'components/common/Alert'

interface Props {
    name: string
    placeholder?: string
}

export default (ownProps: Props) =>
    <Field name={ownProps.name}>
        {(props) =>
            <React.Fragment>
                <Input
                    value={props.input.value}
                    onChange={props.input.onChange}
                    placeholder={ownProps.placeholder}
                />
                {!!props.meta.error && <Alert type={AlertType.WARNING} message={props.meta.error} /> }
            </React.Fragment>
        }
    </Field>
