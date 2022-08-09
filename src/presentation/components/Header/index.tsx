import { useRouter } from "next/router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { 
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
        if (router.pathname === '/') {
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

    return (
        <HeaderStyled>
            {renderBackButton()}
            
            <LogoStyled>
                Bookue
            </LogoStyled>

            {renderBackButton()}
        </HeaderStyled>
    )
}
