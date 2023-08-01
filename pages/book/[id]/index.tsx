import { GetServerSideProps } from "next"

import { BookModel } from "@/domain/models"
import { BookDetails, Header } from "@/presentation/components"
import { makeRemoteLoadBook } from "@/main/factory/usecases"
import { makeEditBookValidation } from "@/main/factory/validation"
import { ValidationComposite } from "@/main/composites"

type PageProps = {
    book: BookModel
    validator: ValidationComposite
}

function BookPage({ book, validator = makeEditBookValidation() }: PageProps) {
    return (
        <>
            <Header/>
            <BookDetails book={book} validator={validator} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const accessToken = context.req.cookies['bookue-user']
    const bookId = context.params['id'].toString()
    const remoteLoadBook = makeRemoteLoadBook()
    try {
        const book = await remoteLoadBook.loadBook({ accessToken, bookId })
        return {
            props: {
                book,
            },
        }
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
}

export default BookPage