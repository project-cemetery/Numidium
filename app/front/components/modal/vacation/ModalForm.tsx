import * as React from 'react'

import { Modal } from 'antd'
import * as moment from 'moment'
import { Moment } from 'moment'
import { Form, Field } from 'react-final-form'

import RangePicker from 'components/common/form/RangePicker'
import Vacation from 'model/Vacation'

import Container from './ModalFormConatiner'

export interface Props {
    visible: boolean
    vacation?: Vacation

    hide: () => void
}

class ModalForm extends React.PureComponent<Props, {}> {
    render() {
        const { vacation, visible, hide } = this.props

        return <Form
            onSubmit={(values) => console.log(values)}
            initialValues={vacation}
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
                        {props => <RangePicker {...props} /> }
                    </Field>
                </Modal>
            )}
        />
    }
}

export default Container(ModalForm)
