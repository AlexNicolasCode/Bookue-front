import { ReactNode, useState } from "react"

import { ModeContext } from "./context"
import { Modes } from "./type"

type AlertProviderProps = {
    children: ReactNode
}

export const ModeProvider = ({ children }: AlertProviderProps) => {   
    const [mode, setMode] = useState<Modes>(Modes.DefaultMode)

    const changeMode = (targetMode: Modes) => {
        setMode(mode !== targetMode ? targetMode : Modes.DefaultMode)
    }
    
    return (
        <ModeContext.Provider value={{
            mode,
            changeMode,
        }}>
            {children}
        </ModeContext.Provider>
    )
}