import * as React from 'react'

import { Icon } from 'antd'

import IconEnum from 'util/enum/IconEnum'


interface Props {
    type: IconEnum
    spin?: boolean
    style?: any
    
    onClick?: () => void
}

export default (props: Props) =>
    <Icon type={props.type} spin={props.spin} style={props.style} onClick={props.onClick} />
