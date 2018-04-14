import * as React from 'react'

import { Modal } from 'antd'

import Book from 'model/Book'
import Alert, { AlertType } from 'components/common/Alert'

import Container from './BookConatiner'


export interface Props {
    error: boolean
    book: Book
    visible: boolean
    hide: () => void
}

export class BookComponent extends React.PureComponent<Props, {}> {

    render() {
        const { visible, book, hide } = this.props

        return (
            <Modal
                title={`${book.title} | ${book.author} | ${book.year} год`}
                visible={visible}

                okText={'Скачать'}
                cancelText={'Закрыть'}

                onCancel={() => hide()}
                onOk={() => {
                    alert('Скачивание пока недоступно!')
                }}
            >
                <p>{book.description}</p>
            </Modal>
        )
    }
}

export default Container(BookComponent)
