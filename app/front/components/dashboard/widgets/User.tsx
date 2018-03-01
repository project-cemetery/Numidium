import * as React from 'react'

import { Card, Icon, Avatar } from 'antd'

import User from 'model/User'
import Loader from 'components/common/Loader'

import Container from './UserContainer'


export interface Props {
    loading?: boolean
    users?: User[]
}

class UserComponent extends React.PureComponent<Props, {}> {
    render() {
        const { users, loading } = this.props

        return (
            <React.Fragment>
                <Card>
                    <Loader predicate={!!users || loading}>
                        {!!users && users.map((user, i) => <Card.Meta title={user && user.email} key={i} />)}
                    </Loader>
                </Card>
            </React.Fragment>
        )
    }
}

export default Container(UserComponent)
