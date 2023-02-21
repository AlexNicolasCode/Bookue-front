import styled from "styled-components";

type ContainerProps = {
    flex?: boolean
}

const ContainerStyled = styled.section`
    margin-top: 10%;
    display: ${(props: ContainerProps) => props.flex ? 'flex' : 'block'};
`

export {
    ContainerStyled
}