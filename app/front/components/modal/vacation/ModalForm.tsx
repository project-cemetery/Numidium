import * as React from 'react'

import { Modal } from 'antd'

import Container from './ModalFormConatiner'

export interface Props {
    visible: boolean
    id?: number

    cancel: () => void
}

class ModalForm extends React.PureComponent<Props, {}> {
    render() {
        const { visible, cancel } = this.props

        return (
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={() => console.log('ok')}
                onCancel={cancel}
            >
                <p>...</p>
            </Modal>
        )
    }
}

export default Container(ModalForm)
