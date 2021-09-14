import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../utils/testing';
import CurrencyDropdown from './CurrencyDropdown';

afterEach(cleanup);

const currencies = [
    { code: 'GBP', symbol: '£' },
    { code: 'EUR', symbol: '€' },
    { code: 'USD', symbol: '$' },
];
const mockOnSelectCurrency = jest.fn();
const props = {
    currencies,
    selectedCurrency: currencies[0],
    onSelectCurrency: mockOnSelectCurrency,
};

describe('CurrencyDropdown', () => {
    it('should render the selected currency code', () => {
        const { getByTestId } = renderWithTheme(<CurrencyDropdown {...props} />);

        expect(getByTestId('selected-currency').innerHTML.trim()).toBe(props.selectedCurrency.code);
    });
    it('should send the newly selected currency to the callback', () => {
        const { getByTestId, getByText } = renderWithTheme(<CurrencyDropdown {...props} />);

        const dropdownHandler = getByTestId('dropdown-handler');
        expect(dropdownHandler).toBeInTheDocument();
        userEvent.click(dropdownHandler);

        const euroCurrencyOption = getByText('EUR €');
        expect(euroCurrencyOption).toBeInTheDocument();
        userEvent.click(euroCurrencyOption);
        expect(mockOnSelectCurrency).toBeCalledWith({ code: 'EUR', symbol: '€' });
    });
});
