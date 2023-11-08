import { GetServerSideProps } from "next"

import { Header } from "@/presentation/components"

function BookNotesPage() {
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

export default BookNotesPage