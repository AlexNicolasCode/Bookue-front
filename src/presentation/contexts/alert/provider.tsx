import { ReactNode, useEffect, useState } from "react"

import { Alert } from "@/presentation/components"
import { AlertContext } from "./context"
import { AlertProps } from "./type"

type AlertProviderProps = {
    children: ReactNode
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
    const [alerts, setAlerts] = useState<AlertProps[]>([])

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
        const animationTime = 15000
        setTimeout(() => {
            const filteredAlerts = alerts.filter((alertMapped) => alertMapped != alert);
            setAlerts(filteredAlerts)
        }, animationTime)
    }

    const renderAlert = (alert: AlertProps, key: number): JSX.Element => {
        if (!alert) return
        return (
            <Alert type={alert.type} key={key}>
                {alert.text}
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