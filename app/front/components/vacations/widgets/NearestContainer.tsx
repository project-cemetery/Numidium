import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import * as moment from 'moment'

import { AppState } from 'reducers'
import Collection from 'model/Collection'
import Vacation from 'model/Vacation'
import User from 'model/User'
import vacationsActions, { VacationsActions } from 'store/vacations/actions'
import usersActions, { UsersActions } from 'store/users/actions'
import Loader from 'components/common/Loader'

import { Props as ComponentProps } from './Nearest'


interface Props {
    loading?: boolean
    error?: boolean
    vacations?: Collection<Vacation>
    user?: User

    vacationsActions?: VacationsActions
    usersActions?: UsersActions
}

export default function (Vacations: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props

    @(connect(mapStateToProps, mapDispatchToProps) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const { loading, error, vacations, user } = this.props

            console.log(vacations)

            return (
                <Loader loading={loading || !vacations || !user} error={error}>
                    {(!!vacations && !!user) &&
                        <Vacations vacations={
                            vacations.member
                                .filter(v => v.user.id === user.id)
                                .filter(v => v.start.diff(moment(), 'days') < 365)
                        } />
                    }
                </Loader>
            )
        }

        componentDidMount() {
            const {
                vacations, user,
                vacationsActions, usersActions,
            } = this.props

            if (!!vacationsActions && !!vacationsActions.getList && !vacations) {
                vacationsActions.getList()
            }

            if (!!usersActions && !!usersActions.get && !user) {
                usersActions.get()
            }
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    loading: !!state.vacations.getList.loading || !!state.users.get.loading,
    error: !!state.vacations.getList.error || !!state.users.get.error,
    vacations: state.vacations.vacations,
    user: state.users.user,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    vacationsActions: bindActionCreators(vacationsActions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch),
})
