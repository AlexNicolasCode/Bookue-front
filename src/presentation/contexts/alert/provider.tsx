import { Alert } from "@/presentation/components"
import { ReactNode, useEffect, useState } from "react"

import { AlertContext } from "./context"

type AlertProps = {
    children: ReactNode
}

export const AlertProvider = ({ children }: AlertProps) => {
    const [alert, setAlert] = useState<string>("") 
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
            <Alert isActive={isActiveAlert}>
                {alert}
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