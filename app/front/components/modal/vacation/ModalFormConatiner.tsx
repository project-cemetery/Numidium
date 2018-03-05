import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { AppState } from 'reducers'
import modalActions, { ModalActions } from 'store/modal/actions'
import vacationsActions, { VacationsActions } from 'store/vacations/actions'
import usersActions, { UsersActions } from 'store/users/actions'
import Vacation from 'model/Vacation'
import User, { Owner } from 'model/User'

import { Props as ComponentProps, FormFields } from './ModalForm'


interface Props {
    id?: number
    visible: boolean

    loading?: boolean
    error?: boolean

    saveLoading?: boolean
    saveError?: boolean

    vacation?: Vacation
    user?: User

    modalActions?: ModalActions
    vacationsActions?: VacationsActions
    usersActions?: UsersActions
}

export default function (ModalForm: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props

    @(connect(mapStateToProps, mapDispatchToProps) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const {
                id, vacation, visible, loading, error, saveLoading, saveError,
                modalActions,
            } = this.props

            return (!!modalActions && !!modalActions.hide) &&
                <ModalForm
                    loading={!!loading || (!!id && !vacation) || !!saveLoading}
                    error={!!error || !!saveError}
                    visible={!!visible}

                    vacation={vacation}

                    hide={modalActions.hide}
                    submit={this.submit}
                />
        }

        submit = (values: FormFields) => {
            const { vacationsActions, user, modalActions } = this.props

            const vacation = {
                id: this.props.id,
                start: values.range.start,
                end: values.range.end,
                user: user as Owner,
            } as Vacation

            if (!!vacationsActions && !!vacationsActions.post && !!vacationsActions.put) {
                const promise = !vacation.id
                    ? vacationsActions.post(vacation)
                    : vacationsActions.put(vacation)

                promise.then(() => !!modalActions && !!modalActions.hide && modalActions.hide())
            }
        }

        componentWillReceiveProps(nextProps: Props) {
            const {
                id, visible, vacation, user,
                vacationsActions, usersActions,
            } = nextProps

            if (visible && id && !vacation && !!vacationsActions && !!vacationsActions.get)
                vacationsActions.get(id)

            if (visible && !user && !!usersActions && !!usersActions.getMe) usersActions.getMe()
        }

        componentDidMount() {
            this.componentWillReceiveProps(this.props)
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    id: state.modal.id,

    vacation: state.vacations.entities.find(v => v.id === state.modal.id),
    user: state.users.entities.find(u => u.id === state.users.meId),

    saveLoading: !!state.vacations.post.loading || !!state.vacations.put.loading,
    saveError: !!state.vacations.post.error || !!state.vacations.put.error,

    loading: !!state.vacations.get.loading || !!state.users.get.loading,
    error: !!state.vacations.get.error || !!state.users.get.error,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    vacationsActions: bindActionCreators(vacationsActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch),
})
