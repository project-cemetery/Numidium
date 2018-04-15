import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'

import { AppState } from 'reducers'
import librariesActions, { LibrariesActions } from 'store/libraries/actions'
import Library from 'model/Library'
import User, { Owner } from 'model/User'
import Loader from 'components/common/Loader'

import { Props as ComponentProps, FormFields } from './LibraryForm'


interface Props {
    id?: number

    loading?: boolean
    error?: boolean

    saveLoading?: boolean
    saveError?: boolean

    library?: Library

    librariesActions?: LibrariesActions

    goBack: () => void
}

export default function (Form: React.ComponentClass<ComponentProps>) {

    // type ConatinerProps = Props & RouteComponentProps<{}>
    type ConatinerProps = Props

    @(connect(mapStateToProps, mapDispatchToProps) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const {
                id, library, loading, error, saveLoading, saveError,
            } = this.props

            return (
                <Loader
                    loading={loading || (!!id && !library) || saveLoading}
                    error={error || saveError}
                >
                    <Form
                        library={library}
                        submit={this.submit}
                        cancel={this.cancel}
                        validate={this.validate}
                    />
                </Loader>
            )
        }

        submit = (values: FormFields) => {
            const { librariesActions } = this.props

            const lib = {
                id: this.props.id,
                title: values.title,
                description: values.description,
            } as Library

            if (!!librariesActions && !!librariesActions.post && !!librariesActions.put) {
                const promise = !lib.id
                    ? librariesActions.post(lib)
                    : librariesActions.put(lib)

                promise
                    .then(() => this.props.goBack())
            }
        }

        cancel = () => this.props.goBack()

        validate = (values: FormFields) => {
            const errors = {} as any

            if (!values.title) {
                errors.title = 'Обязательное поле'
            }

            return errors
        }

        componentDidMount() {
            const {
                id, library,
                librariesActions,
            } = this.props

            if (id && !library && !!librariesActions && !!librariesActions.get)
                librariesActions.get(id)
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState, ownProps: Props) => ({
    library: state.libraries.entities.find(v => v.id === ownProps.id),

    saveLoading: !!state.libraries.post.loading || !!state.libraries.put.loading,
    saveError: !!state.libraries.post.error || !!state.libraries.put.error,

    loading: !!state.libraries.get.loading,
    error: !!state.libraries.get.error,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    librariesActions: bindActionCreators(librariesActions, dispatch),
})
