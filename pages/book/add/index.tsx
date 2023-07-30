import { GetServerSideProps } from "next"

import { Header } from "@/presentation/components"
import { BookModel } from "@/domain/models"

export type AddBookPageProps = {
    book: BookModel
}

function AddBookPage({ book }: AddBookPageProps) {
    return (
        <>
            <Header/>
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
        props: {},
    }
}

export default AddBookPage