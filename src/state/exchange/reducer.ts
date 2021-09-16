import { ExchangeState } from './state';
import { ExchangeAction, ExchangeActionTypes } from './actions';
import { Account } from '../../models/Account';

const options = [
    { code: 'GBP', symbol: '£' },
    { code: 'EUR', symbol: '€' },
    { code: 'USD', symbol: '$' },
];

const accounts: Account[] = [
    { id: 1, balance: 300, currency: options[0] },
    { id: 2, balance: 200, currency: options[1] },
    { id: 3, balance: 500, currency: options[2] },
];

const initialState: ExchangeState = {
    fromAccount: accounts[0],
    toAccount: accounts[1],
    amount: 0,
    availableAccounts: accounts,
};

export function exchangeReducer(
    state: ExchangeState = initialState,
    action: ExchangeAction,
): ExchangeState {
    switch (action.type) {
        case ExchangeActionTypes.SET_SELECTED_ACCOUNTS_AND_AMOUNT_SUCCESS:
            const { fromAccount, toAccount, amount } = action.data;
            return { ...state, fromAccount, toAccount, amount };
        case ExchangeActionTypes.EXCHANGE_CURRENCIES_SUCCESS:
            return initialState;
        default:
            return state;
    }
}
