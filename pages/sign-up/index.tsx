import { GetServerSideProps } from 'next'

import { UnloggedHeader, Register } from '@/presentation/components'

function SignUpPage() {
  return (
    <>
      <UnloggedHeader />
      <Register />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  }
}

export default SignUpPage
