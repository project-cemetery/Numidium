import * as moment from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import Loader from 'components/common/Loader'
import Collection from 'model/Collection'
import User from 'model/User'
import Vacation from 'model/Vacation'
import { AppState } from 'reducers'
import modalActions, { ModalActions, ModalEnum } from 'store/modal/actions'
import usersActions, { UsersActions } from 'store/users/actions'
import vacationsActions, { VacationsActions } from 'store/vacations/actions'

import { Props as ComponentProps } from './Nearest'

interface Props {
    loading?: boolean
    error?: boolean

    vacations?: Vacation[]
    user?: User

    vacationsLoaded?: boolean

    vacationsActions?: VacationsActions
    usersActions?: UsersActions
    modalActions?: ModalActions,
}

export default function(Vacations: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props

    @(connect(mapStateToProps, mapDispatchToProps) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        public render() {
            const {
                loading, error,
                vacations, user,
                // tslint:disable-next-line:no-shadowed-variable
                modalActions,
            } = this.props

            return (
                <Loader loading={loading || !vacations || !user} error={error}>
                    {(!!vacations && !!user && !!modalActions) &&
                        <Vacations
                            openModal={this.openModal}

                            vacations={
                                vacations
                                    .filter((v) => v.user.id === user.id)
                                    .filter((v) => v.start.diff(moment(), 'days') < 365)
                                    .sort((a, b) => a.start.diff(b.start) > 0 ? 1 : -1)
                            }
                        />
                    }
                </Loader>
            )
        }

        public componentDidMount() {
            const {
                vacationsLoaded, user,
                // tslint:disable-next-line:no-shadowed-variable
                vacationsActions, usersActions,
            } = this.props

            if (!!vacationsActions && !!vacationsActions.getList && !vacationsLoaded) {
                vacationsActions.getList({
                    'end[after]': moment().format('YYYY-MM-DD'),
                })
            }

            if (!!usersActions && !!usersActions.getMe && !user) { usersActions.getMe() }
        }

        public openModal = (id?: number) => {
            // tslint:disable-next-line:no-shadowed-variable
            const { modalActions } = this.props

            if (modalActions && modalActions.show) {
                modalActions.show(ModalEnum.VACATION_EDIT, id)
            }
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    loading: !!state.vacations.getList.loading || !!state.users.get.loading,
    error: !!state.vacations.getList.error || !!state.users.get.error,

    vacations: state.vacations.entities,
    vacationsLoaded: !!state.vacations.list,
    user: state.users.entities.find((u) => u.id === state.users.meId),
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    vacationsActions: bindActionCreators(vacationsActions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
})
