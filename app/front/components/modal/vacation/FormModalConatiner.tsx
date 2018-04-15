import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import User, { Owner } from 'model/User'
import Vacation from 'model/Vacation'
import { AppState } from 'reducers'
import modalActions, { ModalActions } from 'store/modal/actions'
import usersActions, { UsersActions } from 'store/users/actions'
import vacationsActions, { VacationsActions } from 'store/vacations/actions'

import { FormFields, Props as ComponentProps } from './FormModal'

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

export default function(ModalForm: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props

    @(connect(mapStateToProps, mapDispatchToProps) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        public render() {
            const {
                id, vacation, visible, loading, error, saveLoading, saveError,
                // tslint:disable-next-line:no-shadowed-variable
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

        public submit = (values: FormFields) => {
            // tslint:disable-next-line:no-shadowed-variable
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

        public componentWillReceiveProps(nextProps: Props) {
            const {
                id, visible, vacation, user,
                // tslint:disable-next-line:no-shadowed-variable
                vacationsActions, usersActions,
            } = nextProps

            if (visible && id && !vacation && !!vacationsActions && !!vacationsActions.get) {
                vacationsActions.get(id)
            }

            if (visible && !user && !!usersActions && !!usersActions.getMe) { usersActions.getMe() }
        }

        public componentDidMount() {
            this.componentWillReceiveProps(this.props)
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    id: state.modal.id,

    vacation: state.vacations.entities.find((v) => v.id === state.modal.id),
    user: state.users.entities.find((u) => u.id === state.users.meId),

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
