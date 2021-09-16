import { all, put, select, takeLatest } from 'redux-saga/effects';
import { ExchangeActionTypes, exchangeCurrenciesSuccess } from './actions';
import { selectChoosenAccounts, selectChoosenAmount } from './selectors';

function* exchangeCurrenciesSaga(): any {
    const state = yield select();
    const { fromAccount, toAccount } = selectChoosenAccounts(state);
    const amount = selectChoosenAmount(state);
    console.log(fromAccount, toAccount, amount);
    yield put(exchangeCurrenciesSuccess());
}

export function* exchangeSaga() {
    yield all([takeLatest(ExchangeActionTypes.EXCHANGE_CURRENCIES, exchangeCurrenciesSaga)]);
}
