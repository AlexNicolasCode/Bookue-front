import { useMemo } from "react"
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useModeController } from "@/presentation/hook"
import { Modes, Option } from "@/presentation/contexts"

import { AddNoteOptionStyled, DeleteModeOptionStyled, OptionsStyled, RemoveNoteOptionStyled } from "./styles"

type OptionsProps = {
    options?: Option[]
    config?: {
        hasBackground?: boolean
    }
}

export function Options ({ options, config: { hasBackground } }: OptionsProps) {
    const { mode, changeMode } = useModeController()

    const defaultOptions = useMemo(() => {
        const optionsMapper = {
            [Modes.DeleteMode]: [Option.DeleteNote, Option.AddNote],
            [Modes.AddMode]: [Option.AddNote],
            [Modes.DefaultMode]: [Option.DeleteNote, Option.AddNote],
        }
        return optionsMapper[mode]
    }, [mode])

    const getOptionConfig = (option: Option) => {
        const optionConfigs = {
            [Option.DeleteNote]: {
                IconSupport: DeleteModeOptionStyled,
                testId: 'delete-mode-button',
                icon: faTrash,
            },
            [Option.AddNote]: {
                IconSupport: AddNoteOptionStyled,
                testId: 'add-mode-button',
                icon: faPlus,
            },
            [Option.RemoveNote]: {
                IconSupport: RemoveNoteOptionStyled,
                testId: 'remove-note-button',
                icon: faMinus,
            },
        }
        return optionConfigs[option]
    }

    const handleModeByIconClick = (option: Option) => {
        const modeMapper = {
            [Option.DeleteNote]: () => changeMode(Modes.DeleteMode),
            [Option.AddNote]: () => changeMode(Modes.AddMode),
            [Option.RemoveNote]: () => {},
        }
        modeMapper[option]()
    }

    const renderActivetedOptions = () => {
        let optionsSelected = options ?? defaultOptions
        return optionsSelected.map((option, index) => {
            const {
                icon,  
                IconSupport,
                testId,
            } = getOptionConfig(option)
            return (
                <IconSupport
                    mode={mode}
                    data-test-id={`notes-${testId}`}
                    onClick={() => handleModeByIconClick(option)}
                    key={index}
                >
                    <FontAwesomeIcon icon={icon}/>
                </IconSupport>
            )
        })
    }

    const renderOptionsByMode = (mode: Modes) => (
        <OptionsStyled mode={mode}>
            {renderActivetedOptions()}
        </OptionsStyled>
    )

    const getRender = () => {
        if (!hasBackground) {
            return <>{renderActivetedOptions()}</>
        }
        return renderOptionsByMode(mode)
    }

    return getRender()
}