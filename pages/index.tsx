import { GetServerSideProps } from "next"

import { BookList, Header } from "@/presentation/components"
import { BookModel } from "@/domain/models"
import { makeLoadBooks } from "@/main/factory/usecases"

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
    const remoteLoadBooks = makeLoadBooks()
    const books = await remoteLoadBooks.loadBooks({ accessToken })
    return {
        props: {
            books,
        },
    }
}
  
export default HomePage