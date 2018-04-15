import * as React from 'react'

import { Col, Row } from 'antd'

import Breadcrumbs from 'components/common/Breadcrumbs'
import Collection from 'model/Collection'
import Vacation from 'model/Vacation'

import Nearest from './widgets/Nearest'
import Stats from './widgets/Stats'

export default () => (
    <React.Fragment>
        <Breadcrumbs breadcrumbs={[ 'Отпуска' ]} />

        <Row gutter={16}>
            <Col lg={16} md={24}>
                <Stats />
            </Col>
            <Col lg={8} md={24}>
                <Nearest />
            </Col>
        </Row>
    </React.Fragment>
)
