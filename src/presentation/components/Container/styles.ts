import styled from "styled-components";

type ContainerProps = {
    flex?: boolean
    centralize?: boolean
    smallMarginTop?: boolean
    mediumMarginTop?: boolean
    largeMarginTop?: boolean
    extraLargeMarginTop?: boolean
}

const getMarginTop = (props: ContainerProps) => {
    if (props.smallMarginTop) return '8px'
    if (props.mediumMarginTop) return '16px'
    if (props.largeMarginTop) return '32px'
    if (props.extraLargeMarginTop) return '64px'
    return '10%'
}

const ContainerStyled = styled.section`
    margin-top: ${(props: ContainerProps) => getMarginTop(props)};
    display: ${(props: ContainerProps) => props.flex || props.centralize ? 'flex' : 'block'};
    justify-content: ${(props: ContainerProps) => props.centralize && 'center'};

`

export {
    ContainerStyled
}