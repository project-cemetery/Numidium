import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { AppState } from 'reducers'
import librariesActions, { LibrariesActions } from 'store/libraries/actions'
import usersActions, { UsersActions } from 'store/users/actions'
import Library from 'model/Library'
import User, { Owner } from 'model/User'
import Loader from 'components/common/Loader'

import { Props as ComponentProps, FormFields } from './LibraryForm'


interface Props {
    id?: number

    loading?: boolean
    error?: boolean

    saveLoading?: boolean
    saveError?: boolean

    library?: Library
    user?: User

    librariesActions?: LibrariesActions
    usersActions?: UsersActions
}

export default function (Form: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props

    @(connect(mapStateToProps, mapDispatchToProps) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const {
                id, library, loading, error, saveLoading, saveError,
            } = this.props

            return (
                <Loader
                    loading={loading || (!!id && !library) || saveLoading}
                    error={error || saveError}
                >
                    <Form library={library} submit={console.log} />
                </Loader>
            )
        }

        // submit = (values: FormFields) => {
        //     const { vacationsActions, user, modalActions } = this.props

        //     const vacation = {
        //         id: this.props.id,
        //         start: values.range.start,
        //         end: values.range.end,
        //         user: user as Owner,
        //     } as Vacation

        //     if (!!vacationsActions && !!vacationsActions.post && !!vacationsActions.put) {
        //         const promise = !vacation.id
        //             ? vacationsActions.post(vacation)
        //             : vacationsActions.put(vacation)

        //         promise.then(() => !!modalActions && !!modalActions.hide && modalActions.hide())
        //     }
        // }

        componentDidMount() {
            const {
                id, library, user,
                librariesActions, usersActions,
            } = this.props

            if (id && !library && !!librariesActions && !!librariesActions.get)
                librariesActions.get(id)

            if (!user && !!usersActions && !!usersActions.getMe)
                usersActions.getMe()
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    id: state.modal.id,

    library: state.libraries.entities.find(v => v.id === state.modal.id),
    user: state.users.entities.find(u => u.id === state.users.meId),

    saveLoading: !!state.libraries.post.loading || !!state.libraries.put.loading,
    saveError: !!state.libraries.post.error || !!state.libraries.put.error,

    loading: !!state.libraries.get.loading || !!state.users.get.loading,
    error: !!state.libraries.get.error || !!state.users.get.error,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    vacationsActions: bindActionCreators(librariesActions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch),
})
