import './App.css';
import { ThemeProvider } from 'styled-components';
import customTheme from './theme';
import GlobalStyles from './global.styles';

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={customTheme}>
                <h1>Revolut</h1>
                <GlobalStyles />
            </ThemeProvider>
        </div>
    );
}

export default App;
