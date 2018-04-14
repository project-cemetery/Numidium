import * as React from 'react'

import { Modal } from 'antd'
import * as moment from 'moment'
import { Moment } from 'moment'
import { Form } from 'react-final-form'

import RangePicker from 'components/common/form/RangePicker'
import Loader from 'components/common/Loader'
import Vacation from 'model/Vacation'

import Container from './ModalFormConatiner'


export interface FormFields {
    range: {
        start?: Moment
        end?: Moment
    }
}
export interface Props {
    loading: boolean
    error: boolean
    visible: boolean

    vacation?: Vacation

    hide: () => void
    submit: (values: FormFields) => void
}

class ModalForm extends React.PureComponent<Props, {}> {
    render() {
        const { loading, error, vacation, visible, hide, submit } = this.props

        const initialValues = !!vacation
            ? this.initialVacation(vacation)
            : this.initialEmpty()

        return <Form
            onSubmit={values => submit(values as FormFields)}
            initialValues={initialValues}
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
                    <Loader loading={loading} error={error}>
                        <RangePicker name={'range'} />
                    </Loader>
                </Modal>
            )}
        />
    }

    initialVacation = (vacation: Vacation) => ({
        range: {
            start: vacation.start,
            end: vacation.end,
        },
    } as FormFields)

    initialEmpty = () => ({
        range: {
            start: undefined,
            end: undefined,
        },
    } as FormFields)
}

export default Container(ModalForm)
