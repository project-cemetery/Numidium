import * as React from 'react'
import { connect } from 'react-redux'

import VacationForm from './vacation/FormModal'

import ArticleForm from './article/FormModal'
import ArticleShow from './article/ShowModal'

import BookForm from './book/FormModal'
import BookShow from './book/ShowModal'

import { AppState } from 'reducers'
import modalActions, { ModalActions, ModalEnum } from 'store/modal/actions'

const MODAL_COMPONENTS = {
    [ModalEnum.VACATION_EDIT]: VacationForm,

    [ModalEnum.ARTICLE_SHOW]: ArticleShow,
    [ModalEnum.ARTICLE_EDIT]: ArticleForm,

    [ModalEnum.BOOK_SHOW]: BookShow,
    [ModalEnum.BOOK_EDIT]: BookForm,
}

const mapStateToProps = (state: AppState) => ({
    visible: state.modal.show,
    type: state.modal.type,
    id: state.modal.id,
    payload: state.modal.payload,
})

interface Props {
    visible?: boolean,
    type?: ModalEnum,
    id?: number,
    payload?: any
}

@(connect(mapStateToProps, {...modalActions}) as any)
export default class ModalRoot extends React.Component<Props & ModalActions, {}> {

    public render() {
        const { visible, type, id } = this.props

        if (!type) { return null }

        const SpecificModal = (MODAL_COMPONENTS as any)[type]

        return <SpecificModal {...this.props} />
    }
}
