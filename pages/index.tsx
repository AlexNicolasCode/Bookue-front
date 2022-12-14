import { GetServerSideProps } from "next"

import { BookList, Header } from "@/presentation/components"
import { BookModel } from "@/domain/models"

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

    const books = [
        {
            title: 'Scherlock Holmes',
            author: 'Scherlock Holmes',
            description: 'Scherlock Holmes',
            currentPage: 10,
            pages: 100,
        },
        {
            title: 'Scherlock Holmes',
            author: 'Scherlock Holmes',
            description: 'Scherlock Holmes',
            currentPage: 10,
            pages: 100,
        },
        {
            title: 'Scherlock Holmes',
            author: 'Scherlock Holmes',
            description: 'Scherlock Holmes',
            currentPage: 10,
            pages: 100,
        },
        {
            title: 'Scherlock Holmes',
            author: 'Scherlock Holmes',
            description: 'Scherlock Holmes',
            currentPage: 10,
            pages: 100,
        },
    ]

    return {
        props: {
            books,
        },
    }
}
  
export default HomePage