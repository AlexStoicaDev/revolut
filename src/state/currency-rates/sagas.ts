import { all, delay, put, takeLatest } from 'redux-saga/effects';
import { mockFetchRates } from '../../core/api';
import { CurrencyRatesActionTypes, loadCurrencyRates, loadCurrencyRatesSuccess } from './actions';

export function* loadCurrencyRatesSaga() {
    const { baseCurrencyCode, conversionRates } = mockFetchRates('EUR');
    yield put(loadCurrencyRatesSuccess(baseCurrencyCode, conversionRates));
}
export function* refetchRatesSaga() {
    while (true) {
        yield put(loadCurrencyRates());
        yield delay(10000);
    }
}

export function* currencyRatesSaga() {
    yield all([
        takeLatest(CurrencyRatesActionTypes.LOAD_CURRENCY_RATES, loadCurrencyRatesSaga),
        refetchRatesSaga(),
    ]);
}
