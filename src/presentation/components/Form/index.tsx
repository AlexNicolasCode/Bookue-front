import { FormEvent, useEffect, useState } from "react"

import { Input, SubmitButton } from "@/presentation/components"

import { FormStyled } from "./styles"

type FormProps = {
    [fieldName: string]: string
}

type FormComponentProps = {
    handleSubmit: (event: FormEvent<HTMLFormElement>, form: FormProps) => Promise<void>
    fields: string[]
    wrongField?: string
    submitButtonText: string
}

export const Form = ({ handleSubmit, fields, wrongField, submitButtonText }: FormComponentProps) => {
    const [form, setForm] = useState<FormProps>({})
    const [formFields, setFormFields] = useState(
        fields.map((fieldName) => ({
            fieldName,
            isWrongFill: false,
        }))
    )

    useEffect(() => {
        if (wrongField) {
            activeFieldIsWrongFill(wrongField)        
        } else {
            cleanwrongFields()
        }
    }, [wrongField])

    const getFieldPlaceholder = (fieldName: string): string => {
        const placeholderMapper = {
            'name': 'Ex: Bob Bookue',
            'email': 'Ex: bookue@gmail.com',
            'password': 'Ex: BookueLovePotato',
            'passwordConfirmation': 'Ex: BookueLovePotato',
            'title': 'Ex: Welcome to the Bookue',
            'author': 'Ex: Bookue Lispector',
            'currentPage': 'Ex: 10',
            'pages': 'Ex: 100',
            'description': 'Ex: This is a Bookue book',
        }
        return placeholderMapper[fieldName]
    }
    
    const getFieldType = (fieldName: string): string => {
        const fieldNameLowCase = fieldName.toLowerCase()
        const isPageField = /page/.test(fieldNameLowCase)
        if (isPageField) {
            return 'number'
        }
        const isPasswordField = /password/.test(fieldNameLowCase)
        if (isPasswordField) {
            return 'password'
        }
        const isEmailField = /email/.test(fieldNameLowCase)
        if (isEmailField) {
            return 'email'
        }
        return 'text'
    }

    const cleanwrongFields = () => {
        const updatedFields = formFields.map((field) => ({
            ...field,
            isWrongFill: false
        }))
        setFormFields(updatedFields)
    }

    const getUpdatedFields = (fieldName: string, targetField: string, value: string | boolean) => {
        return formFields.map((field, index) => {
            if(field.fieldName === fieldName) {
                formFields[index][targetField] = value
                return formFields[index]
            }
            return formFields[index]
        })
    }

    const activeFieldIsWrongFill = (fieldName: string): void => {
        const updatedForm = getUpdatedFields(fieldName, 'isWrongFill', true)
        setFormFields(updatedForm)
    }

    const setFieldValue = (fieldName: string, value: string): void => {
        setForm({
            ...form,
            [fieldName]: value
        })
    }

    const renderFields = (): JSX.Element => {
        const inputFields = formFields.map((field, index) => 
            <Input
                type={getFieldType(field.fieldName)}
                placeholder={getFieldPlaceholder(field.fieldName)}
                setState={setFieldValue}
                field={field.fieldName}
                isWrongFill={field.isWrongFill}
                testId={`${field.fieldName}-field`}
                value={form[field.fieldName] ?? ''}
                key={index}
            />
        )
        return <>{inputFields}</>
    }

    const renderSubmit = () => 
        <SubmitButton text={submitButtonText} testId='submit-form-button'/>

    return (
        <FormStyled onSubmit={(event) => handleSubmit(event, form)}>
            {renderFields()}
            {renderSubmit()}
        </FormStyled>
    )
}