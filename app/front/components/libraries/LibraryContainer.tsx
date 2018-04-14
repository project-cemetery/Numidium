import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { AppState } from 'reducers'
import librariesActions, { LibrariesActions } from 'store/libraries/actions'
import Library from 'model/Library'
import Loader from 'components/common/Loader'

import { Props as ComponentProps } from './Library'


interface Props {
    id: number

    loading?: boolean
    error?: boolean

    library?: Library

    librariesActions?: LibrariesActions
}

export default function (Component: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props

    @(connect(mapStateToProps, mapDispatchToProps) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const {
                id, library, loading, error,
            } = this.props

            return (
                <Loader
                    loading={loading || !library}
                    error={error}
                >
                    {!!library && <Component library={library} />}
                </Loader>
            )
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

    loading: !!state.libraries.get.loading,
    error: !!state.libraries.get.error,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    librariesActions: bindActionCreators(librariesActions, dispatch),
})
