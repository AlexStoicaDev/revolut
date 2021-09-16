import { all, put, select, takeLatest } from 'redux-saga/effects';
import { loadCurrencyRates } from '../currency-rates/actions';
import {
    ExchangeActionTypes,
    exchangeCurrenciesSuccess,
    setSelectedAccountsAndAmountAction,
    setSelectedAccountsAndAmountSuccess,
} from './actions';
import { selectChoosenAccounts, selectChoosenAmount } from './selectors';

function* exchangeCurrenciesSaga(): any {
    const state = yield select();
    const { fromAccount, toAccount } = selectChoosenAccounts(state);
    const amount = selectChoosenAmount(state);
    console.log(fromAccount, toAccount, amount);
    yield put(exchangeCurrenciesSuccess());
}

function* setSelectedAccountsAndAmountSaga({ data }: setSelectedAccountsAndAmountAction): any {
    const { fromAccount, toAccount, amount } = data;
    yield put(setSelectedAccountsAndAmountSuccess(fromAccount, toAccount, amount));
    yield put(loadCurrencyRates(fromAccount.currency.code));
}

export function* exchangeSaga() {
    yield all([
        takeLatest(ExchangeActionTypes.EXCHANGE_CURRENCIES, exchangeCurrenciesSaga),
        takeLatest(
            ExchangeActionTypes.SET_SELECTED_ACCOUNTS_AND_AMOUNT,
            setSelectedAccountsAndAmountSaga,
        ),
    ]);
}
