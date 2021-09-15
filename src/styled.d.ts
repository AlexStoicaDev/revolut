import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            main: string;
            accent: string;
            lightWarning: string;
            warning: string;
            inactive: string;
            grey: string;
            background: string;
            white: string;
        };
    }
}
