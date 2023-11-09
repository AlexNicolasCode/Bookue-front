import { useContext } from 'react'

import { NoteContext } from '../contexts'

export const useNote = () => useContext(NoteContext)
