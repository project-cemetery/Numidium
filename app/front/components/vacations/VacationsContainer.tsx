import * as React from 'react'
import { connect } from 'react-redux'

import { AppState } from 'reducers'
import Collection from 'model/Collection'
import Vacation from 'model/Vacation'
import vacationsAction, { VacationsActions } from 'store/vacations/actions'
import Loader from 'components/common/Loader'

import { Props as ComponentProps } from './Vacations'


interface Props {
    loading?: boolean
    error?: boolean
    vacations?: Collection<Vacation>
}

export default function (Vacations: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props & VacationsActions

    @(connect(mapStateToProps, { ...vacationsAction }) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const { loading, error, vacations } = this.props

            return (
                <Loader loading={loading || !vacations} error={error}>
                    <Vacations vacations={vacations} />
                </Loader>
            )
        }

        componentDidMount() {
            const { getList, vacations } = this.props

            if (getList && !vacations) getList()
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    loading: !!state.vacations.getList.loading,
    error: !!state.vacations.getList.error,
    vacations: state.vacations.vacations,
})
