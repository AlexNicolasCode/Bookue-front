import { ReactNode, useEffect, useMemo, useState } from "react"

import { Alert } from "@/presentation/components"
import { AlertContext } from "./context"
import { AlertProps } from "./type"

type AlertProviderProps = {
    children: ReactNode
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
    const [alert, setAlert] = useState<AlertProps>() 
    const [isActiveAlert, setIsActiveAlert] = useState<boolean>(false)
    const isValidAlertState = useMemo(() => alert && alert.text && alert.type, [alert])
    
    useEffect(() => {
        if (isActiveAlert) {
            setTimeout(() => {
                setIsActiveAlert(false)
            }, 3000)
        }
    }, [isActiveAlert])
    
    useEffect(() => {
        setIsActiveAlert(true)
    }, [alert])

    const renderAlert = (): JSX.Element => {
        if (!isValidAlertState) return
        return (
            <Alert isActive={isActiveAlert} type={alert.type}>
                {alert.text}
            </Alert>
        )
    }

    return (
        <AlertContext.Provider value={{
            setAlert,
            setIsActiveAlert,
        }}>
            {children}
            {isActiveAlert && renderAlert()}
        </AlertContext.Provider>
    )
}