import * as React from 'react'
import { connect } from 'react-redux'

import { AppState } from 'reducers'
import User from 'model/User'
import usersAction, { UsersActions } from 'business/users/actions'

import { Props as ComponentProps } from './User'


interface Props {
    loading?: boolean
    user?: User
}

export default function (User: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props & UsersActions

    @(connect(mapStateToProps, { ...usersAction }) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        render() {
            const { loading } = this.props

            return (
                <User loading={loading} />
            )
        }

        componentWillMount() {
            console.log(this.props.requestList)
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    loading: state.users.loading,
    user: state.users.user,
})
