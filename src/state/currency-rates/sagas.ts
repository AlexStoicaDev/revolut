import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { fetchCurrencyRates } from '../../core/api';
import { selectChoosenAccounts } from '../exchange/selectors';
import {
    CurrencyRatesActionTypes,
    loadCurrencyRates,
    loadCurrencyRatesAction,
    loadCurrencyRatesSuccess,
} from './actions';

export function* loadCurrencyRatesSaga({ currencyCode }: loadCurrencyRatesAction): any {
    const state = yield select();
    if (!currencyCode) {
        const { fromAccount } = selectChoosenAccounts(state);
        currencyCode = fromAccount.currency.code;
    }
    const { baseCurrencyCode, conversionRates } = yield call(fetchCurrencyRates, currencyCode);
    yield put(loadCurrencyRatesSuccess(baseCurrencyCode, conversionRates));
}

export function* refetchRatesSaga() {
    while (true) {
        yield put(loadCurrencyRates(''));
        yield delay(10000);
    }
}

export function* currencyRatesSaga() {
    yield all([
        takeLatest(CurrencyRatesActionTypes.LOAD_CURRENCY_RATES, loadCurrencyRatesSaga),
        refetchRatesSaga(),
    ]);
}
