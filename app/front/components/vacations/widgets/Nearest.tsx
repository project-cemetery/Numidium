import * as React from 'react'

import { Card, List, Modal } from 'antd'
import * as moment from 'moment'

import Icon, { IconType } from 'components/common/Icon'
import Vacation from 'model/Vacation'

import Container from './NearestContainer'

export interface Props {
    vacations: Vacation[]

    openModal: (id?: number) => void
}

export class Nearest extends React.PureComponent<Props, {}> {

    public render() {
        const { vacations, openModal } = this.props

        return (
            <Card
                title={'Ваши отпуска на ближайщий год'}
                actions={[
                    <span onClick={() => openModal()}>Добавить</span>,
                ]}
            >
                { (vacations.length > 0)
                    ? this.renderTimeline(vacations)
                    : <p>Нет созданных отпусков</p>
                }
            </Card>
        )
    }

    public renderTimeline = (vacations: Vacation[]) =>
        <List
            size={'large'}
            dataSource={vacations}
            renderItem={(v: Vacation) =>
                <List.Item actions={[
                    <Icon onClick={() => this.props.openModal(v.id)} type={IconType.EDIT} />,
                ]}>
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

    public getDiffMessage = (v: Vacation) => v.start.diff(moment(), 'days') > 0
        ? `Через ${v.start.diff(moment(), 'days')} дн.`
        : 'Сейчас'
}

export default Container(Nearest)
