import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { LIGHT_THEME, FontsVTBGroup, DropdownProvider } from '@admiral-ds/react-ui';
import App from './App';
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={LIGHT_THEME}>
        <DropdownProvider>
          <FontsVTBGroup />
            <App/>
        </DropdownProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);