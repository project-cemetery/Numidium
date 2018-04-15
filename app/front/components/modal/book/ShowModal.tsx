import * as React from 'react'

import { Button, Modal } from 'antd'

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

                footer={[
                    <Button onClick={() => hide()}>Закрыть</Button>,
                    !!book.shopLink &&
                        <Button onClick={() => this.openLink(book.shopLink)} type="primary">Купить</Button>,
                    !!book.externalFileLink &&
                        <Button onClick={() => this.openLink(book.externalFileLink)} type="primary">Скачать</Button>,
                ]}
            >
                {!!book.paper &&
                    <Alert
                        message="Доступна в бумажном варианте. Спросите у кого-ниубдь."
                        type={AlertType.INFO}
                    />
                }
                <p>{book.description}</p>
            </Modal>
        )
    }

    public openLink = (link: string) => {
        const win = window.open(link, '_blank') as any
        win.focus()
    }
}

export default Container(ShowModal)
