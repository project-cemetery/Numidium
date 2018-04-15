import * as React from 'react'

import { Checkbox } from 'antd'
import { Field } from 'react-final-form'

import Alert, { AlertType } from 'components/common/Alert'

interface Props {
    name: string
    label: string
}

export default (ownProps: Props) =>
    <Field name={ownProps.name}>
        {(props) =>
            <React.Fragment>
                <Checkbox
                    checked={props.input.value}
                    onChange={props.input.onChange}
                >
                    {ownProps.label}
                </Checkbox>
                {!!props.meta.error && <Alert type={AlertType.WARNING} message={props.meta.error} /> }
            </React.Fragment>
        }
    </Field>
