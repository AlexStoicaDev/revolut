import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import './App.css';
import CurrencyExchangeWidget from './components/exchange-widget/CurrencyExchangeWidget';
import GlobalStyles from './global.styles';
import createAppStore from './state/store';
import customTheme from './theme';

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL || '' });
const store = createAppStore(history);

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <ThemeProvider theme={customTheme}>
                    <div className="contentWrapper">
                        <h1>Revolut</h1>
                        <CurrencyExchangeWidget />
                        <GlobalStyles />
                    </div>
                </ThemeProvider>
            </Provider>
        </div>
    );
}

export default App;
