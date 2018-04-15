import * as React from 'react'

import { Modal } from 'antd'
import * as moment from 'moment'
import { Moment } from 'moment'
import { Form } from 'react-final-form'

import RangePicker from 'components/common/form/RangePicker'
import Loader from 'components/common/Loader'
import Book from 'model/Book'

import Container from './FormModalConatiner'


export interface FormFields {
    title: string
    author: string
    year: number
    description: string
    paper: boolean
}

export interface Props {
    loading: boolean
    error: boolean
    visible: boolean

    book?: Book

    hide: () => void
    submit: (values: FormFields) => void
}

class ModalForm extends React.PureComponent<Props, {}> {
    render() {
        const { loading, error, book, visible, hide, submit } = this.props

        const initialValues = !!book
            ? this.initialBook(book)
            : this.initialEmpty()

        return <Form
            onSubmit={values => submit(values as FormFields)}
            initialValues={initialValues}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
                <Modal
                    title={'Книга'}
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
                        <p>...</p>
                    </Loader>
                </Modal>
            )}
        />
    }

    initialBook = (book: Book) => ({
        title: book.title,
        author: book.author,
        year: book.year,
        description: book.description,
        paper: book.paper,
    } as FormFields)

    initialEmpty = () => ({
        title: '',
        author: '',
        year: (new Date()).getFullYear(),
        description: '',
        paper: false,
    } as FormFields)
}

export default Container(ModalForm)
