import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Account } from '../../models/Account';
import { Currency } from '../../models/Currency';
import { renderWithTheme, useSelector } from '../../utils/testing';
import CurrencyExchangeWidget from './CurrencyExchangeWidget';

interface Map {
    [key: string]: number | undefined;
}

const currencyPairs: Map = {
    GBPUSD: 1.38,
    GBPEUR: 1.17,
    EURUSD: 1.18,
    EURGBP: 0.83,
    USDGBP: 0.62,
    USDEUR: 0.82,
};

const getExchangeRate = (currencyFrom: Currency, currencyTo: Currency) => {
    const currencyCode = currencyTo.code + currencyFrom.code;
    return currencyPairs[currencyCode];
};

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

describe('CurrencyExchangeWidget', () => {
    it('should render the CurrencyExchangeWidget component correcly', () => {
        useSelector.mockReturnValue({
            accounts,
            firstSelectedAccount: accounts[0],
            secondSelectedAccount: accounts[1],
            exchangeRate: getExchangeRate(accounts[0].currency, accounts[1].currency),
        });
        const { container } = renderWithTheme(<CurrencyExchangeWidget />);
        expect(container).toMatchSnapshot();
    });

    it('can switch from sell to buy and vice versa', () => {
        useSelector.mockReturnValue({
            accounts,
            firstSelectedAccount: accounts[0],
            secondSelectedAccount: accounts[1],
            exchangeRate: getExchangeRate(accounts[0].currency, accounts[1].currency),
        });
        const { getByTestId } = renderWithTheme(<CurrencyExchangeWidget />);
        const cashflowArrow = getByTestId('cashflow-arrow');
        const exchangeDescription = getByTestId('exchange-description');
        const exchangeRate = getByTestId('exchange-rate');
        const exchangeButton = getByTestId('exchange-button');
        const exchangeRateSnapshot = `
        <span
          data-testid="exchange-rate"
        >
          ${accounts[0].currency.symbol}1 = ${getExchangeRate(
            accounts[0].currency,
            accounts[1].currency,
        )}${accounts[1].currency.symbol}
        </span>
    `;
        expect(exchangeDescription.textContent).toMatchInlineSnapshot(
            `"Sell ${accounts[0].currency.code}"`,
        );
        expect(exchangeRate).toMatchInlineSnapshot(exchangeRateSnapshot);
        expect(exchangeButton.textContent).toMatchInlineSnapshot(
            `"Sell ${accounts[0].currency.code} for ${accounts[1].currency.code}"`,
        );

        userEvent.click(cashflowArrow);

        expect(exchangeDescription.textContent).toMatchInlineSnapshot(`"Buy GBP"`);
        expect(exchangeRate).toMatchInlineSnapshot(exchangeRateSnapshot);
        expect(exchangeButton.textContent).toMatchInlineSnapshot(
            `"Buy ${accounts[0].currency.code} with ${accounts[1].currency.code}"`,
        );

        userEvent.click(cashflowArrow);

        expect(exchangeDescription.textContent).toMatchInlineSnapshot(`"Sell GBP"`);
        expect(exchangeRate).toMatchInlineSnapshot(exchangeRateSnapshot);
        expect(exchangeButton.textContent).toMatchInlineSnapshot(
            `"Sell ${accounts[0].currency.code} for ${accounts[1].currency.code}"`,
        );
    });

    it('change in one of the inputs triggers convertion and change in the other', () => {
        const exchangeRate = getExchangeRate(accounts[0].currency, accounts[1].currency);
        useSelector.mockReturnValue({
            accounts,
            firstSelectedAccount: accounts[0],
            secondSelectedAccount: accounts[1],
            exchangeRate,
        });
        const { getAllByTestId } = renderWithTheme(<CurrencyExchangeWidget />);
        const [firstCurrencyExchangeInput, secondCurrencyExchangeInput] =
            getAllByTestId('currency-input');

        userEvent.type(firstCurrencyExchangeInput, '2');
        userEvent.type(firstCurrencyExchangeInput, '1');

        // @ts-ignore
        expect(secondCurrencyExchangeInput.value).toBe((21 * exchangeRate).toString());

        userEvent.clear(firstCurrencyExchangeInput);
        // @ts-ignore
        expect(secondCurrencyExchangeInput.value).toBe('0');
    });

    it('button id disabled when inputs are empty or one of them exceeds balance', () => {
        useSelector.mockReturnValue({
            accounts,
            firstSelectedAccount: accounts[0],
            secondSelectedAccount: accounts[1],
            exchangeRate: getExchangeRate(accounts[0].currency, accounts[1].currency),
        });
        const { getByTestId, getAllByTestId } = renderWithTheme(<CurrencyExchangeWidget />);
        const exchangeButton = getByTestId('exchange-button');
        const [firstCurrencyExchangeInput, secondCurrencyExchangeInput] =
            getAllByTestId('currency-input');
        const cashflowArrow = getByTestId('cashflow-arrow');

        // button is disabled when the inputs are empty
        expect(exchangeButton).toBeDisabled();

        // button is disabled when the first input exceeds balance
        userEvent.type(firstCurrencyExchangeInput, '1234');
        expect(exchangeButton).toBeDisabled();

        // button is disabled when the second input exceeds balance
        userEvent.click(cashflowArrow);
        userEvent.clear(firstCurrencyExchangeInput);
        userEvent.type(secondCurrencyExchangeInput, '1234');
        expect(exchangeButton).toBeDisabled();
    });

    it('button is enabled when the inputs contain correct values', () => {
        useSelector.mockReturnValue({
            accounts,
            firstSelectedAccount: accounts[0],
            secondSelectedAccount: accounts[1],
            exchangeRate: getExchangeRate(accounts[0].currency, accounts[1].currency),
        });
        const { getByTestId, getAllByTestId } = renderWithTheme(<CurrencyExchangeWidget />);
        const exchangeButton = getByTestId('exchange-button');
        const [firstCurrencyExchangeInput, secondCurrencyExchangeInput] =
            getAllByTestId('currency-input');
        expect(exchangeButton).toBeDisabled();

        userEvent.type(firstCurrencyExchangeInput, '12');
        userEvent.type(secondCurrencyExchangeInput, '34');
        expect(exchangeButton).not.toBeDisabled();
    });
});
