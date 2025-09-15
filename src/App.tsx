import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import InvoiceListPage from './pages/InvoiceListPage/InvoiceListPage';
import InvoiceDetailPage from './pages/InvoiceDetailPage/InvoiceDetailPage';
import Header from './components/layout/Header/Header';
import InvoiceForm from './components/invoice/InvoiceForm/InvoiceForm';
import { useInvoices } from './hooks/useInvoices';

const App: React.FC = () => {
    const { isFormOpen } = useInvoices();

    return (
        <div className="layout">

            <Header />

            <main className="layout__content">

                    <Routes>
                        <Route path="/" element={<Navigate replace to="/invoices" />} />
                        <Route path="/invoices" element={<InvoiceListPage />} />
                        <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
                        {/*@todo add a 404 route later */}
                    </Routes>

            </main>

            {isFormOpen && (
                <InvoiceForm />
            )}

        </div>
    );
};

export default App;