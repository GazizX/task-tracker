import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import {
  LIGHT_THEME,
  FontsVTBGroup,
  DropdownProvider,
} from "@admiral-ds/react-ui";
import App from "./App";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={LIGHT_THEME}>
          <DropdownProvider>
            <FontsVTBGroup />
            <App />
          </DropdownProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
