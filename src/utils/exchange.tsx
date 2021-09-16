export const getExchangedValue = (value: number, exchangeRate?: number): number => {
    return value * (exchangeRate || 1);
};
