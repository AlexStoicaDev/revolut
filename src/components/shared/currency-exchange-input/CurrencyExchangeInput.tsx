import { useState } from 'react';
import { Account } from '../../../models/Account';
import CurrencyDropdown from '../currency-dropdown/CurrencyDropdown';
import {
    AccountBalanceInfo,
    AccountBalanceWarning,
    CurrencyExchangeInputWrapper,
    CurrencyInput,
    StyledCurrencyExchangeInput,
} from './CurrencyExchange.styled';
interface ExchangeInputProps {
    availableAccounts: Account[];
    selectedAccount: Account;
    currencyInputValue: string;
    exceedsBalance: boolean;
    onSelectAccount: (account: Account) => void;
    onCurrencyInputChange: (newValue: string) => void;
}
const CurrencyExchangeInput: React.FC<ExchangeInputProps> = ({
    availableAccounts,
    selectedAccount,
    currencyInputValue,
    exceedsBalance,
    onSelectAccount,
    onCurrencyInputChange,
}) => {
    const [previousValue, setPreviousValue] = useState(currencyInputValue);

    const onKeydown = (e: any) => {
        const { key } = e;
        const blockChars = ['+', '-', 'e'];
        if (blockChars.find((blockedChar) => blockedChar === key)) {
            e.preventDefault();
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const splittedNumber = value.split('.');
        if (splittedNumber.length === 2) {
            if (splittedNumber[1].length > 2) {
                onCurrencyInputChange(previousValue);
                return;
            }
            if (splittedNumber[0] !== '') {
                setPreviousValue(value);
                onCurrencyInputChange(value);
                return;
            } else {
                onCurrencyInputChange('0' + value);
                return;
            }
        }
        onCurrencyInputChange(value);
    };
    return (
        <StyledCurrencyExchangeInput exceedsBalance={exceedsBalance}>
            <CurrencyExchangeInputWrapper>
                <CurrencyDropdown
                    availableAccounts={availableAccounts}
                    selectedAccount={selectedAccount}
                    onSelectAccount={onSelectAccount}
                />
                <CurrencyInput
                    data-testid="currency-input"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0"
                    value={currencyInputValue}
                    onKeyDown={onKeydown}
                    onChange={onChange}
                />
            </CurrencyExchangeInputWrapper>
            <AccountBalanceInfo exceedsBalance={exceedsBalance}>
                <span data-testid="account-balance">
                    {`Balance: ${selectedAccount.currency.symbol} ${selectedAccount.balance}`}
                </span>
                <AccountBalanceWarning
                    data-testid="balance-warning"
                    exceedsBalance={exceedsBalance}
                >
                    exceeds balance
                </AccountBalanceWarning>
            </AccountBalanceInfo>
        </StyledCurrencyExchangeInput>
    );
};
export default CurrencyExchangeInput;
