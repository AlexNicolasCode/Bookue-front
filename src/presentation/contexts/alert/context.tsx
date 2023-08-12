import { Dispatch, createContext } from "react";

import { AlertProps } from "./type";

type AlertContextData = {
    setAlert: Dispatch<AlertProps>
    setIsActiveAlert: Dispatch<boolean>
}

export const AlertContext = createContext({} as AlertContextData)