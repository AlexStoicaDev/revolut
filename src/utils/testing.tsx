import React, { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import customTheme from '../theme';

export function renderWithTheme(component: ReactElement, options: any = {}) {
    const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
        <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
    );

    return render(component, { wrapper: Wrapper, ...options });
}
