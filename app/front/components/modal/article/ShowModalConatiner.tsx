import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import Article from 'model/Article'
import { AppState } from 'reducers'
import modalActions, { ModalActions } from 'store/modal/actions'

import { Props as ComponentProps } from './ShowModal'

interface Props {
    id: number
    visible: boolean

    error?: boolean

    article?: Article

    modalActions?: ModalActions
}

export default function(Component: React.ComponentClass<ComponentProps>) {

    type ConatinerProps = Props

    @(connect(mapStateToProps, mapDispatchToProps) as any)
    class Wrapped extends React.Component<ConatinerProps, {}> {

        public render() {
            const {
                id, article, visible, error,
                // tslint:disable-next-line:no-shadowed-variable
                modalActions,
            } = this.props

            return (!!article && !!modalActions && !!modalActions.hide) &&
                <Component
                    error={!!error}
                    visible={visible}

                    article={article}

                    hide={modalActions.hide}
                />
        }
    }

    return Wrapped
}

const mapStateToProps = (state: AppState) => ({
    id: state.modal.id,

    article: state.libraries.entities
        .map((lib) => lib.articles)
        .reduce((acc, arr, []) => [...acc, ...arr])
        .find((article) => article.id === state.modal.id),

    error: !!state.vacations.get.error || !!state.users.get.error,
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    modalActions: bindActionCreators(modalActions, dispatch),
})
