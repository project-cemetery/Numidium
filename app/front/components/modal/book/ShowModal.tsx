import * as React from 'react'

import { Modal } from 'antd'

import Alert, { AlertType } from 'components/common/Alert'
import Book from 'model/Book'

import Container from './ShowModalConatiner'

export interface Props {
    error: boolean
    book: Book
    visible: boolean
    hide: () => void
}

export class ShowModal extends React.PureComponent<Props, {}> {

    public render() {
        const { visible, book, hide } = this.props

        return (
            <Modal
                title={`${book.title} | ${book.author} | ${book.year} год`}
                visible={visible}

                okText={'Купить'}
                cancelText={'Закрыть'}

                onCancel={() => hide()}
                onOk={() => {
                    const win = window.open(book.shopLink, '_blank') as any
                    win.focus()
                }}
            >
                <p>{book.description}</p>
            </Modal>
        )
    }
}

export default Container(ShowModal)
