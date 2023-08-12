import { ReactNode, useEffect, useState } from "react"

import { Alert } from "@/presentation/components"
import { AlertContext } from "./context"
import { AlertProps } from "./type"

type AlertProviderProps = {
    children: ReactNode
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
    const [alert, setAlert] = useState<AlertProps>() 
    const [isActiveAlert, setIsActiveAlert] = useState<boolean>(false)
    
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
            renderAlert,
        }}>
            {children}
        </AlertContext.Provider>
    )
}