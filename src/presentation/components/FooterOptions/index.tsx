import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { AddNoteOptionStyled, DeleteModeOptionStyled, FooterOptionsStyled, RemoveNoteOptionStyled } from "./styles"

type OptionConfig = {
    iconSupport: typeof DeleteModeOptionStyled | typeof AddNoteOptionStyled | typeof RemoveNoteOptionStyled;
    icon: typeof faTrash | typeof faPlus | typeof faMinus;
}

export enum OptionName {
    DeleteMode,
    AddNote,
    RemoveNote,
}

type FooterOptionsProps = {
    options: OptionName[]
}

export function FooterOptions ({ options }: FooterOptionsProps) {
    const getOptionConfig = (optionName: OptionName): OptionConfig => {
        const optionConfigs = {
            [OptionName.DeleteMode]: {
                iconSupport: DeleteModeOptionStyled,
                icon: faTrash,
            },
            [OptionName.AddNote]: {
                iconSupport: AddNoteOptionStyled,
                icon: faPlus,
            },
            [OptionName.RemoveNote]: {
                iconSupport: RemoveNoteOptionStyled,
                icon: faMinus,
            },
        }
        return optionConfigs[optionName]
    }

    const renderActivetedOptions = () =>
        options.map((optionName, index) => {
            const optionConfig = getOptionConfig(optionName)
            const IconSupport = optionConfig.iconSupport
            const icon = optionConfig.icon
            return (
                <IconSupport key={index}>
                    <FontAwesomeIcon icon={icon}/>
                </IconSupport>
            )
        })

    return (
        <FooterOptionsStyled>
            {renderActivetedOptions()}
        </FooterOptionsStyled>
    )
}