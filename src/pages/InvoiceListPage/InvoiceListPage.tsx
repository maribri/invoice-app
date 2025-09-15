import React from 'react';
import styles from './InvoiceListPage.module.scss';
import { useInvoices } from '../../hooks/useInvoices';
import InvoiceList from '../../components/invoice/InvoiceList/InvoiceList';
import InvoiceListHeader from '../../components/invoice/InvoiceListHeader/InvoiceListHeader';

const InvoiceListPage: React.FC = () => {
    const { invoices, isLoading } = useInvoices();

    if (isLoading) {
        return <div className={styles.page}><p>Loading invoices...</p></div>;
    }

    return (
        <div className={styles.page}>
            <InvoiceListHeader invoicesLength={invoices.length} />

            {invoices.length === 0 && !isLoading && (
                <div className="page__empty">
                    <h2>There is nothing here</h2>
                    <p>Create an invoice by clicking the <br/><b>New Invoice</b> button and get started</p>
                </div>
            )}

            <InvoiceList invoices={invoices} />
        </div>
    );
};

export default InvoiceListPage;