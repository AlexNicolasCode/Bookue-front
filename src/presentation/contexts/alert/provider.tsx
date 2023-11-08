import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { Alert } from "@/presentation/components"
import { AlertContext } from "./context"
import { AlertProps } from "./type"
import { useTextConverter } from "@/presentation/hook"

type AlertProviderProps = {
    children: ReactNode
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
    const router = useRouter()
    const { normalizeContent } = useTextConverter()
    const [alerts, setAlerts] = useState<AlertProps[]>([])

    useEffect(() => {
        cleanAlerts()
    }, [router.pathname])

    const cleanAlerts = (): void => {
        setAlerts([])
    }

    const setNewAlert = (alert: AlertProps): void => {
        const hasEqualAlert = alerts.some(
            (alertMapped) =>
            alertMapped.text === alert.text && alertMapped.type === alert.type
        );
        if (!hasEqualAlert) {
            setAlerts([...alerts, alert])
            setAlertTimeout(alert)
        }
    }

    const setAlertTimeout = (alert: AlertProps): void => {
        const animationTime = 14500
        setTimeout(() => {
            const filteredAlerts = alerts.filter((alertMapped) => alertMapped != alert);
            setAlerts(filteredAlerts)
        }, animationTime)
    }

    const renderAlert = (alert: AlertProps, key: number): JSX.Element => {
        if (!alert) return
        return (
            <Alert type={alert.type} key={key}>
                {normalizeContent(alert.text)}
            </Alert>
        )
    }
    
    return (
        <AlertContext.Provider value={{setNewAlert}}>
            {children}
            {alerts.map((alert, index) =>
                renderAlert(alert, index)
            )}
        </AlertContext.Provider>
    )
}