import { useRouter } from "next/router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons'

import { 
    AddBookButtonStyled,
    BackButtonStyled,
    HeaderStyled, 
    LogoStyled, 
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
                    />
                </BackButtonStyled>
            )
        }
    }

    const goToAddBookPage = () => {
        router.push('/book/add')
    }

    const renderAddBookButton = () => {
        if (router.pathname === '/') {
            return (
                <AddBookButtonStyled>
                    <FontAwesomeIcon
                        icon={faPlus}
                        onClick={goToAddBookPage}
                    />
                </AddBookButtonStyled>
            )
        }
    }

    return (
        <HeaderStyled>
            {renderBackButton()}
            
            <LogoStyled>
                Bookue
            </LogoStyled>

            {renderAddBookButton()}
        </HeaderStyled>
    )
}
