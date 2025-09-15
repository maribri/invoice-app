import React from 'react';
import styles from './InvoiceDetailPage.module.scss';
import { Link } from 'react-router-dom';

const InvoiceDetailPage: React.FC = () => {
    return (
        <div className={styles.page}>
            <Link to="/invoices">
                Go back
            </Link>
            <p>Placeholder for InvoiceDetailPage component</p>
        </div>
    );
};

export default InvoiceDetailPage;