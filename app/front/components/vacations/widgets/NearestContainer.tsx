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
import modalActions, { ModalActions, ModalEnum } from 'store/modal/actions'
import Loader from 'components/common/Loader'

import { Props as ComponentProps } from './Nearest'


interface Props {
    loading?: boolean
    error?: boolean

    vacations?: Collection<Vacation>
    user?: User

    vacationsActions?: VacationsActions
    usersActions?: UsersActions
    modalActions?: ModalActions,
}

export default function (Vacations: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props

    @(connect(mapStateToProps, mapDispatchToProps) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const {
                loading, error,
                vacations, user,
                modalActions,
            } = this.props

            return (
                <Loader loading={loading || !vacations || !user} error={error}>
                    {(!!vacations && !!user && !!modalActions) &&
                        <Vacations
                            openModal={() => this.openModal()}

                            vacations={
                                vacations.member
                                    .filter(v => v.user.id === user.id)
                                    .filter(v => v.start.diff(moment(), 'days') < 365)
                                    .sort((a, b) => a > b ? 1 : -1)
                            }
                        />
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
                vacationsActions.getList({
                    'end[after]': moment().format('YYYY-MM-DD'),
                })
            }

            if (!!usersActions && !!usersActions.get && !user) {
                usersActions.get()
            }
        }

        openModal = () => {
            const { modalActions } = this.props
            if (modalActions && modalActions.show) {
                modalActions.show(ModalEnum.VACATION)
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
    modalActions: bindActionCreators(modalActions, dispatch),
})
