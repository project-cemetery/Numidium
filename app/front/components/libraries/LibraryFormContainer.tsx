import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { bindActionCreators, Dispatch } from 'redux'

import Loader from 'components/common/Loader'
import Library from 'model/Library'
import User, { Owner } from 'model/User'
import { AppState } from 'reducers'
import librariesActions, { LibrariesActions } from 'store/libraries/actions'

import { FormFields, Props as ComponentProps } from './LibraryForm'

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

export default function(Form: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props

    @(connect(mapStateToProps, mapDispatchToProps) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        public render() {
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

        public submit = (values: FormFields) => {
            // tslint:disable-next-line:no-shadowed-variable
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

        public cancel = () => this.props.goBack()

        public validate = (values: FormFields) => {
            const errors = {} as any

            if (!values.title) {
                errors.title = 'Обязательное поле'
            }

            return errors
        }

        public componentDidMount() {
            const {
                id, library,
                // tslint:disable-next-line:no-shadowed-variable
                librariesActions,
            } = this.props

            if (id && !library && !!librariesActions && !!librariesActions.get) {
                librariesActions.get(id)
            }
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState, ownProps: Props) => ({
    library: state.libraries.entities.find((v) => v.id === ownProps.id),

    saveLoading: !!state.libraries.post.loading || !!state.libraries.put.loading,
    saveError: !!state.libraries.post.error || !!state.libraries.put.error,

    loading: !!state.libraries.get.loading,
    error: !!state.libraries.get.error,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    librariesActions: bindActionCreators(librariesActions, dispatch),
})
