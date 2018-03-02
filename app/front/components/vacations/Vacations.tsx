import * as React from 'react'

import { Row, Col } from 'antd'

import Content from 'components/common/Content'


export default () =>
    <Content>
        <Row gutter={16}>
            <Col md={8} xs={24}>
                <p>...</p>
            </Col>
            <Col md={16} xs={24}>col-16</Col>
        </Row>
    </Content>
