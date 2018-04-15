import * as React from 'react'

import { DatePicker } from 'antd'
import { Field, Form } from 'react-final-form'

interface Props {
    name: string
}

export default (ownProps: Props) =>
    <Field name={ownProps.name}>
        {(props) =>
            <DatePicker.RangePicker
                value={props.input.value && [ props.input.value.start , props.input.value.end ]}
                onChange={(values) => props.input.onChange({
                    start: values[0],
                    end: values[1],
                })}
                placeholder={[ 'начало', 'конец' ]}
            />
        }
    </Field>
