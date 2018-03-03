import * as React from 'react'

import { DatePicker } from 'antd'
import { Moment } from 'moment'
import * as moment from 'moment'
import { RangePickerValue } from 'antd/lib/date-picker/interface'
import { FieldRenderProps } from 'react-final-form'


export default (props: FieldRenderProps) =>
    <DatePicker.RangePicker
        value={props.input.value && [ props.input.value.start , props.input.value.end ]}
        onChange={values => {
            props.input.onChange({
                start: values[0],
                end: values[1],
            })
        }}
        placeholder={[ 'начало', 'конец' ]}
    />
