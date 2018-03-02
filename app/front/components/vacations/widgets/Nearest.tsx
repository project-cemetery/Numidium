import * as React from 'react'

import { Card, List } from 'antd'
import * as moment from 'moment'

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
                <Card
                    title={'Ваши отпуска на ближайщий год'}
                    actions={[
                        <Icon type={IconEnum.PLUS_CIRCLE} />,
                    ]}
                >
                    { (vacations.length > 0)
                        ? this.renderTimeline(vacations)
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
                        title={this.getDiffMessage(v)}
                        description={
                            <p>
                                Начало: {v.start.format('DD.MM.YYYY')}<br />
                                Конец: {v.end.format('DD.MM.YYYY')}
                            </p>
                        }
                    />
                </List.Item>
            }
        />

    getDiffMessage = (v: Vacation) => v.start.diff(moment(), 'days') > 0
        ? `Через ${v.start.diff(moment(), 'days')} дн.`
        : 'Сейчас'
}

export default Container(Nearest)
