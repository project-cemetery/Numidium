import * as React from 'react'

import { Alert } from 'antd'


export enum AlertType {
    SUCCESS = 'success',
    INFO    = 'info',
    WARNING = 'warning',
    ERROR   = 'error',
}

interface Props {
    type: AlertType
    message: string
}

export default (props: Props) => <Alert type={props.type} message={props.message} />
