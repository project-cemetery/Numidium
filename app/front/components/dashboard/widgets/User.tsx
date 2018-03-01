import * as React from 'react'

import { Card, Icon, Avatar } from 'antd'

import User from 'model/User'
import Loader from 'components/common/Loader'

import Container from './UserContainer'


export interface Props {
    loading?: boolean
    user?: User
}

class UserComponent extends React.PureComponent<Props, {}> {
    render() {
        const { user, loading } = this.props

        console.log(this.props)

        return (
            <React.Fragment>
                <Card>
                    <Loader predicate={!!user || loading}>
                        <Card.Meta title={user && user.email} />
                    </Loader>
                </Card>
            </React.Fragment>
        )
    }
}

export default Container(UserComponent)
