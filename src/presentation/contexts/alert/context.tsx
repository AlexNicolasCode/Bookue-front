import { Dispatch, createContext } from "react";

type AlertContextData = {
    setAlert: Dispatch<string>
    setIsActiveAlert: Dispatch<boolean>
    renderAlert: () => JSX.Element
}

export const AlertContext = createContext({} as AlertContextData)