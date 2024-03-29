import { ReactNode, useCallback, useRef, useState } from 'react'

import { ModeContext } from './context'
import { Modes } from './type'

type AlertProviderProps = {
  children: ReactNode
}

export const ModeProvider = ({ children }: AlertProviderProps) => {
  const [mode, setMode] = useState<Modes>(Modes.DefaultMode)
  const lastMode = useRef<Modes>()

  const changeMode = useCallback((targetMode: Modes) => {
    lastMode.current = mode
    setMode(mode !== targetMode ? targetMode : Modes.DefaultMode)
  }, [mode])

  return (
    <ModeContext.Provider
      value={{
        mode,
        changeMode,
        lastMode,
      }}
    >
      {children}
    </ModeContext.Provider>
  )
}
