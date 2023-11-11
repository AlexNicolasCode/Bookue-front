import { memo, useCallback, useMemo, useRef, useState } from "react"

import { useAlert, useTextConverter } from "@/presentation/hook"
import { AlertType } from "@/presentation/contexts"

import {
    EditButtonStyled,
    ContainerStyled,
    TextStyled,
    TextEditModeStyled,
    LabelStyled,
    FieldStyled,
} from "./styles"

type FieldProps = {
    validateField: (fieldName: string, value: string) => string | undefined 
    fieldName: string
    text: string
    test?: {
        prefix: string
    }
}

export const FieldComponent = ({ fieldName, text, validateField, test }: FieldProps) => {
    const { normalizeContent } = useTextConverter();
    const { setNewAlert } = useAlert();
    const [value, setValue] = useState<string>(text);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const label = useRef<string>(normalizeContent(fieldName));
    const type = useMemo(() => fieldName.toLowerCase().includes('page') ? 'number' : 'text', [fieldName]);

    const renderEditModeField = useCallback(() => (
        <FieldStyled>
            <LabelStyled>{label.current}</LabelStyled>
            <TextEditModeStyled
              onChange={($event) => setValue($event.target.value)}
              type={type}
              value={value}
              data-test-id={`${test.prefix}-${fieldName}-edit-mode`}
            />
          </FieldStyled>
    ), [value])

    const renderDefaultField = useCallback(() => (
        <FieldStyled>
            <LabelStyled data-test-id={`${test.prefix}-${fieldName}-label`}>{label.current}</LabelStyled>
            <TextStyled data-test-id={`${test.prefix}-${fieldName}`}>{value}</TextStyled>
        </FieldStyled>
    ), [value])

    const renderFieldAccordingEditMode = useCallback(() => {
        const renderField = isEditing ? renderEditModeField : renderDefaultField
        return renderField()
    }, [isEditing, renderEditModeField, renderDefaultField])

    const toggleEdit = useCallback(() => {
        const error = validateField(fieldName, value)
        if (error) {
            setNewAlert({ text: error, type: AlertType.Error })
            return
        }
        setIsEditing(!isEditing)
    }, [value, isEditing])

    return (
        <ContainerStyled>
            {renderFieldAccordingEditMode()}
            <EditButtonStyled
                onClick={toggleEdit}
                data-test-id={`${test.prefix}-${fieldName}-edit-button`}
            >
                Edit
            </EditButtonStyled>
        </ContainerStyled>
    )
}

export const Field = memo(FieldComponent)