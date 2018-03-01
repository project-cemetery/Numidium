import * as React from 'react'
import { connect } from 'react-redux'

import { AppState } from 'reducers'
import User from 'model/User'
import usersAction, { UsersActions } from 'business/users/actions'

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

            return <User error={error} loading={loading} user={user} />
        }

        componentDidMount() {
            const { fetchUser } = this.props

            if (fetchUser) fetchUser()
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    loading: !!state.users.loadingItem,
    error: !!state.users.errorItem,
    user: state.users.user,
})
