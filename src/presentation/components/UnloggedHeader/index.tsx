import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

import { ButtonBorderStyled, HeaderStyled } from './styles'

function UnloggedHeader() {
  const router = useRouter()

  const goToLoginPage = useCallback(() => {
    router.push('/login')
  }, [router])

  const goToSignUpPage = useCallback(() => {
    router.push('/sign-up')
  }, [router])

  const unloggedHeaderConfig = useMemo(() => {
    if (router.pathname === '/sign-up') {
      return {
        textButton: 'Login',
        redirectFunction: goToLoginPage,
        testId: 'login-button',
      }
    }
    if (router.pathname === '/login') {
      return {
        textButton: 'Sign up',
        redirectFunction: goToSignUpPage,
        testId: 'sign-up-button',
      }
    }
  }, [router.pathname])

  return (
    <HeaderStyled>
      <ButtonBorderStyled
        onClick={() => unloggedHeaderConfig.redirectFunction()}
        data-test-id={unloggedHeaderConfig.testId}
      >
        {unloggedHeaderConfig.textButton}
      </ButtonBorderStyled>
    </HeaderStyled>
  )
}

export { UnloggedHeader }
