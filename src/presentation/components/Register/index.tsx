import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import { makeAddAccount } from '@/main/factory/usecases'
import { makeCookieManagerAdapter } from '@/main/factory/cookie'
import { makeRegisterValidation } from '@/main/factory/validation'
import { useAlert } from '@/presentation/hook'
import { AlertMessage, AlertType } from '@/presentation/contexts'
import { Form, Logo } from '@/presentation/components'

import { RegisterStyled } from './styled'

type Form = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export function Register() {
  const router = useRouter()
  const { setNewAlert } = useAlert()
  const [wrongField, setWrongField] = useState<string>()

  const formFields = ['name', 'email', 'password', 'passwordConfirmation']

  const validateForm = (form: Form): string => {
    const validator = makeRegisterValidation()
    const errorList = formFields.map((fieldName) => {
      const error = validator.validate(fieldName, form)
      return { fieldName, error }
    })
    const firstError = errorList.find((error) => error.error !== undefined)
    if (firstError && firstError.error) {
      setWrongField(firstError.fieldName)
      return firstError.error
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>, form: Form): Promise<void> => {
    event.preventDefault()
    try {
      const error = validateForm(form)
      if (error) {
        setNewAlert({ text: error, type: AlertType.Error })
        return
      }
      const remoteAddAccount = makeAddAccount()
      const { accessToken } = await remoteAddAccount.add(form)
      await setJwtLocaly(accessToken)
      goToFeedPage()
    } catch (error) {
      if (error.message.includes('email')) {
        setWrongField('email')
      }
      setNewAlert({ text: AlertMessage.GenericError, type: AlertType.Error })
    }
  }

  const setJwtLocaly = async (accessToken: string): Promise<void> => {
    const cookieManager = makeCookieManagerAdapter()
    await cookieManager.set('bookue-user', accessToken)
  }

  const goToFeedPage = () => {
    router.push('/')
  }

  return (
    <RegisterStyled>
      <Logo />
      <Form
        handleSubmit={handleSubmit}
        fields={formFields}
        wrongField={wrongField}
        submitButtonText='Sign up'
      />
    </RegisterStyled>
  )
}
