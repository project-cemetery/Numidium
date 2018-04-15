import * as React from 'react'

import { Card } from 'antd'
import { Form } from 'react-final-form'

import Breadcrumbs from 'components/common/Breadcrumbs'
import SubmitButton from 'components/common/form/SubmitButton'
import CancelButton  from 'components/common/form/CancelButton'
import TextInput from 'components/common/form/TextInput'
import TextArea from 'components/common/form/TextArea'
import FormWrapper from 'components/common/form/FormWrapper'
import ItemWrapper from 'components/common/form/ItemWrapper'
import Library from 'model/Library'

import Container from './LibraryFormContainer'


export interface FormFields {
    title: string
    description: string
}

export interface Props {
    library?: Library
    submit: (values: FormFields) => void
    cancel: () => void
    validate: (values: any) => any
}

class LibraryForm extends React.PureComponent<Props, {}> {

    render() {
        const { library, submit, cancel, validate } = this.props

        const initialValues = !!library
            ? this.initialLibrary(library)
            : this.initialEmpty()

        const breadcrumb = `${!!library ? 'Редактирование' : 'Создание'} раздела`

        return (
            <React.Fragment>
                <Breadcrumbs breadcrumbs={[ 'Библиотека', breadcrumb ]} />

                <Card>
                    <Form
                        onSubmit={values => submit(values as FormFields)}
                        validate={validate}
                        initialValues={initialValues}
                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                            <FormWrapper handleSubmit={handleSubmit}>

                                <ItemWrapper label='Название' tail>
                                    <TextInput name='title' placeholder='Саморазвитие' />
                                </ItemWrapper>

                                <ItemWrapper label='Описание' tail>
                                    <TextArea
                                        name='description'
                                        placeholder='Книги разные, веселые и грустные'
                                        rows={5}
                                    />
                                </ItemWrapper>

                                <ItemWrapper>
                                    <SubmitButton label={!!library ? 'Сохранить' : 'Создать'} />
                                    <CancelButton label={'Отменить'} cancel={cancel} />
                                </ItemWrapper>

                            </FormWrapper>
                        )}
                    />
                </Card>
            </React.Fragment>
        )
    }

    initialLibrary = (library: Library) => ({
        title: library.title,
        description: library.description,
    } as FormFields)

    initialEmpty = () => ({
        title: '',
        description: '',
    } as FormFields)
}

export default Container(LibraryForm)
