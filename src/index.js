import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

import GlobalStyles from "./component/GlobalStyles";
import Grid from "./component/Grid";

const clientStore = configureStore({ reducer: reducers });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <Provider store={clientStore}>
        <GlobalStyles>
            <Grid>
                <App />
            </Grid>
        </GlobalStyles>
    </Provider>
    // </React.StrictMode>
);
