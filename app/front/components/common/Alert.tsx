import * as React from 'react'

import { Alert } from 'antd'

import AlertEnum from 'util/enum/AlertEnum'


interface Props {
    type: AlertEnum
    message: string
}

export default (props: Props) => <Alert type={props.type} message={props.message} />
