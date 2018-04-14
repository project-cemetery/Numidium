import * as React from 'react'

import { Row, Col, Card } from 'antd'

import Breadcrumbs from 'components/common/Breadcrumbs'
import Library from 'model/Library'

import Container from './LibraryContainer'


export interface Props {
    library: Library
}

export class LibraryComponent extends React.PureComponent<Props, {}> {

    render() {
        const { library } = this.props

        return (
            <React.Fragment>
                <Breadcrumbs breadcrumbs={[ 'Библиотека', 'Раздел' ]} />

                <Row gutter={16}>

                    <Col lg={24}>
                        <Card title={library.title}>
                            <p>{library.description}</p>
                        </Card>
                    </Col>

                    <Col lg={12} md={24}>
                        <Card title='Книги'>
                            <p>{library.description}</p>
                        </Card>
                    </Col>

                    <Col lg={12} md={24}>
                        <Card title='Статьи'>
                            <p>{library.description}</p>
                        </Card>
                    </Col>

                </Row>
            </React.Fragment>
        )
    }
}

export default Container(LibraryComponent)
