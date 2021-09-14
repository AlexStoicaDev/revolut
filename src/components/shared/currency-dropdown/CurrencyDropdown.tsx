import { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Currency } from '../../../models/Currency';
import {
    DropDownContainer,
    DropDownHeader,
    DropDownList,
    DropDownListContainer,
    ListItem,
} from './CurrencyDropdown.styled';

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
