import { GetServerSideProps } from "next"

import { BookDetails, Header } from "@/presentation/components"
import { BookModel } from "@/domain/models"
import { makeCookieManagerAdapter } from "@/main/factory/cookie"

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

    const book: BookModel = {
        title: 'Scherlock Holmes',
        author: 'Scherlock Holmes',
        description: 'Scherlock Holmes',
        currentPage: 10,
        pages: 1240,
    }

    return {
        props: {
            book,
        },
    }
}

export default AddBookPage