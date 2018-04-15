import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { AppState } from 'reducers'
import modalActions, { ModalActions } from 'store/modal/actions'
import booksActions, { BooksActions } from 'store/books/actions'
import Book from 'model/Book'

import { Props as ComponentProps, FormFields } from './FormModal'


interface Props {
    id?: number
    visible: boolean

    loading?: boolean
    error?: boolean

    saveLoading?: boolean
    saveError?: boolean

    book?: Book

    modalActions?: ModalActions
    booksActions?: BooksActions
}

export default function (ModalForm: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props

    @(connect(mapStateToProps, mapDispatchToProps) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const {
                id, book, visible, loading, error, saveLoading, saveError,
                modalActions,
            } = this.props

            return (!!modalActions && !!modalActions.hide) &&
                <ModalForm
                    loading={!!loading || (!!id && !book) || !!saveLoading}
                    error={!!error || !!saveError}
                    visible={!!visible}

                    book={book}

                    hide={modalActions.hide}
                    submit={this.submit}
                />
        }

        submit = (values: FormFields) => {
            const { booksActions, modalActions } = this.props

            const book = {
                id: this.props.id,
                title: values.title,
                author: values.author,
                year: values.year,
                description: values.description,
                paper: values.paper,
            } as Book

            if (!!booksActions && !!booksActions.post && !!booksActions.put) {
                const promise = !book.id
                    ? booksActions.post(book)
                    : booksActions.put(book)

                promise.then(() => !!modalActions && !!modalActions.hide && modalActions.hide())
            }
        }

        componentWillReceiveProps(nextProps: Props) {
            const {
                id, visible, book,
                booksActions,
            } = nextProps

            if (visible && id && !book && !!booksActions && !!booksActions.get)
                booksActions.get(id)
        }

        componentDidMount() {
            this.componentWillReceiveProps(this.props)
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

    saveLoading: !!state.books.post.loading || !!state.books.put.loading,
    saveError: !!state.books.post.error || !!state.books.put.error,

    loading: !!state.books.get.loading,
    error: !!state.books.get.error,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    booksActions: bindActionCreators(booksActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
})
