import { FormEvent } from "react"
import { GetServerSideProps } from "next"

import { Header, Input, Form, Container, SubmitButton, Text } from "@/presentation/components"
import { useBookForm } from "@/presentation/hooks"

function AddBookCurrentPagePage() {
    const { bookForm, setField } = useBookForm()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
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