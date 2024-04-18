import styled, { css } from "styled-components";

export const ButtonStyle = styled.button`
border: 0;
padding: 5px 15px;
border-radius: 5px;
cursor: pointer;
display: inline-flex;
align-items: center;
text-decoration: none;
svg{
    height: 16px;
    margin-right: 5px;
}
${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
`}
${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000;
`}
${props => props.primary && css`
    background-color: #5542F6;
    color: #fff;
    border: 1px solid #5542F6;
`}
${props => props.size === "l" && css`
    padding: 10px 20px;
    font-size: 1.2rem;
    svg{
        height: 20px;
    }
`}
`

export const StyledButton = styled.button`
${ButtonStyle}
`

export default function Button({ children, ...rest }) {
    return (
        <StyledButton {...rest}>{children}</StyledButton>
    );
}

