import { GetServerSideProps } from "next"

import { BookDetails, Header } from "@/presentation/components"
import { makeCookieManagerAdapter } from "@/main/factory/cookie"
import { BookModel } from "@/domain/models"

export type AddBookPageProps = {
    book: BookModel
}

function AddBookPage({ book }: AddBookPageProps) {
    return (
        <>
            <Header/>
            <BookDetails book={book} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookieManager = makeCookieManagerAdapter()
    const token = await cookieManager.load('bookue-user')
    if (!token) {
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