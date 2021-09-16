import { Account } from '../../models/Account';
import { State } from '../state';

export function selectChoosenAccounts(state: State): {
    fromAccount: Account;
    toAccount: Account;
} {
    return { fromAccount: state.exchange.fromAccount, toAccount: state.exchange.toAccount };
}

export function selectChoosenAmount(state: State): number {
    return state.exchange.amount;
}
