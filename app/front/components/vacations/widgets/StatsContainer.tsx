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

import { Props as ComponentProps } from './Stats'


interface Props {
    loading?: boolean
    error?: boolean

    vacations?: Vacation[]

    vacationsLoaded?: boolean
}

export default function (Vacations: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props & VacationsActions

    @(connect(mapStateToProps, {...vacationsActions}) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const { loading, error, vacations } = this.props

            return (
                <Loader loading={loading || !vacations} error={error}>
                    {!!vacations &&
                        <Vacations
                            vacations={
                                vacations
                                    .filter(v => v.start.diff(moment(), 'days') < 365)
                                    .sort((a, b) => a.start.diff(b.start) > 0 ? 1 : -1)
                            }
                        />
                    }
                </Loader>
            )
        }

        componentDidMount() {
            const { vacationsLoaded, getList } = this.props

            if (!vacationsLoaded && !!getList)
                getList({
                    'end[after]': moment().format('YYYY-MM-DD'),
                })
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    loading: !!state.vacations.getList.loading || !!state.users.get.loading,
    error: !!state.vacations.getList.error || !!state.users.get.error,

    vacations: state.vacations.entities,
    vacationsLoaded: !!state.vacations.list,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    vacationsActions: bindActionCreators(vacationsActions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
})
