import React, { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import customTheme from '../theme';

const renderWithTheme = (component: ReactElement, options: any = {}) => {
    const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
        <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
    );

    return render(component, { wrapper: Wrapper, ...options });
};

const useSelector = jest.fn();
const useDispatch = jest.fn();
const dispatch = jest.fn();

jest.doMock('react-redux', () => ({
    useDispatch,
    useSelector,
}));

useDispatch.mockReturnValue(dispatch);

export { renderWithTheme, useSelector, dispatch };
