import { CurrencyRatesAction, CurrencyRatesActionTypes } from './actions';
import { CurrencyRatesState } from './state';

export function currencyRatesReducer(
    state: CurrencyRatesState = { baseCurrencyCode: '', conversionRates: {} },
    action: CurrencyRatesAction,
): CurrencyRatesState {
    switch (action.type) {
        case CurrencyRatesActionTypes.LOAD_CURRENCY_RATES_SUCCESS:
            const { baseCurrencyCode, conversionRates } = action.data;
            return { baseCurrencyCode, conversionRates };
        default:
            return state;
    }
}
