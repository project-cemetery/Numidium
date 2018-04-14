import * as React from 'react'

import { Card } from 'antd'
import { Form } from 'react-final-form'

import Breadcrumbs from 'components/common/Breadcrumbs'
import SubmitButton from 'components/common/form/SubmitButton'
import TextInput from 'components/common/form/TextInput'
import TextArea from 'components/common/form/TextArea'
import FormContainer from 'components/common/form/FormContainer'
import ItemContainer from 'components/common/form/ItemContainer'
import Library from 'model/Library'

import Container from './LibraryFormContainer'


export interface FormFields {
    title: string
    description: string
}

export interface Props {
    library?: Library
    submit: (values: FormFields) => void
}

class LibraryForm extends React.PureComponent<Props, {}> {

    render() {
        const { library, submit } = this.props

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
                        initialValues={initialValues}
                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                            <FormContainer handleSubmit={handleSubmit}>

                                <ItemContainer label='Название' tail>
                                    <TextInput name='title' placeholder='Саморазвитие' />
                                </ItemContainer>

                                <ItemContainer label='Описание' tail>
                                    <TextArea
                                        name='description'
                                        placeholder='Книги разные, веселые и грустные'
                                        rows={5}
                                    />
                                </ItemContainer>

                                <ItemContainer>
                                    <SubmitButton label={!!library ? 'Сохранить' : 'Создать'} />
                                </ItemContainer>

                            </FormContainer>
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
