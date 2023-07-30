import { GetServerSideProps } from "next"

import { Header } from "@/presentation/components"

function BookPage() {
    return (
        <>
            <Header/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {},
    }
}

export default BookPage