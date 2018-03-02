import * as React from 'react'

import { Modal, DatePicker } from 'antd'
import * as moment from 'moment'
import { Moment } from 'moment'
import { Form, Field } from 'react-final-form'

import Container from './ModalFormConatiner'

export interface Props {
    visible: boolean
    id?: number

    hide: () => void
}

class ModalForm extends React.PureComponent<Props, {}> {
    render() {
        const { id, visible, hide } = this.props

        return <Form
            onSubmit={(values) => console.log(values)}
            initialValues={{ range: { start: moment(), end: moment() } }}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
                <Modal
                    title={'Отпуск'}
                    visible={visible}

                    okText={'Сохранить'}
                    cancelText={'Отменить'}

                    onOk={() => {
                        handleSubmit()
                    }}
                    onCancel={() => {
                        reset()
                        hide()
                    }}

                    style={{ textAlign: 'center' }}
                >
                    <Field name='range'>
                        {({ input, meta }) => (
                            <DatePicker.RangePicker
                                defaultValue={[ input.value.start as Moment, input.value.end as Moment ]}
                                onChange={input.onChange}
                                placeholder={[ 'начало', 'конец' ]}
                            />
                        )}
                    </Field>
                </Modal>
            )}
        />
    }
}

export default Container(ModalForm)
