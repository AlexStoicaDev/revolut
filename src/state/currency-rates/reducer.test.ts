import { loadCurrencyRatesSuccess } from './actions';
import { currencyRatesReducer } from './reducer';

describe('currencyRatesReducer', () => {
    it('should return the initial state', () => {
        //@ts-ignore
        expect(currencyRatesReducer(undefined, {})).toEqual({
            baseCurrencyCode: '',
            conversionRates: {},
        });
    });

    it('should handle LOAD_CURRENCY_RATES_SUCCESS', () => {
        const loadCurrencySuccesAction = loadCurrencyRatesSuccess('EUR', { USD: 1 });
        expect(
            currencyRatesReducer(
                { baseCurrencyCode: '', conversionRates: {} },
                loadCurrencySuccesAction,
            ),
        ).toEqual({
            baseCurrencyCode: 'EUR',
            conversionRates: {
                USD: 1,
            },
        });
    });
});
