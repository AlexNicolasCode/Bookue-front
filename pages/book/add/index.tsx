import { FormEvent, useState } from "react"

import { Form, Header, Input, SubmitButton } from "@/presentation/components"

type BookField = {
    fieldName: string
    placeholder: string
    isWrongFill: boolean
    testId: string
    value: string
}

const fieldNames = ['title', 'author', 'currentPage', 'pages', 'description']

export default function AddBookPage() {
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

    const setField = (fieldName: string, value: string): void => {
        const updatedForm = form.map((field, index) => {
            if(field.fieldName === fieldName) {
                form[index].value = value
                return form[index]
            }
            return form[index]
        })
        setForm(updatedForm)
    }

    const renderFields = () => {
        const fields = form.map((field, index) => (
            <Input
                field={field.fieldName}
                type={getFieldType(field.fieldName)}
                placeholder={field.placeholder}
                isWrongFill={field.isWrongFill} 
                setState={setField}
                testId={field.testId}
                value={field.value}
                key={index}
            />
        ))
        return <>{fields}</>
    }

    const handleForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
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