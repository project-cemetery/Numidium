import { Card } from 'antd'
import * as moment from 'moment'
import * as React from 'react'

import Vacation from 'model/Vacation'

import Container from './StatsContainer'

export interface Props {
    vacations: Vacation[]
}

export class Stats extends React.PureComponent<Props, {}> {

    public render() {
        const { vacations } = this.props

        return (
            <Card title={'Статистика'}>
                <p>Coming soon...</p>
            </Card>
        )
    }
}

export default Container(Stats)
