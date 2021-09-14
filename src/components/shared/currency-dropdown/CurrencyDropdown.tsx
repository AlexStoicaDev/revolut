import { useState } from 'react';
import styled from 'styled-components';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Currency } from '../../../models/Currency';

const DropDownContainer = styled.div`
    width: 100px;
    margin: 0 auto;
`;

const DropDownHeader = styled.div`
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.main};
    background: #ffffff;

    & > * {
        vertical-align: middle;
    }
    & > svg {
        margin-top: 4px;
    }
`;

const DropDownListContainer = styled.div`
    position: absolute;
    text-align: left;
    width: 100px;
`;

const DropDownList = styled.ul`
    padding: 0 0 0 12px;
    margin: 10px 0 0 0;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 2px 2px 4px rgb(228, 228, 228);
    border-radius: 10px;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.grey};
    font-size: 20px;
    font-weight: 500;
    &:first-child {
        padding-top: 12px;
    }
`;

const ListItem = styled.li`
    list-style: none;
    margin-bottom: 12px;
    cursor: pointer;
    &:hover {
        color: ${({ theme }) => theme.colors.main};
    }
`;

interface CurrencyDropdownProps {
    selectedCurrency: Currency;
    currencies: Currency[];
    onSelectCurrency: (selectedCurrency: Currency) => void;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
    selectedCurrency,
    currencies,
    onSelectCurrency,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value: Currency) => () => {
        onSelectCurrency(value);
        setIsOpen(false);
    };

    return (
        <DropDownContainer>
            <DropDownHeader data-testid="dropdown-handler" onClick={toggling}>
                <span data-testid="selected-currency"> {selectedCurrency.code} </span>
                <RiArrowDownSLine size={28} />
            </DropDownHeader>
            {isOpen && (
                <DropDownListContainer>
                    <DropDownList>
                        {currencies.map((currency) => (
                            <ListItem onClick={onOptionClicked(currency)} key={currency.code}>
                                {`${currency.code} ${currency.symbol}`}
                            </ListItem>
                        ))}
                    </DropDownList>
                </DropDownListContainer>
            )}
        </DropDownContainer>
    );
};

export default CurrencyDropdown;
