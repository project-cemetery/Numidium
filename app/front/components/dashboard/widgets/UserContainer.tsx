import * as React from 'react'
import { connect } from 'react-redux'

import { AppState } from 'reducers'
import User from 'model/User'
import usersAction, { UsersActions } from 'business/users/actions'

import { Props as ComponentProps } from './User'


interface Props {
    loading?: boolean
    users?: User[]
}

export default function (User: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props & UsersActions

    @(connect(mapStateToProps, { ...usersAction }) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const { loading, users } = this.props

            return <User loading={loading} users={users} />
        }

        componentDidMount() {
            const { fetchUsers } = this.props

            if (fetchUsers) fetchUsers()
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    loading: state.users.loading,
    users: state.users.users && state.users.users.member,
})
