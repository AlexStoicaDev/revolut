export interface CurrencyRatesState {
    baseCurrencyCode: string;
    conversionRates: Record<string, number>;
}
