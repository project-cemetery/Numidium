import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { AppState } from 'reducers'
import modalActions, { ModalActions } from 'store/modal/actions'
import librariesActions, { LibrariesActions } from 'store/libraries/actions'
import articlesActions, { ArticlesActions } from 'store/articles/actions'
import Article from 'model/Article'
import Library from 'model/Library'

import { Props as ComponentProps, FormFields } from './FormModal'


interface Props {
    id?: number
    payload: Library

    visible: boolean

    loading?: boolean
    error?: boolean

    saveLoading?: boolean
    saveError?: boolean

    article?: Article

    modalActions?: ModalActions
    articlesActions?: ArticlesActions
    librariesActions?: LibrariesActions
}

export default function (ModalForm: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props

    @(connect(mapStateToProps, mapDispatchToProps) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const {
                id, article, visible, loading, error, saveLoading, saveError,
                modalActions,
            } = this.props

            return (!!modalActions && !!modalActions.hide) &&
                <ModalForm
                    loading={!!loading || (!!id && !article) || !!saveLoading}
                    error={!!error || !!saveError}
                    visible={!!visible}

                    article={article}

                    hide={modalActions.hide}
                    submit={this.submit}
                    validate={this.validate}
                />
        }

        submit = (values: FormFields) => {
            const { articlesActions, modalActions, librariesActions, payload } = this.props

            const article = {
                id: this.props.id,
                title: values.title,
                author: values.author,
                year: values.year,
                description: values.description,
                link: values.link,
                libs: [
                    payload['@id'],
                ],
            } as Article

            if (!!articlesActions && !!articlesActions.post && !!articlesActions.put) {
                const promise = !article.id
                    ? articlesActions.post(article)
                    : articlesActions.put(article)

                promise
                    .then(() => !!modalActions && !!modalActions.hide && modalActions.hide())
                    .then(() => (!!librariesActions && !!librariesActions.get &&
                        librariesActions.get(payload.id)
                    ) as any)
            }
        }

        validate = (values: FormFields) => {
            const errors = {} as any

            if (!values.title) {
                errors.title = 'Обязательное поле'
            }
            if (!values.link) {
                errors.link = 'Обязательное поле'
            }

            return errors
        }

        componentWillReceiveProps(nextProps: Props) {
            const {
                id, visible, article,
                articlesActions,
            } = nextProps

            if (visible && id && !article && !!articlesActions && !!articlesActions.get)
                articlesActions.get(id)
        }

        componentDidMount() {
            this.componentWillReceiveProps(this.props)
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    id: state.modal.id,

    article: state.libraries.entities
        .map(lib => lib.articles)
        .reduce((acc, arr, []) => [...acc, ...arr])
        .find(article => article.id === state.modal.id),

    saveLoading: !!state.books.post.loading || !!state.books.put.loading,
    saveError: !!state.books.post.error || !!state.books.put.error,

    loading: !!state.books.get.loading,
    error: !!state.books.get.error,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    articlesActions: bindActionCreators(articlesActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
    librariesActions: bindActionCreators(librariesActions, dispatch),
})
