import { Dispatch, createContext } from "react";

import { AlertProps } from "./type";

type AlertContextData = {
    setNewAlert: Dispatch<AlertProps>
}

export const AlertContext = createContext({} as AlertContextData)