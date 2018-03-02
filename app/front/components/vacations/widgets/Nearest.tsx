import * as React from 'react'

import { Card, List } from 'antd'

import Vacation from 'model/Vacation'
import Icon from 'components/common/Icon'
import IcomEnum from 'util/enum/IconEnum'

import Container from './NearestContainer'
import IconEnum from 'util/enum/IconEnum'


export interface Props {
    vacations: Vacation[]
}

class Nearest extends React.PureComponent<Props, {}> {

    render() {
        const { vacations } = this.props

        return (
            <React.Fragment>
                <Card title={'Ваши отпуска'}>
                    { (vacations.length > 0)
                        ? this.renderTimeline(vacations.sort((a, b) => a > b ? 1 : -1))
                        : <p>Нет созданных отпусков</p>
                    }
                </Card>
            </React.Fragment>
        )
    }

    renderTimeline = (vacations: Vacation[]) =>
        <List
            size={'large'}
            dataSource={vacations}
            renderItem={(v: Vacation) =>
                <List.Item>
                    <List.Item.Meta
                        title={`Начало: ${v.start}`}
                        description={`Конец: ${v.end}`}
                    />
                </List.Item>
            }
        />
}

export default Container(Nearest)
