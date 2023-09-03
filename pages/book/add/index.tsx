import { FormEvent, useState } from "react"

import { Form, Header, Input, SubmitButton } from "@/presentation/components"
import { makeAddBookValidation } from "@/main/factory/validation"
import { useAlert } from "@/presentation/hook"
import { AlertType } from "@/presentation/contexts"

type BookField = {
    fieldName: string
    placeholder: string
    isWrongFill: boolean
    testId: string
    value: string
}

const fieldNames = ['title', 'author', 'currentPage', 'pages', 'description']

export default function AddBookPage() {
    const { setNewAlert } = useAlert()
    const [form, setForm] = useState<BookField[]>(
        fieldNames.map((fieldName) => ({
            fieldName: fieldName,
            placeholder: fieldName,
            isWrongFill: false,
            value: '',
            testId: `book-add-${fieldName}-field`,
        }))
    )

    const getFieldType = (fieldName: string) => {
        const fieldNameLowCase = fieldName.toLowerCase()
        const isPageField = /page/.test(fieldNameLowCase)
        return isPageField ? 'number' : 'text'
    }

    const cleanIsWrongFillParams = () => {
        const updatedForm = form.map((field, index) => {
            form[index].isWrongFill = false
            return form[index]
        })
        setForm(updatedForm)
    }

    const getUpdatedForm = (fieldName: string, targetField: string, value: string | boolean) => 
        form.map((field, index) => {
            if(field.fieldName === fieldName) {
                form[index][targetField] = value
                return form[index]
            }
            return form[index]
        })

    const activeFieldIsWrongFill = (fieldName: string): void => {
        const updatedForm = getUpdatedForm(fieldName, 'isWrongFill', true)
        setForm(updatedForm)
    }

    const setFieldValue = (fieldName: string, value: string | boolean): void => {
        const updatedForm = getUpdatedForm(fieldName, 'value', value)
        setForm(updatedForm)
    }

    const renderFields = () => {
        const fields = form.map((field, index) => (
            <Input
                field={field.fieldName}
                type={getFieldType(field.fieldName)}
                placeholder={field.placeholder}
                isWrongFill={field.isWrongFill} 
                setState={setFieldValue}
                testId={field.testId}
                value={field.value}
                key={index}
            />
        ))
        return <>{fields}</>
    }

    const validateForm = () => {
        cleanIsWrongFillParams()
        const fieldTexts = {}
        form.forEach(
            (field) =>
            fieldTexts[field.fieldName] = field.value
        )
        const errors = fieldNames.map((fieldName) => {
            const validator = makeAddBookValidation()
            const error = validator.validate(
                fieldName,
                fieldTexts,
            )
            if (error) {
                return { fieldName, message: error }
            }
        })
        const firstError = errors.find((error) => error)
        return firstError
    }

    const handleForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const error = validateForm()
        if (error) {
            activeFieldIsWrongFill(error.fieldName)
            setNewAlert({ text: error.message, type: AlertType.error })
            return            
        }
    }

    return (
        <>
            <Header/>
            <Form onSubmit={handleForm}>
                {renderFields()}
                <SubmitButton text={'Save'} testId="book-add-submit-form"/>
            </Form>
        </>
    )
}