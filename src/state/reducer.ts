import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { currencyRatesReducer } from './currency-rates/reducer';
import { exchangeReducer } from './exchange/reducer';

export function createRootReducer(history: History) {
    return combineReducers({
        router: connectRouter(history),
        currencyRates: currencyRatesReducer,
        exchange: exchangeReducer,
    });
}
