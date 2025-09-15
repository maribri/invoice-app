import React from 'react';
import styles from './InvoiceList.module.scss';
import { type Invoice } from '../../../types';
import { Link } from 'react-router-dom';
import InvoiceListItem from '../InvoiceListItem/InvoiceListItem';

interface InvoiceListProps {
    invoices: Invoice[];
}

const InvoiceList: React.FC<InvoiceListProps> = ({ invoices }) => {
    return (
        <ul className={styles.list}>
            {invoices.map((invoice) => {
                return (
                    <Link to={`/invoices/${invoice.id}`} key={invoice.id}>
                        <InvoiceListItem key={invoice.id} invoice={invoice} />
                    </Link>
                );
            })}
        </ul>
    );
};

export default InvoiceList;