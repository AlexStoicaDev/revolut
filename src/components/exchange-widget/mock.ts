import { Currency } from '../../models/Currency';

interface Map {
    [key: string]: number | undefined;
}

const currencyPairs: Map = {
    GBPUSD: 1.38,
    GBPEUR: 1.17,
    EURUSD: 1.18,
    EURGBP: 0.83,
    USDGBP: 0.62,
    USDEUR: 0.82,
};

export const getExchangeRate = (currencyFrom: Currency, currencyTo: Currency) => {
    const currencyCode = currencyTo.code + currencyFrom.code;
    return currencyPairs[currencyCode];
};
export const currencyExchange = (amount: number, currencyTo: Currency, currencyFrom: Currency) => {
    const currencyCode = currencyTo.code + currencyFrom.code;
    return amount * (currencyPairs[currencyCode] || 1);
};
