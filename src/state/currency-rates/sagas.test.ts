import { expectSaga } from 'redux-saga-test-plan';
import { fetchCurrencyRates } from '../../core/api';
import { loadCurrencyRates, loadCurrencyRatesSuccess } from './actions';
import { loadCurrencyRatesSaga } from './sagas';

jest.mock('../../core/api', () => {
    return {
        fetchCurrencyRates: jest.fn(),
    };
});

describe('currencyRatesSaga', () => {
    describe('loadCurrencyRatesSaga', () => {
        it('should call rates api and disptach success action', () => {
            (
                fetchCurrencyRates as jest.MockedFunction<typeof fetchCurrencyRates>
            ).mockResolvedValueOnce({
                baseCurrencyCode: 'EUR',
                // @ts-ignore
                conversionRates: { USD: 123 },
            });

            const action = loadCurrencyRates('EUR');

            return expectSaga(loadCurrencyRatesSaga, action)
                .put(loadCurrencyRatesSuccess('EUR', { USD: 123 }))
                .call(fetchCurrencyRates, 'EUR')
                .run();
        });
    });
});
