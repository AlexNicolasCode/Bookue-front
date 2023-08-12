import { Dispatch, createContext } from "react";

import { AlertProps } from "./type";

type AlertContextData = {
    setAlert: Dispatch<AlertProps>
    setIsActiveAlert: Dispatch<boolean>
    renderAlert: () => JSX.Element
}

export const AlertContext = createContext({} as AlertContextData)