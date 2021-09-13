import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            main: string;
            accent: string;
            grey: string;
            lightGrey: string;
            background: string;
            white: string;
        };
    }
}
