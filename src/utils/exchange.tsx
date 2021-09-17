export const getExchangedValue = (value: number, exchangeRate?: number): number => {
    return getNumberWithTwoDecimals(value * (exchangeRate || 1));
};

export const getNumberWithTwoDecimals = (value: number): number => {
    return Number(Math.round(parseFloat(value + 'e' + 2)) + 'e-' + 2);
};
