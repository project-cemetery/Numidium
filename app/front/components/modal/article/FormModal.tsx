import * as React from 'react'

import { Modal } from 'antd'
import { Form } from 'react-final-form'


import FormWrapper from 'components/common/form/FormWrapper'
import ItemWrapper from 'components/common/form/ItemWrapper'
import Checkbox from 'components/common/form/Checkbox'
import TextInput from 'components/common/form/TextInput'
import NumberInput from 'components/common/form/NumberInput'
import TextArea from 'components/common/form/TextArea'
import Loader from 'components/common/Loader'
import Article from 'model/Article'

import Container from './FormModalConatiner'


export interface FormFields {
    title: string
    author: string
    year: number
    description: string
    link: string
}

export interface Props {
    loading: boolean
    error: boolean
    visible: boolean

    article?: Article

    hide: () => void
    submit: (values: FormFields) => void
    validate: (values: FormFields) => any
}

class ModalForm extends React.PureComponent<Props, {}> {
    render() {
        const { loading, error, article, visible, hide, submit, validate } = this.props

        const initialValues = !!article
            ? this.initialArticle(article)
            : this.initialEmpty()

        return <Form
            onSubmit={values => submit(values as FormFields)}
            validate={values => validate(values as FormFields)}
            initialValues={initialValues}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
                <Modal
                    wrapClassName='vertical-center-modal'
                    title={'Статья'}
                    visible={visible}

                    okText={'Сохранить'}
                    cancelText={'Отменить'}

                    onOk={() => handleSubmit()}
                    onCancel={() => {
                        reset()
                        hide()
                    }}
                >
                    <Loader loading={loading} error={error}>
                        <FormWrapper>

                            <ItemWrapper tail label='Название'>
                                <TextInput name='title' placeholder='Logux' />
                            </ItemWrapper>

                            <ItemWrapper tail label='Автор'>
                                <TextInput name='author' placeholder='Андрей Ситник' />
                            </ItemWrapper>

                            <ItemWrapper tail label='Год выхода'>
                                <NumberInput name='year' />
                            </ItemWrapper>

                            <ItemWrapper label='Описание' tail>
                                <TextArea
                                    name='description'
                                    placeholder='Статья о новом слове в синхронизации состояния'
                                    rows={5}
                                />
                            </ItemWrapper>

                            <ItemWrapper tail label='Ссылка'>
                                <TextInput name='link' />
                            </ItemWrapper>

                        </FormWrapper>
                    </Loader>
                </Modal>
            )}
        />
    }

    initialArticle = (article: Article) => ({
        title: article.title,
        author: article.author,
        year: article.year,
        description: article.description,
        link: article.link,
    } as FormFields)

    initialEmpty = () => ({
        title: '',
        author: '',
        year: (new Date()).getFullYear(),
        description: '',
        link: '',
    } as FormFields)
}

export default Container(ModalForm)
