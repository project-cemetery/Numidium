import * as React from 'react'
import { connect } from 'react-redux'

import { AppState } from 'reducers'
import Library from 'model/Library'
import librariesAction, { LibrariesActions } from 'store/libraries/actions'
import Loader from 'components/common/Loader'

import { Props as ComponentProps } from './List'


interface Props {
    loading?: boolean
    error?: boolean
    loaded?: boolean
    libs?: Library[]
}

export default function (List: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props & LibrariesActions

    @(connect(mapStateToProps, { ...librariesAction }) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const { loading, loaded, error, libs } = this.props

            return (
                <Loader loading={loading || !libs} error={error}>
                    {loaded && libs && <List libs={libs.sort((a, b) => a.title > b.title ? 1 : -1)} />}
                </Loader>
            )
        }

        componentDidMount() {
            const { getList, loaded } = this.props

            if (getList && !loaded) getList()
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    loading: !!state.libraries.getList.loading,
    error: !!state.libraries.getList.error,
    loaded: !!state.libraries.list,
    libs: state.libraries.entities,
})
