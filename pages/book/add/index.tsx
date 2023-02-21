import { FormEvent } from "react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

import { Header, Input, Form, Container, SubmitButton, Text } from "@/presentation/components"
import { useBookForm } from "@/presentation/hooks"

function AddBookPage() {
    const { bookForm, setField } = useBookForm()
    const router = useRouter()

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

    const goToCurrentPageScreen = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        router.push('/book/add/current-page')
    }

    const renderInputFields = (): any => formFields.map((field, index) => (
        <Input
            type="text"
            field={field.fieldName}
            placeholder={field.placeholder}
            isWrongFill={false}
            setState={setField}
            value={bookForm[field.fieldName].text}
            key={index}
        />
    ))
    
    const renderAddBookForm = () => (
        <Form onSubmit={goToCurrentPageScreen}>
            {renderInputFields()}
            <SubmitButton text={'Next'} />
        </Form>
    )

    return (
        <>
            <Header/>

            <Container>
                {renderAddBookForm()}
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