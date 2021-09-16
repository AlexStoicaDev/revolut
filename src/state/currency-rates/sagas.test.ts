import { expectSaga } from 'redux-saga-test-plan';
import { mockFetchRates } from '../../core/api';
import { loadCurrencyRatesSuccess } from './actions';
import { loadCurrencyRatesSaga } from './sagas';

jest.mock('../../core/api', () => {
    return {
        mockFetchRates: jest.fn(),
    };
});

describe('currencyRatesSaga', () => {
    describe('loadCurrencyRatesSaga', () => {
        it('should call rates api and disptach success action', () => {
            (mockFetchRates as jest.MockedFunction<typeof mockFetchRates>).mockReturnValue({
                baseCurrencyCode: 'EUR',
                // @ts-ignore
                conversionRates: { USD: 123 },
            });

            return expectSaga(loadCurrencyRatesSaga)
                .put(loadCurrencyRatesSuccess('EUR', { USD: 123 }))
                .run();
        });
    });
});
