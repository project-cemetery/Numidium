import * as React from 'react'

import { Row, Col } from 'antd'

import Content from 'components/common/Content'

import UserWidget from './widgets/User'


export default () =>
    <Content>
        <Row gutter={16}>
            <Col md={8} xs={24}>
                <UserWidget />
            </Col>
            <Col md={16} xs={24}>col-16</Col>
        </Row>
    </Content>
