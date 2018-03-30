import * as React from 'react'

import { Card, List } from 'antd'
import { Link } from 'react-router-dom'

import Library from 'model/Library'
import Icon, { IconType } from 'components/common/Icon'
import Loader from 'components/common/Loader'

import Container from './ListContainer'


export interface Props {
    libs: Library[]
}

export class ListComponent extends React.PureComponent<Props, {}> {
    render() {
        const { libs } = this.props

        return (
            <React.Fragment>
                <Card title={'Разделы'}>
                    { (libs.length > 0)
                        ? this.renderLibs(libs)
                        : <p>В библиотеке нет разделов</p>
                    }
                </Card>
            </React.Fragment>
        )
    }

    renderLibs = (libs: Library[]) =>
        <List
            size={'large'}
            dataSource={libs}
            renderItem={(l: Library) =>
                <List.Item actions={[
                    <Link to={'/'}><Icon type={IconType.EYE_O} /></Link>,
                ]}>
                    <List.Item.Meta title={l.title} description={l.description} />
                </List.Item>
            }
        />
}

export default Container(ListComponent)
