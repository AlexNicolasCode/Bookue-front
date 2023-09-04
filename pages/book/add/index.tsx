import { FormEvent, useState } from "react"
import { useRouter } from "next/router"

import { Form, Header } from "@/presentation/components"
import { makeAddBookValidation } from "@/main/factory/validation"
import { useAlert } from "@/presentation/hook"
import { AlertMessage, AlertType } from "@/presentation/contexts"
import { makeRemoteAddBook } from "@/main/factory/usecases"

type Form = {
    title: string
    author: string
    currentPage: string
    pages: string
    description: string
}

export default function AddBookPage() {
    const router = useRouter()
    const { setNewAlert } = useAlert()
    const [wrongField, setWrongField] = useState<string>()
    
    const formFields = ['title', 'author', 'currentPage', 'pages', 'description']

    const validateForm = (form: Form) => {
        const errors = formFields.map((fieldName) => {
            const validator = makeAddBookValidation()
            const error = validator.validate(
                fieldName,
                form,
            )
            if (error) {
                return { fieldName, message: error }
            }
        })
        const firstError = errors.find((error) => error)
        return firstError
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>, form: Form) => {
        event.preventDefault()
        try {
            const error = validateForm(form)
            if (error) {
                setWrongField(error.fieldName)
                setNewAlert({ text: error.message, type: AlertType.Error })
                return
            }
            const remoteAddBook = makeRemoteAddBook()
            await remoteAddBook.add(form)
            router.push('/')
        } catch (error) {
            if (error.message.includes('email')) {
                setWrongField('email')
            }
            setNewAlert({ text: AlertMessage.GenericError, type: AlertType.Error })
        }
    }

    return (
        <>
            <Header/>
            <Form
                handleSubmit={handleSubmit}
                fields={formFields}
                wrongField={wrongField}
            />
        </>
    )
}