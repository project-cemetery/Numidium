import * as React from 'react'

import { Row, Col } from 'antd'

import UserWidget from './widgets/User'


export default () =>
    <React.Fragment>
        <Row gutter={16}>
            <Col md={8} xs={24}>
                <UserWidget />
            </Col>
            <Col md={16} xs={24}>col-16</Col>
        </Row>
    </React.Fragment>
