import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { AppState } from 'reducers'
import modalActions, { ModalActions } from 'store/modal/actions'
import Book from 'model/Book'

import { Props as ComponentProps } from './Book'


interface Props {
    id: number
    visible: boolean

    error?: boolean

    book?: Book

    modalActions?: ModalActions
}

export default function (Component: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props

    @(connect(mapStateToProps, mapDispatchToProps) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const {
                id, book, visible, error,
                modalActions,
            } = this.props

            return (!!book && !!modalActions && !!modalActions.hide) &&
                <Component
                    error={!!error}
                    visible={visible}

                    book={book}

                    hide={modalActions.hide}
                />
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    id: state.modal.id,

    book: state.libraries.entities
        .map(lib => lib.books)
        .reduce((acc, arr, []) => [...acc, ...arr])
        .find(book => book.id === state.modal.id),

    error: !!state.vacations.get.error || !!state.users.get.error,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    modalActions: bindActionCreators(modalActions, dispatch),
})
