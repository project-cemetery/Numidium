import * as React from 'react'

import { Row, Col } from 'antd'

import Collection from 'model/Collection'
import Vacation from 'model/Vacation'
import Breadcrumbs from 'components/common/Breadcrumbs'

import Nearest from './widgets/Nearest'


export default () => (
    <React.Fragment>
        <Breadcrumbs breadcrumbs={[ 'Отпуска' ]} />

        <Row gutter={16}>
            <Col lg={16} md={24}>
                <p>...</p>
            </Col>
            <Col lg={8} md={24}>
                <Nearest />
            </Col>
        </Row>
    </React.Fragment>
)
