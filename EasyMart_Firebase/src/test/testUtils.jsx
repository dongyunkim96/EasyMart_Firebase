import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { render } from '@testing-library/react';
import store from '../app/store';

export function renderWithProviders(ui, { route = '/', themeMode = 'light' } = {}) {
  const theme = createTheme({
    palette: { mode: themeMode, primary: { main: '#FF9900' }, secondary: { main: '#232f3e' } }
  });

  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
}
