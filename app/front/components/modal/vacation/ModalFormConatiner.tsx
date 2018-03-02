import * as React from 'react'
import { connect } from 'react-redux'

import { AppState } from 'reducers'
import modalActions, { ModalActions } from 'store/modal/actions'

import { Props as ComponentProps } from './ModalForm'


interface Props {
    id?: number
    visible: boolean
}

export default function (ModalForm: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props & ModalActions

    @(connect(mapStateToProps, {...modalActions}) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const {
                id, visible, hide,
            } = this.props

            return (!!hide) &&
                <ModalForm visible={visible} id={id} cancel={hide} />
        }

        componentDidMount() {
            const {
                id,
            } = this.props

            console.log(id)
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    id: state.modal.id,
})
