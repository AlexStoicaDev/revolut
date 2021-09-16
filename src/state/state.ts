import { CurrencyRatesState } from './currency-rates/state';
import { ExchangeState } from './exchange/state';

export interface State {
    exchange: ExchangeState;
    currencyRates: CurrencyRatesState;
}
