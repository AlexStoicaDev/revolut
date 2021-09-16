export enum CurrencyRatesActionTypes {
    LOAD_CURRENCY_RATES = '[CurrencyRates] Load currency rates',
    LOAD_CURRENCY_RATES_SUCCESS = '[CurrencyRates] Load currency rates success',
}

export interface loadCurrencyRatesAction {
    type: typeof CurrencyRatesActionTypes.LOAD_CURRENCY_RATES;
}

export function loadCurrencyRates(): loadCurrencyRatesAction {
    return {
        type: CurrencyRatesActionTypes.LOAD_CURRENCY_RATES,
    };
}

export interface loadCurrencyRatesSuccessAction {
    type: typeof CurrencyRatesActionTypes.LOAD_CURRENCY_RATES_SUCCESS;
    data: { baseCurrencyCode: string; conversionRates: Record<string, number> };
}

export function loadCurrencyRatesSuccess(
    baseCurrencyCode: string,
    conversionRates: Record<string, number>,
): loadCurrencyRatesSuccessAction {
    return {
        type: CurrencyRatesActionTypes.LOAD_CURRENCY_RATES_SUCCESS,
        data: { baseCurrencyCode, conversionRates },
    };
}

export type CurrencyRatesAction = loadCurrencyRatesAction | loadCurrencyRatesSuccessAction;
