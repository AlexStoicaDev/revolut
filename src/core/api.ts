import axios from 'axios';

/**
 * @param {string}  url .addres of the requested resource
 * @return {T} returns the data from the http request
 */
export function get<T = any>(url: string, mapper: (data: any) => T): Promise<T> {
    return axios.get(url).then(({ data }) => mapper(data));
}

interface fetchCurrencyRatesReponse {
    baseCurrencyCode: string;
    conversionRates: Record<string, number>;
}

const fetchCurrencyRatesDataMapper = (data: {
    base_code: string;
    conversion_rates: Record<string, number>;
}): fetchCurrencyRatesReponse => {
    return {
        baseCurrencyCode: data['base_code'],
        conversionRates: data['conversion_rates'],
    };
};

export const fetchCurrencyRates = (currencyCode: string) => {
    //!!The api-key part of the url would normally be inside a vault stored safely not in plain text in the code
    return get(
        `https://v6.exchangerate-api.com/v6/5e5add4a6bbec14b04fd7c13/latest/${currencyCode}`,
        fetchCurrencyRatesDataMapper,
    );
};
