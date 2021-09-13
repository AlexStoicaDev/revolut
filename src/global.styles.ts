import { createGlobalStyle } from 'styled-components';
import EffraWoff from './assets/fonts/Effra.woff';
import EffraWoff2 from './assets/fonts/Effra.woff2';
import customTheme from './theme';

export default createGlobalStyle`
    @font-face {
        font-family: 'Effra';
        src: local('Effra'), local('Effra'),
        url(${EffraWoff2}) format('woff2'),
        url(${EffraWoff}) format('woff');
        font-weight: 400;
        font-style: normal;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    body{
        font-family: 'Effra', sans-serif;
        font-weight: 400;
        line-height: 1.6;
        font-size: 1.6rem;
        background: #F9F9F9;
        color: ${customTheme.colors.main};
    }
`;
