import { useMemo } from "react"
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useMode } from "@/presentation/hook"
import { Modes, Option } from "@/presentation/contexts"

import { AddNoteOptionStyled, DeleteModeOptionStyled, FooterOptionsStyled, RemoveNoteOptionStyled } from "./styles"

type OptionConfig = {
    IconSupport: typeof DeleteModeOptionStyled | typeof AddNoteOptionStyled | typeof RemoveNoteOptionStyled
    icon: typeof faTrash | typeof faPlus | typeof faMinus
    testId?: string
}

type FooterOptionsProps = {
    options?: Option[]
    isWithoutBackground?: boolean
}

export function FooterOptions ({ isWithoutBackground, options }: FooterOptionsProps) {
    const { mode, changeMode } = useMode()

    const defaultOptions: Option[] = useMemo(() => {
        const optionsMapper = {
            [Modes.DeleteMode]: [Option.DeleteNote, Option.AddNote],
            [Modes.AddMode]: [Option.AddNote],
            [Modes.DefaultMode]: [Option.DeleteNote, Option.AddNote],
        }
        return optionsMapper[mode]
    }, [mode])

    const getOptionConfig = (option: Option): OptionConfig => {
        const optionConfigs = {
            [Option.DeleteNote]: {
                IconSupport: DeleteModeOptionStyled,
                testId: 'delete-mode-button',
                icon: faTrash,
            },
            [Option.AddNote]: {
                IconSupport: AddNoteOptionStyled,
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

    const renderAddNoteField = () => (
        <FooterOptionsStyled mode={Modes.AddMode}>
            {renderActivetedOptions()}
        </FooterOptionsStyled>
    )

    const renderDefaultMode = () => (
        <FooterOptionsStyled>
            {renderActivetedOptions()}
        </FooterOptionsStyled>
    )

    const renderWithoutBackground = () => (
        <>{renderActivetedOptions()}</>
    )

    const getRender = () => {
        const renderMapper = {
            [Modes.DefaultMode]: renderDefaultMode(),
            [Modes.AddMode]: renderAddNoteField(),
            ['withoutBackground']: renderWithoutBackground(),
        }
        return isWithoutBackground
            ? renderMapper['withoutBackground']
            : renderMapper[Modes.DefaultMode]
    }

    return getRender()
}