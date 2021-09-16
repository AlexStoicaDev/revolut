import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import './App.css';
import CurrencyExchangeWidget from './components/exchange-widget/CurrencyExchangeWidget';
import GlobalStyles from './global.styles';
import { Account } from './models/Account';
import createAppStore from './state/store';
import customTheme from './theme';
import { createBrowserHistory } from 'history';

const options = [
    { code: 'GBP', symbol: '£' },
    { code: 'EUR', symbol: '€' },
    { code: 'USD', symbol: '$' },
];

const accounts: Account[] = [
    { id: 1, balance: 300, currency: options[0] },
    { id: 2, balance: 200, currency: options[1] },
    { id: 3, balance: 500, currency: options[2] },
];

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL || '' });
const store = createAppStore(history);

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <ThemeProvider theme={customTheme}>
                    <div className="contentWrapper">
                        <h1>Revolut</h1>
                        <CurrencyExchangeWidget accounts={accounts} />
                        <GlobalStyles />
                    </div>
                </ThemeProvider>
            </Provider>
        </div>
    );
}

export default App;
