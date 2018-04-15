import * as React from 'react'

import { Row, Col } from 'antd'

import Breadcrumbs from 'components/common/Breadcrumbs'

import List from './widgets/List'
import Recommended from './widgets/Recommended'


export default () => (
    <React.Fragment>
        <Breadcrumbs breadcrumbs={[ 'Библиотека' ]} />

        <Row gutter={16}>
            <Col lg={16} md={24}>
                <Recommended />
            </Col>
            <Col lg={8} md={24}>
                <List />
            </Col>
        </Row>
    </React.Fragment>
)
