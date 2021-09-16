import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Account } from '../../../models/Account';
import { renderWithTheme } from '../../../utils/testing';
import CurrencyDropdown from './CurrencyDropdown';

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

const props = {
    availableAccounts: accounts,
    selectedAccount: accounts[0],
    onSelectAccount: mockOnSelectAccount,
};

describe('CurrencyDropdown', () => {
    it('should render the selected currency code', () => {
        const { getByTestId } = renderWithTheme(<CurrencyDropdown {...props} />);

        expect(getByTestId('selected-currency').innerHTML.trim()).toBe(
            props.selectedAccount.currency.code,
        );
    });
    it('should send the newly selected account id to the callback', () => {
        const { getByTestId, getByText } = renderWithTheme(<CurrencyDropdown {...props} />);

        const dropdownHandler = getByTestId('dropdown-handler');
        expect(dropdownHandler).toBeInTheDocument();
        userEvent.click(dropdownHandler);

        const euroCurrencyOption = getByText('EUR €');
        expect(euroCurrencyOption).toBeInTheDocument();
        userEvent.click(euroCurrencyOption);
        expect(mockOnSelectAccount).toBeCalledWith(accounts[1]);
    });
});
