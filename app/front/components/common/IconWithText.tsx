import * as React from 'react'

import Icon, { IconType } from './Icon'


interface Props {
    icon?: IconType
    text: string
}

export default (props: Props) =>
    <React.Fragment>
        {props.icon && <Icon type={props.icon} />}
        <span>{props.text}</span>
    </React.Fragment>

export { IconType } from './Icon'
