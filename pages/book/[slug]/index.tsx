import { GetServerSideProps } from "next"

import { Header } from "@/presentation/components"

function BookPage() {
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

export default BookPage