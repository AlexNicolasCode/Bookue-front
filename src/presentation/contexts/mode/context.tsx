import { createContext } from "react";

import { Modes } from "./type";

type ModeContextData = {
    mode: Modes
    changeMode: (targetMode: Modes) => void
}

export const ModeContext = createContext({} as ModeContextData)