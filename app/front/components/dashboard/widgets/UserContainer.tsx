import * as React from 'react'
import { connect } from 'react-redux'

import { AppState } from 'reducers'
import User from 'model/User'
import usersAction, { UsersActions } from 'store/users/actions'
import Loader from 'components/common/Loader'

import { Props as ComponentProps } from './User'


interface Props {
    loading?: boolean
    error?: boolean
    user?: User
}

export default function (User: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props & UsersActions

    @(connect(mapStateToProps, { ...usersAction }) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const { loading, error, user } = this.props

            return (
                <Loader loading={loading || !user} error={error}>
                    {user && <User user={user} />}
                </Loader>
            )
        }

        componentDidMount() {
            const { get, user } = this.props

            if (get && !user) get()
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    loading: !!state.users.get.loading,
    error: !!state.users.get.error,
    user: state.users.user,
})
