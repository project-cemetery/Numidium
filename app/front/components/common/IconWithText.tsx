import * as React from 'react'

import Icon from './Icon'

import IconEnum from 'util/IconEnum'


interface Props {
    icon?: IconEnum
    text: string
}

export default (props: Props) =>
    <React.Fragment>
        {props.icon && <Icon type={props.icon} />}
        <span>{props.text}</span>
    </React.Fragment>
