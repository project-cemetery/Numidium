import * as React from 'react'

import { InputNumber } from 'antd'
import { Field } from 'react-final-form'

import Alert, { AlertType } from 'components/common/Alert'

interface Props {
    name: string
    placeholder?: number
}

export default (ownProps: Props) =>
    <Field name={ownProps.name}>
        {(props) =>
            <React.Fragment>
                <InputNumber
                    value={props.input.value}
                    onChange={props.input.onChange}
                    placeholder={ownProps.placeholder ? String(ownProps.placeholder) : undefined}
                />
                {!!props.meta.error && <Alert type={AlertType.WARNING} message={props.meta.error} /> }
            </React.Fragment>
        }
    </Field>
