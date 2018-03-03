import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { AppState } from 'reducers'
import modalActions, { ModalActions } from 'store/modal/actions'
import vacationsActions, { VacationsActions } from 'store/vacations/actions'
import Vacation from 'model/Vacation'

import { Props as ComponentProps, FormFields } from './ModalForm'


interface Props {
    id?: number
    visible: boolean

    loading?: boolean
    error?: boolean

    vacation?: Vacation

    modalActions?: ModalActions
    vacationsActions?: VacationsActions
}

export default function (ModalForm: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props

    @(connect(mapStateToProps, mapDispatchToProps) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const {
                id, vacation, visible, loading, error,
                modalActions,
            } = this.props

            return (!!modalActions && !!modalActions.hide) &&
                <ModalForm
                    loading={!!loading || (!!id && !vacation)}
                    error={!!error}
                    visible={!!visible}

                    vacation={vacation}

                    hide={modalActions.hide}
                    submit={this.submit}
                />
        }

        submit = (values: FormFields) => {
            const vacation = {
                id: this.props.id,
                start: values.range.start,
                end: values.range.end,
            } as Vacation

            console.log(vacation)
        }

        componentWillReceiveProps(nextProps: Props) {
            const {
                id, visible, vacation,
                vacationsActions,
            } = nextProps

            if (visible && id && !vacation && !!vacationsActions && !!vacationsActions.get)
                vacationsActions.get(id)
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

    loading: !!state.vacations.get.loading,
    error: !!state.vacations.get.error,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    vacationsActions: bindActionCreators(vacationsActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
})
