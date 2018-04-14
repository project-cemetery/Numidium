import * as React from 'react'

import { Row, Col, Card, List } from 'antd'

import Breadcrumbs from 'components/common/Breadcrumbs'
import Icon, { IconType } from 'components/common/Icon'
import Library from 'model/Library'
import Article from 'model/Article'

import Container from './LibraryContainer'


export interface Props {
    library: Library

    openArticle: (id: number) => void
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
                            { (library.articles.length > 0)
                                ? this.renderArticles(library.articles)
                                : <p>В разделе нет статей</p>
                            }
                        </Card>
                    </Col>

                </Row>
            </React.Fragment>
        )
    }

    renderArticles = (articles: Article[]) =>
        <List
            size={'large'}
            dataSource={articles}
            renderItem={(article: Article) =>
                <List.Item actions={[
                    <Icon
                        type={IconType.EYE_O}
                        onClick={() => this.props.openArticle(article.id)}
                    />,
                ]}>
                    <List.Item.Meta title={article.title} description={article.description} />
                </List.Item>
            }
        />
}

export default Container(LibraryComponent)
