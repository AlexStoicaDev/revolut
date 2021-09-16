import { all } from 'redux-saga/effects';
import { currencyRatesSaga } from './currency-rates/sagas';

export function* saga() {
    yield all([currencyRatesSaga()]);
}
