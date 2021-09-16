import { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Account } from '../../../models/Account';
import {
    DropDownContainer,
    DropDownHeader,
    DropDownList,
    DropDownListContainer,
    ListItem,
} from './CurrencyDropdown.styled';

interface CurrencyDropdownProps {
    availableAccounts: Account[];
    selectedAccount: Account;
    onSelectAccount: (account: Account) => void;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
    selectedAccount,
    availableAccounts,
    onSelectAccount,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (account: Account) => () => {
        onSelectAccount(account);
        setIsOpen(false);
    };

    return (
        <DropDownContainer>
            <DropDownHeader data-testid="dropdown-handler" onClick={toggling}>
                <span data-testid="selected-currency"> {selectedAccount.currency.code} </span>
                <RiArrowDownSLine size={28} />
            </DropDownHeader>
            {isOpen && (
                <DropDownListContainer>
                    <DropDownList>
                        {availableAccounts.map((account) => (
                            <ListItem onClick={onOptionClicked(account)} key={account.id}>
                                {`${account.currency.code} ${account.currency.symbol}`}
                            </ListItem>
                        ))}
                    </DropDownList>
                </DropDownListContainer>
            )}
        </DropDownContainer>
    );
};

export default CurrencyDropdown;
