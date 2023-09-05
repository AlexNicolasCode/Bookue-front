import { useRouter } from "next/router"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons"

import { Logo } from "../Logo"

import { 
    AddBookButtonStyled,
    BackButtonStyled,
    HeaderStyled, 
} from "./styles"

export function Header() {
    const router = useRouter()

    const backToLastPage = () => {
        router.back()
    }

    const renderBackButton = () => {
        if (router.pathname !== '/') {
            return (
                <BackButtonStyled>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        onClick={backToLastPage}
                        data-test-id="header-back-book-button"
                    />
                </BackButtonStyled>
            )
        }
    }

    const renderAddBookButton = () => {
        if (router.pathname === '/') {
            return (
                <Link href={'/book/add'}>
                    <AddBookButtonStyled>
                        <FontAwesomeIcon
                            icon={faPlus}
                            data-test-id="header-add-book-button"
                        />
                    </AddBookButtonStyled>
                </Link>
            )
        }
    }

    return (
        <HeaderStyled>
            {renderBackButton()}
            <Logo/>
            {renderAddBookButton()}
        </HeaderStyled>
    )
}
