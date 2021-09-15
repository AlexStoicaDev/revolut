import { Currency } from './Currency';

export interface Account {
    id: number;
    /**
     * The amount of money available in the account represented as a whole number using
     * the smallest monetary unit
     */
    balance: number;
    currency: Currency;
}
