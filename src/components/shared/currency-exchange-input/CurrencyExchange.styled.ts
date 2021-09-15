import styled, { css } from 'styled-components';

interface ExceedsBalanceProps {
    readonly exceedsBalance?: boolean;
}

export const StyledCurrencyExchangeInput = styled.div<ExceedsBalanceProps>`
    padding: 10px 20px;
    border-radius: 15px;
    background-color: ${({ theme, exceedsBalance }) =>
        exceedsBalance ? theme.colors.lightWarning : theme.colors.white};
    text-align: left;
    font-size: 0;
`;
export const CurrencyExchangeInputWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export const CurrencyInput = styled.input`
    border: none;
    outline: none;
    background-color: transparent;
    text-align: right;
    font-size: 24px;
    font-weight: bold;
`;

export const AccountBalanceInfo = styled.div<ExceedsBalanceProps>`
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    color: ${({ theme, exceedsBalance }) =>
        exceedsBalance ? theme.colors.warning : theme.colors.grey};
`;

export const AccountBalanceWarning = styled.span<ExceedsBalanceProps>`
    color: ${({ theme }) => theme.colors.warning};
    ${({ exceedsBalance }) =>
        !exceedsBalance &&
        css`
            visibility: hidden;
        `}
`;
