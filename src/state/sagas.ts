import { all } from 'redux-saga/effects';
import { currencyRatesSaga } from './currency-rates/sagas';
import { exchangeSaga } from './exchange/sagas';

export function* saga() {
    yield all([currencyRatesSaga(), exchangeSaga()]);
}
