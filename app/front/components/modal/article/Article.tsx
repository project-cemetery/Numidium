import * as React from 'react'

import { Modal } from 'antd'

import Article from 'model/Article'

import Container from './ArticleConatiner'

// const extractor = require('article-extractor')


export interface Props {
    error: boolean
    article: Article
    visible: boolean
    hide: () => void
}

interface LocalState {
    loadedArticle: any
}

export class ArticleComponent extends React.PureComponent<Props, {}> {
    state = {
        loadedArticle: undefined,
    } as LocalState

    render() {
        const { visible, article, hide } = this.props

        return (
            <Modal
                title={article.title}
                visible={visible}

                okText={'Читать в новой вкладке'}
                cancelText={'Закрыть'}

                onCancel={() => hide()}
                onOk={() => {
                    const win = window.open(article.link, '_blank') as any;
                    win.focus()
                }}
            >
                <p>{article.description}</p>
                <p>Со временем тут будет показываться полный текст статьи.</p>
            </Modal>
        )
    }
}

export default Container(ArticleComponent)
