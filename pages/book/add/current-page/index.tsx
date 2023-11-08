import { FormEvent, useState } from "react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

import { Header, Input, Form, Container, SubmitButton, Text, Alert } from "@/presentation/components"
import { useBookForm } from "@/presentation/hooks"
import { makeRemoteAddBook } from "@/main/factory/usecases"

function AddBookCurrentPagePage() {
    const router = useRouter()
    const { bookForm, setField } = useBookForm()
    const [alert, setAlert] = useState<string>()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            const addBook = makeRemoteAddBook()
            await addBook.add({
                title: bookForm.title.text,
                author: bookForm.author.text,
                currentPage: Number(bookForm.currentPage.text) ?? 0,
                description: bookForm.description.text,
                pages: Number(bookForm.pages.text),
            })
            goToHomePageScreen()
        } catch (error) {
            setAlert(error.message)
        }
    }

    const goToHomePageScreen = async (): Promise<void> => {
        router.push('/')
    }
    
    const renderCurrentPageForm = () => (
        <Form onSubmit={handleSubmit}>
            <Input
                type="number"
                field={'currentPage'}
                placeholder={'Set current page (Optional)'}
                isWrongFill={false}
                setState={setField}
                value={bookForm.currentPage.text}
                max={bookForm.pages.text}
            />
            <Container flex smallMarginTop>
                <SubmitButton text={'Save'} />
                <Text text="Skip" />
            </Container>
        </Form>
    )

    return (
        <>
            <Header/>

            <Container>
                {renderCurrentPageForm()}
            </Container>

            <Container centralize>
                {alert &&
                    <Alert>{alert}</Alert>
                }
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

export default AddBookCurrentPagePage