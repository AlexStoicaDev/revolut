import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Account } from '../../../models/Account';
import { renderWithTheme } from '../../../utils/testing';
import CurrencyExchangeInput from './CurrencyExchangeInput';

afterEach(cleanup);

const currencies = [
    { code: 'GBP', symbol: '£' },
    { code: 'EUR', symbol: '€' },
    { code: 'USD', symbol: '$' },
];
const accounts: Account[] = [
    { id: 1, balance: 300, currency: currencies[0] },
    { id: 2, balance: 200, currency: currencies[1] },
    { id: 3, balance: 500, currency: currencies[2] },
];

const mockOnSelectAccount = jest.fn();
const mockOnCurrencyInputChange = jest.fn();

const props = {
    availableAccounts: accounts,
    selectedAccount: accounts[0],
    currencyInputValue: '500',
    exceedsBalance: false,
    onSelectAccount: mockOnSelectAccount,
    onCurrencyInputChange: mockOnCurrencyInputChange,
};

describe('CurrencyExchangeInput', () => {
    it('should display the passed in currency input value', () => {
        const { getByTestId } = renderWithTheme(<CurrencyExchangeInput {...props} />);
        // @ts-ignore
        expect(getByTestId('currency-input').value).toBe('500');
    });
    it('should display the account balance', () => {
        const { getByTestId } = renderWithTheme(<CurrencyExchangeInput {...props} />);
        expect(getByTestId('account-balance').innerHTML.trim()).toBe(
            `Balance: ${props.selectedAccount.currency.symbol} ${props.selectedAccount.balance}`,
        );
    });

    it('should send input vallues to onCurrencyInputChange callback', () => {
        const { getByTestId } = renderWithTheme(<CurrencyExchangeInput {...props} />);

        const currencyInput = getByTestId('currency-input');
        expect(currencyInput).toBeInTheDocument();

        userEvent.type(currencyInput, '123');

        expect(mockOnCurrencyInputChange).toBeCalledTimes(3);
        expect(mockOnCurrencyInputChange).toHaveBeenNthCalledWith(1, '5001');
        expect(mockOnCurrencyInputChange).toHaveBeenNthCalledWith(2, '5002');
        expect(mockOnCurrencyInputChange).toHaveBeenNthCalledWith(3, '5003');
    });

    it('should not display exceeds balance warning', () => {
        const { getByTestId } = renderWithTheme(<CurrencyExchangeInput {...props} />);

        const exceedsBalanceWarning = getByTestId('balance-warning');
        expect(exceedsBalanceWarning).not.toBeVisible();
    });

    it('should display exceeds balance warning', () => {
        const testProps = {
            ...props,
            exceedsBalance: true,
        };
        const { getByTestId } = renderWithTheme(<CurrencyExchangeInput {...testProps} />);

        const exceedsBalanceWarning = getByTestId('balance-warning');
        expect(exceedsBalanceWarning).toBeVisible();
    });
});
