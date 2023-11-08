import { MutableRefObject, createContext } from "react";

import { Modes } from "./type";

type ModeContextData = {
    mode: Modes
    changeMode: (targetMode: Modes) => void
    lastMode: MutableRefObject<Modes>
}

export const ModeContext = createContext({} as ModeContextData)