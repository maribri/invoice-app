import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { InvoiceProvider } from './context/InvoiceContext';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <InvoiceProvider>
                    <App />
                </InvoiceProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
