import { getNumberWithTwoDecimals } from '../../utils/exchange';
import { State } from '../state';

export function selectExchangeRateForCurrency(
    currencyCode: string,
    state: State,
): number | undefined {
    return getNumberWithTwoDecimals(state.currencyRates.conversionRates[currencyCode]);
}
