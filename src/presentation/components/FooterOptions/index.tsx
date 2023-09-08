import { useMemo } from "react"
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useMode } from "@/presentation/hook"
import { Modes, Option } from "@/presentation/contexts"

import { AddNoteOptionStyled, DeleteModeOptionStyled, FooterOptionsStyled, RemoveNoteOptionStyled } from "./styles"

type OptionConfig = {
    IconSupport: typeof DeleteModeOptionStyled | typeof AddNoteOptionStyled | typeof RemoveNoteOptionStyled
    icon: typeof faTrash | typeof faPlus | typeof faMinus
    isActive: boolean
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
                icon: faTrash,
                isActive: mode === Modes.DeleteMode,
            },
            [Option.AddNote]: {
                IconSupport: AddNoteOptionStyled,
                icon: faPlus,
                isActive: false,
            },
            [Option.RemoveNote]: {
                IconSupport: RemoveNoteOptionStyled,
                icon: faMinus,
                isActive: false,
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
                isActive,
            } = getOptionConfig(option)
            return (
                <IconSupport
                    isActive={isActive}
                    onClick={() => handleModeByIconClick(option)}
                    key={index}
                >
                    <FontAwesomeIcon icon={icon}/>
                </IconSupport>
            )
        })
    }

    const renderActivetedOptionsListWithBackground = () => (
        <FooterOptionsStyled>
            {renderActivetedOptions()}
        </FooterOptionsStyled>
    )

    return isWithoutBackground
    ? <>{renderActivetedOptions()}</> 
    : renderActivetedOptionsListWithBackground()
}