import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { AddNoteOptionStyled, DeleteModeOptionStyled, FooterOptionsStyled, RemoveNoteOptionStyled } from "./styles"

type OptionConfig = {
    IconSupport: typeof DeleteModeOptionStyled | typeof AddNoteOptionStyled | typeof RemoveNoteOptionStyled
    icon: typeof faTrash | typeof faPlus | typeof faMinus
    isActive: boolean
}

export enum OptionName {
    DeleteMode,
    AddNote,
    RemoveNote,
}

export enum Modes {
    Default,
    DeleteMode,
    AddMode,
}

type FooterOptionsProps = {
    options: OptionName[]
    mode: Modes
    handleMethod: (option: OptionName) => void
    isWithoutBackground?: boolean
}

export function FooterOptions ({ options, mode, handleMethod, isWithoutBackground }: FooterOptionsProps) {
    const getOptionConfig = (optionName: OptionName): OptionConfig => {
        const optionConfigs = {
            [OptionName.DeleteMode]: {
                IconSupport: DeleteModeOptionStyled,
                icon: faTrash,
                isActive: mode === Modes.DeleteMode,
            },
            [OptionName.AddNote]: {
                IconSupport: AddNoteOptionStyled,
                icon: faPlus,
                isActive: false,
            },
            [OptionName.RemoveNote]: {
                IconSupport: RemoveNoteOptionStyled,
                icon: faMinus,
                isActive: false,
            },
        }
        return optionConfigs[optionName]
    }

    const renderActivetedOptions = () =>
        options.map((optionName, index) => {
            const {
                icon,  
                IconSupport,
                isActive,
            } = getOptionConfig(optionName)
            return (
                <IconSupport
                    isActive={isActive}
                    onClick={() => handleMethod(optionName)}
                    key={index}
                >
                    <FontAwesomeIcon icon={icon}/>
                </IconSupport>
            )
        })

    const renderActivetedOptionsListWithBackground = () => (
        <FooterOptionsStyled>
            {renderActivetedOptions()}
        </FooterOptionsStyled>
    )

    return isWithoutBackground
    ? <>{renderActivetedOptions()}</> 
    : renderActivetedOptionsListWithBackground()
}