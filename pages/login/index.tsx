import { GetServerSideProps } from 'next'

import { UnloggedHeader, Login } from '@/presentation/components'

function LoginPage() {
  return (
    <>
      <UnloggedHeader />
      <Login />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  }
}

export default LoginPage
