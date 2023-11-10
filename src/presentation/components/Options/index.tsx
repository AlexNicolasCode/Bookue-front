import { useCallback, useEffect, useMemo, useState } from 'react'
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useModeController } from '@/presentation/hook'
import { Modes } from '@/presentation/contexts'

import {
  AddNoteOptionStyled,
  DeleteOptionStyled,
  OptionsStyled,
  RemoveNoteOptionStyled,
} from './styles'

export enum Option {
  DeleteNote,
  AddNote,
  RemoveNote,
}

type OptionsProps = {
  options: Option[]
  config?: {
    hasBackground?: boolean
    isFixedOptions?: boolean
  }
}

export function Options({ options, config }: OptionsProps) {
  const { mode, changeMode } = useModeController()
  const [activetedOptions, setActivetedOptions] = useState<Option[]>(options)

  useEffect(() => {
    if (!config?.isFixedOptions) {
      setActivetedOptions(currentOptions)
    }
  }, [mode])

  const currentOptions = useMemo(() => {
    const optionsMapper = {
      [Modes.DeleteMode]: [Option.DeleteNote],
      [Modes.AddMode]: [Option.AddNote],
      [Modes.DefaultMode]: options,
    }
    return optionsMapper[mode]
  }, [mode])

  const getOptionConfig = useCallback((option: Option) => {
    const optionConfigs = {
      [Option.DeleteNote]: {
        IconSupport: DeleteOptionStyled,
        testId: 'delete-mode-button',
        icon: faTrash,
        isActive: mode === Modes.DeleteMode,
      },
      [Option.AddNote]: {
        IconSupport: AddNoteOptionStyled,
        testId: 'add-mode-button',
        icon: faPlus,
        isActive: mode === Modes.AddMode,
      },
      [Option.RemoveNote]: {
        IconSupport: RemoveNoteOptionStyled,
        testId: 'remove-note-button',
        icon: faMinus,
        isActive: false,
      },
    }
    return optionConfigs[option]
  }, [mode])

  const handleMode = (option: Option) => {
    const modeMapper = {
      [Option.DeleteNote]: () => changeMode(Modes.DeleteMode),
      [Option.AddNote]: () => changeMode(Modes.AddMode),
      [Option.RemoveNote]: () => {},
    }
    modeMapper[option]()
  }

  const renderActivetedOptions = useCallback(() => {
    return activetedOptions.map((option, index) => {
      const { icon, IconSupport, isActive, testId } = getOptionConfig(option)
      return (
        <IconSupport
          isActive={isActive}
          data-test-id={`notes-${testId}`}
          onClick={() => handleMode(option)}
          key={index}
        >
          <FontAwesomeIcon icon={icon} />
        </IconSupport>
      )
    })
  }, [activetedOptions])

  const renderOptions = () => <OptionsStyled>{renderActivetedOptions()}</OptionsStyled>

  const getRender = () => {
    if (!config?.hasBackground) {
      return <>{renderActivetedOptions()}</>
    }
    return renderOptions()
  }

  return getRender()
}
