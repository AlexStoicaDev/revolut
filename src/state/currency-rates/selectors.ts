import { State } from '../state';

export function selectExchangeRateForCurrency(
    currencyCode: string,
    state: State,
): number | undefined {
    return state.currencyRates.conversionRates[currencyCode];
}
