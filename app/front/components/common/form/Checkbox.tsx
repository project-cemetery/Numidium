import * as React from 'react'

import { Field } from 'react-final-form'
import { Checkbox } from 'antd'

import Alert, { AlertType } from 'components/common/Alert'


interface Props {
    name: string
    label: string
}

export default (ownProps: Props) =>
    <Field name={ownProps.name}>
        {props =>
            <React.Fragment>
                <Checkbox
                    value={props.input.value}
                    onChange={props.input.onChange}
                >
                    {ownProps.label}
                </Checkbox>
                {!!props.meta.error && <Alert type={AlertType.WARNING} message={props.meta.error} /> }
            </React.Fragment>
        }
    </Field>
