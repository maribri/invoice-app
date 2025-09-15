import React from 'react';
import styles from './InvoiceForm.module.scss';
import { useInvoices } from '../../../hooks/useInvoices';

const InvoiceForm: React.FC = () => {

    const { closeInvoiceForm } = useInvoices();

    return (
        <div className={styles.form} onClick={closeInvoiceForm}>
            Placeholder for InvoiceForm component
        </div>
    );
};

export default InvoiceForm;