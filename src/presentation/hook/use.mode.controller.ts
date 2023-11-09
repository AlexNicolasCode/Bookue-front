import { useContext } from 'react'

import { ModeContext } from '../contexts'

export const useModeController = () => useContext(ModeContext)
