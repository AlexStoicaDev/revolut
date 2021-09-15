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
    onSelectAccount: (accountId: number) => void;
    onCurrencyInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CurrencyExchangeInput: React.FC<ExchangeInputProps> = ({
    availableAccounts,
    selectedAccount,
    currencyInputValue,
    exceedsBalance,
    onSelectAccount,
    onCurrencyInputChange,
}) => (
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
                onChange={onCurrencyInputChange}
            />
        </CurrencyExchangeInputWrapper>
        <AccountBalanceInfo exceedsBalance={exceedsBalance}>
            <span data-testid="account-balance">
                {`Balance: ${selectedAccount.currency.symbol} ${selectedAccount.balance}`}
            </span>
            <AccountBalanceWarning data-testid="balance-warning" exceedsBalance={exceedsBalance}>
                exceeds balance
            </AccountBalanceWarning>
        </AccountBalanceInfo>
    </StyledCurrencyExchangeInput>
);

export default CurrencyExchangeInput;
