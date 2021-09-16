import styled, { css } from 'styled-components';

const Button = styled.button`
    border-radius: 15px;
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Effra', sans-serif;
    background-color: ${({ theme, disabled }) =>
        disabled ? theme.colors.inactive : theme.colors.accent};
    padding: 12px 25px;
    font-size: 18px;
    outline: none;
    cursor: pointer;
    border: none;
    width: 200px;

    & > * {
        vertical-align: middle;
    }

    ${({ disabled }) =>
        !disabled &&
        css`
            box-shadow: 0px 4px 6px rgb(131 164 247);
        `}
`;

export default Button;
