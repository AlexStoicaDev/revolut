import { Account } from '../../models/Account';

export interface ExchangeState {
    fromAccount: Account;
    toAccount: Account;
    amount: number;
    availableAccounts: Account[];
}
