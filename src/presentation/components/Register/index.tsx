import { useRouter } from "next/router"
import { FormEvent, useState } from "react"

import { makeRemoteAddAccount } from "@/main/factory/usecases"
import { makeCookieManagerAdapter } from "@/main/factory/cookie"
import { makeRegisterValidation } from "@/main/factory/validation"
import { useAlert } from "@/presentation/hook"
import { AlertType } from "@/presentation/contexts"

import {
    Form,
    Input,
    Logo,
    SubmitButton,
} from "@/presentation/components"

import { RegisterStyled } from "./styled"

type FieldNames = 'name' | 'email' | 'password' | 'passwordConfirmation'
type FieldTypes = 'name' | 'email' | 'password'

type RegisterFormProps = {
    [field in FieldNames]: {
        fieldName: FieldNames
        isWrongFill: boolean
        text: string
        placeholder: string
        type: FieldTypes
        testId: string
    }
}

function Register() {
    const router = useRouter()
    const { setNewAlert } = useAlert()

    const fieldNames: FieldNames[] = ['name', 'email', 'password', 'passwordConfirmation']
    const [userForm, setUserForm] = useState<RegisterFormProps>({
        name: {
            fieldName: "name",
            isWrongFill: false,
            text: "",
            type: "name",
            placeholder: "First name",
            testId: "sign-up-name",
        },
        email: {
            fieldName: "email",
            isWrongFill: false,
            text: "",
            type: "email",
            placeholder: "Email",
            testId: "sign-up-email",
        },
        password: {
            fieldName: "password",
            isWrongFill: false,
            text: "",
            type: "password",
            placeholder: "Password",
            testId: "sign-up-password",
        },
        passwordConfirmation: {
            fieldName: "passwordConfirmation",
            isWrongFill: false,
            text: "",
            type: "password",
            placeholder: "Password confirmation",
            testId: "sign-up-password-confirmation",
        },
    })
    
    const setField = (field, text: string) => setUserForm({ 
        ...userForm,
        [field]: {
            ...userForm[field],
            text: text,
        },
    })

    const validateForm = (): string => {
        const fieldTexts = {}
        fieldNames.forEach((fieldName: string) => fieldTexts[fieldName] = userForm[fieldName].text)
        const validator = makeRegisterValidation()
        const errorList = fieldNames.map((field: string) => {
            const error = validator.validate(
                field,
                fieldTexts,
            )
            return { field, error }
        })
        const firstError = errorList.find((error) => error.error !== undefined)
        if (firstError && firstError.error) {
            setWrongFields(firstError.field)
            return firstError.error
        } 
    }

    const setWrongFields = (field: string) => {
        const cleanUserForm = getCleanUserForm()
        setUserForm({
            ...cleanUserForm,
            [field]: {
                ...cleanUserForm[field],
                isWrongFill: true,
            },
        })
    }

    const getCleanUserForm = () => {
        let cleannedUserForm: RegisterFormProps = { ...userForm }
        fieldNames.forEach((fieldName) => {
            if (cleannedUserForm[fieldName].isWrongFill) {
                cleannedUserForm[fieldName].isWrongFill = false
            }
        })
        return cleannedUserForm
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            const error = validateForm()
            if (error) {
                setNewAlert({ text: error, type: AlertType.error })
                return
            }
            const remoteAddAccount = makeRemoteAddAccount()
            const { accessToken } = await remoteAddAccount.add({
                name: userForm.name.text,
                email: userForm.email.text,
                password: userForm.password.text,
                passwordConfirmation: userForm.passwordConfirmation.text,
            })
            await setJwtLocaly(accessToken)
            goToFeedPage()
        } catch (error) {
            if (error.message.includes('email')) {
                setWrongFields('email')
            }
            setNewAlert({ text: 'Internal Server Error', type: AlertType.error })
        }
    }

    const setJwtLocaly = async (accessToken: string): Promise<void> => {
        const cookieManager = makeCookieManagerAdapter()
        await cookieManager.set('bookue-user', accessToken)
    }

    const goToFeedPage = () => {
        router.push("/")
    }

    const renderFormFields = () => {
        const fields = fieldNames.map((field: FieldNames, index: number) => (
            <Input 
                type={userForm[field].type}
                placeholder={userForm[field].placeholder}
                setState={setField}
                field={userForm[field].fieldName}
                isWrongFill={userForm[field].isWrongFill}
                testId={userForm[field].testId}
                value={userForm[field].text}
                key={index}
            />
        ))
        return <>{fields}</>
    }
    
    return (
        <RegisterStyled>
            <Logo/>
            <Form onSubmit={handleSubmit}>
                {renderFormFields()}
                <SubmitButton text={'Register'} testId="sign-up-submit-form"/>
            </Form>
        </RegisterStyled>
    )
}

export { Register }