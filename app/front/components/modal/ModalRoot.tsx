import * as React from 'react'
import { connect } from 'react-redux'

import VacationForm from './vacation/FormModal'
import ArticleShow from './article/ShowModal'
import BookShow from './book/ShowModal'

import modalActions, { ModalActions, ModalEnum } from 'store/modal/actions'
import { AppState } from 'reducers'


const MODAL_COMPONENTS = {
    [ModalEnum.VACATION_EDIT]: VacationForm,

    [ModalEnum.ARTICLE_SHOW]: ArticleShow,

    [ModalEnum.BOOK_SHOW]: BookShow,
}

const mapStateToProps = (state: AppState) => ({
    visible: state.modal.show,
    type: state.modal.type,
    id: state.modal.id,
})

interface Props {
    visible?: boolean,
    type?: ModalEnum,
    id?: number,
}

@(connect(mapStateToProps, {...modalActions}) as any)
export default class ModalRoot extends React.Component<Props & ModalActions, {}> {

    render() {
        const { visible, type, id } = this.props

        if (!type) return null

        const SpecificModal = (MODAL_COMPONENTS as any)[type]

        return <SpecificModal {...this.props} />
    }
}

