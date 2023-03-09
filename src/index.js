import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import {default as userStore} from './Features/User/Store/store';
import './assets/styles/style.css';
import {ThemeModeContextProvider} from "./context/DarkLightModeContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={userStore}>
            <ThemeModeContextProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ThemeModeContextProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
