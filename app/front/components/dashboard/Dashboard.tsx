import * as React from 'react'

import { Row, Col } from 'antd'

import Content from 'components/common/Content'

import UserWidget from './widgets/User'


export default () =>
    <Content>
        <Row gutter={16}>
            <Col span={8}>
                <UserWidget />
            </Col>
            <Col span={16}>col-16</Col>
        </Row>
    </Content>
