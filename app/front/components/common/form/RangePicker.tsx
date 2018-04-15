import * as React from 'react'

import { Form, Field } from 'react-final-form'
import { DatePicker } from 'antd'


interface Props {
    name: string
}

export default (ownProps: Props) =>
    <Field name={ownProps.name}>
        {props =>
            <DatePicker.RangePicker
                value={props.input.value && [ props.input.value.start , props.input.value.end ]}
                onChange={values => props.input.onChange({
                    start: values[0],
                    end: values[1],
                })}
                placeholder={[ 'начало', 'конец' ]}
            />
        }
    </Field>
