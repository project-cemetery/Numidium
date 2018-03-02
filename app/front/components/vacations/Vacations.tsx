import * as React from 'react'

import { Row, Col } from 'antd'

import Collection from 'model/Collection'
import Vacation from 'model/Vacation'

import Container from './VacationsContainer'


export interface Props {
    vacations?: Collection<Vacation>

}
class Vacations extends React.PureComponent<Props, {}> {

    render() {
        console.log(this.props)

        return (
            <React.Fragment>
                <Row gutter={16}>
                    <Col md={8} xs={24}>
                        <p>...</p>
                    </Col>
                    <Col md={16} xs={24}>col-16</Col>
                </Row>
            </React.Fragment>
        )
    }

}

export default Container(Vacations)
