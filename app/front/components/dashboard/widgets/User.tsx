import * as React from 'react'

import { Card } from 'antd'

import User from 'model/User'
import Loader from 'components/common/Loader'

import Container from './UserContainer'


export interface Props {
    user: User
}

class UserComponent extends React.PureComponent<Props, {}> {
    render() {
        const { user } = this.props

        return (
            <React.Fragment>
                <Card cover={
                    <img alt='avatar' src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                }>
                    <Card.Meta title={user.email} />
                </Card>
            </React.Fragment>
        )
    }
}

export default Container(UserComponent)
