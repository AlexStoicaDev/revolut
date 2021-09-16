import { Account } from '../../models/Account';

export enum ExchangeActionTypes {
    SET_SELECTED_ACCOUNTS_AND_AMOUNT = '[Exchange] Set selected accounts and amount',
    EXCHANGE_CURRENCIES = '[Exchange] Exchange currencies',
    EXCHANGE_CURRENCIES_SUCCESS = '[Exchange] Exchange currencies success',
}

export interface setSelectedAccountsAndAmountAction {
    type: typeof ExchangeActionTypes.SET_SELECTED_ACCOUNTS_AND_AMOUNT;
    data: {
        fromAccount: Account;
        toAccount: Account;
        amount: number;
    };
}

export function setSelectedAccountsAndAmount(
    fromAccount: Account,
    toAccount: Account,
    amount: number,
): setSelectedAccountsAndAmountAction {
    return {
        type: ExchangeActionTypes.SET_SELECTED_ACCOUNTS_AND_AMOUNT,
        data: {
            fromAccount,
            toAccount,
            amount,
        },
    };
}

export interface exchangeCurrenciesAction {
    type: typeof ExchangeActionTypes.EXCHANGE_CURRENCIES;
}

export function exchangeCurrencies(): exchangeCurrenciesAction {
    return { type: ExchangeActionTypes.EXCHANGE_CURRENCIES };
}

export interface exchangeCurrenciesSuccessAction {
    type: typeof ExchangeActionTypes.EXCHANGE_CURRENCIES_SUCCESS;
}

export function exchangeCurrenciesSuccess(): exchangeCurrenciesSuccessAction {
    return { type: ExchangeActionTypes.EXCHANGE_CURRENCIES_SUCCESS };
}

export type ExchangeAction =
    | setSelectedAccountsAndAmountAction
    | exchangeCurrenciesAction
    | exchangeCurrenciesSuccessAction;
