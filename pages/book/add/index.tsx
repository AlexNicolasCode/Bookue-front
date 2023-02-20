import { FormEvent, useState } from "react"
import { GetServerSideProps } from "next"

import { Header, Input, Form, Container, SubmitButton } from "@/presentation/components"

type BookForm = {
    [x: string]: {
        text: string
    }
}

function AddBookPage() {
    const formFields = [
        {
            fieldName: "title",
            placeholder: "What's book name?",
        },
        {
            fieldName: "author",
            placeholder: "Who write this book?",
        },
        {
            fieldName: "pages",
            placeholder: "How much pages?",
        },
        {
            fieldName: "description",
            placeholder: "Describe this book (Optional)",
        },
    ]

    const [bookForm, setBookForm] = useState<BookForm>({
        title: {
            text: ''
        },
        author: {
            text: ''
        },
        pages: {
            text: ''
        },
        description: {
            text: ''
        },
    })

    const setField = (field, text: string) => setBookForm({ 
        ...bookForm,
        [field]: {
            text: text
        },
    })

    const handleToCurrentPageStep = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
    }

    const renderInputFields = (): any => formFields.map((field) => (
        <Input
            type="text"
            field={field.fieldName}
            placeholder={field.placeholder}
            isWrongFill={false}
            setState={setField}
            value={bookForm[field.fieldName].text}
        />
    ))

    return (
        <>
            <Header/>

            <Container>
                <Form onSubmit={handleToCurrentPageStep}>
                    {renderInputFields()}
                    <SubmitButton text={'Next'} />
                </Form>
            </Container>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const accessToken = context.req.cookies['bookue-user']
    if (!accessToken) {
        return {
            props: {},
            redirect: {
                destination: '/login'
            }
        }
    }
    return {
        props: {}
    }
}

export default AddBookPage