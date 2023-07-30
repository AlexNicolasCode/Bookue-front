import { GetServerSideProps } from "next"

import { BookList, Header } from "@/presentation/components"
import { BookModel } from "@/domain/models"
import { makeRemoteLoadBooks } from "@/main/factory/usecases"

type HomePageProps = {
    books: BookModel[]
}

function HomePage({ books }: HomePageProps) {
    return (
        <>
            <Header />
            <BookList books={books} />
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
    const remoteLoadBooks = makeRemoteLoadBooks()
    const books = await remoteLoadBooks.loadBooks({ accessToken })
    return {
        props: {
            books,
        },
    }
}
  
export default HomePage