import { useRouter } from "next/router"
import { FormEvent, useState } from "react"

import {
    Form,
    Input,
    Logo,
    Alert,
    SubmitButton,
} from "@/presentation/components"

import { RegisterStyled } from "./styled"

import { makeRemoteAddAccount } from "@/main/factory/usecases"
import { makeCookieManagerAdapter } from "@/main/factory/cookie"
import { ValidationComposite } from "@/main/composites"

type RegisterProps = {
    validation: ValidationComposite
}

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

function Register({ validation }: RegisterProps) {
    const router = useRouter()
    
    const fieldNames: FieldNames[] = ['name', 'email', 'password', 'passwordConfirmation']
    const [alert, setAlert] = useState<string>("")
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
        const errorList = fieldNames.map((field: string) => {
            const error = validation.validate(
                field,
                fieldTexts,
            )
            setWrongFields(field, error)
            return error
        })
        return errorList.find((error: string) => error !== undefined)
    }

    const setWrongFields = (field: string, error: string) => {
        setUserForm({
            ...userForm,
            [field]: {
                ...userForm[field],
                isWrongFill: error ? true : false,
            },
        })
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            const error = validateForm()
            if (error) {
                setAlert(error)
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
                setWrongFields('email', error.message)
            }
            setAlert(error.message)
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

    const renderAlert = () => {
        if (alert.length > 0) {
            return <Alert testId="sign-up-alert">
                {alert}                
            </Alert>
        }
    }
    
    return (
        <RegisterStyled>
            <Logo/>
            <Form onSubmit={handleSubmit}>
                {renderFormFields()}
                {renderAlert()}
                <SubmitButton text={'Register'} testId="sign-up-submit-form"/>
            </Form>
        </RegisterStyled>
    )
}

export { Register }