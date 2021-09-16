import styled, { css } from 'styled-components';
import { BiUpArrowCircle } from 'react-icons/bi';

export const StyledCurrencyExchangeWidget = styled.form`
    margin-top: 30px;
    & > div {
        margin-bottom: 5px;
    }
    & > button {
        margin-top: 30px;
    }
`;

interface CashflowArrowProps {
    $facingDownwards: boolean;
}
export const CashflowArrow = styled(BiUpArrowCircle)<CashflowArrowProps>`
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 15px;
    ${({ $facingDownwards }) =>
        $facingDownwards &&
        css`
            -webkit-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            -o-transform: rotate(180deg);
            transform: rotate(180deg);
        `}
`;

export const ExchangeDescription = styled.div`
    text-align: left;
`;
export const ExchangeRate = styled.div`
    color: ${({ theme }) => theme.colors.accent};
    text-align: left;
    font-size: 16px;
    & > * {
        vertical-align: middle;
    }
`;
