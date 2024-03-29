import { FormEvent, memo, useCallback, useEffect, useState } from 'react'

import { Input, SubmitButton } from '@/presentation/components'

import { FormStyled } from './styles'

type SetFieldValueParams = {
  fieldName: string
  text: string
}

type FormProp = {
  [fieldName: string]: string
}

type FormComponentProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>, form: FormProp) => Promise<void>
  fields: string[]
  wrongField?: string
  submitButtonText:
    | string
    | {
        align: 'left' | 'right'
        text: string
      }
}

const FormComponet = ({
  handleSubmit,
  fields,
  wrongField,
  submitButtonText,
}: FormComponentProps) => {
  const [form, setForm] = useState<FormProp>({})
  const [formFields, setFormFields] = useState(
    fields.map((fieldName) => ({
      fieldName,
      isWrongFill: false,
    }))
  )

  useEffect(() => {
    if (wrongField) {
      activeFieldIsWrongFill(wrongField)
    } else {
      cleanwrongFields()
    }
  }, [wrongField])

  const getFieldPlaceholder = (fieldName: string): string => {
    const placeholderMapper = {
      name: 'Ex: Bob Bookue',
      email: 'Ex: bookue@gmail.com',
      password: 'Ex: BookueLovePotato',
      passwordConfirmation: 'Ex: BookueLovePotato',
      title: 'Ex: Welcome to the Bookue',
      author: 'Ex: Bookue Lispector',
      currentPage: 'Ex: 10',
      pages: 'Ex: 100',
      description: 'Ex: This is a Bookue book',
    }
    return placeholderMapper[fieldName]
  }

  const getFieldType = (fieldName: string): string => {
    const fieldNameLowCase = fieldName.toLowerCase()
    const isPageField = /page/.test(fieldNameLowCase)
    if (isPageField) {
      return 'number'
    }
    const isPasswordField = /password/.test(fieldNameLowCase)
    if (isPasswordField) {
      return 'password'
    }
    const isEmailField = /email/.test(fieldNameLowCase)
    if (isEmailField) {
      return 'email'
    }
    return 'text'
  }

  const cleanwrongFields = useCallback(() => {
    const updatedFields = formFields.map((field) => ({
      ...field,
      isWrongFill: false,
    }))
    setFormFields(updatedFields)
  }, [formFields])

  const getUpdatedFields = useCallback((fieldName: string, targetField: string, value: string | boolean) => {
    return formFields.map((field, index) => {
      if (field.fieldName === fieldName) {
        formFields[index][targetField] = value
        return formFields[index]
      }
      return formFields[index]
    })
  }, [formFields])

  const activeFieldIsWrongFill = (fieldName: string): void => {
    const updatedForm = getUpdatedFields(fieldName, 'isWrongFill', true)
    setFormFields(updatedForm)
  }

  const setFieldValue = useCallback(({ fieldName, text }: SetFieldValueParams): void => {
    setForm({
      ...form,
      [fieldName]: text,
    })
  }, [form])

  const getSubmitButtonText = useCallback(() =>
    typeof submitButtonText === 'string' ? submitButtonText : submitButtonText.text
  , [submitButtonText])

  const getSubmitButtonAlign = useCallback(() =>
    typeof submitButtonText !== 'string' ? submitButtonText.align : null
  , [submitButtonText])

  const renderFields = useCallback((): JSX.Element => {
    const inputFields = formFields.map(({ fieldName, isWrongFill }, index) => {
      const fieldType = getFieldType(fieldName)
      const fieldPlaceholder = getFieldPlaceholder(fieldName)
      const min = fieldType === 'number' ? 0 : null
      return (
        <Input
          type={fieldType}
          placeholder={fieldPlaceholder}
          setStateWithFieldName={setFieldValue}
          fieldName={fieldName}
          min={min}
          isWrongFill={isWrongFill}
          testId={`${fieldName}-field`}
          value={form[fieldName] ?? ''}
          key={index}
        />
      )
    })
    return <>{inputFields}</>
  }, [form, formFields])

  const renderSubmit = () => (
    <SubmitButton
      align={getSubmitButtonAlign()}
      text={getSubmitButtonText()}
      testId='submit-form-button'
    />
  )

  return (
    <FormStyled onSubmit={(event) => handleSubmit(event, form)}>
      {renderFields()}
      {renderSubmit()}
    </FormStyled>
  )
}

export const Form = memo(FormComponet)
