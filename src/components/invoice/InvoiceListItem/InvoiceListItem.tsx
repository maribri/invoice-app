import React from 'react';
import { formatCurrency, formatDate } from '../../../utils/helpers';
import { IconArrowRight } from '../../../assets/icons';
import styles from './InvoiceListItem.module.scss';
import { Invoice } from '../../../types';
import StatusBadge from '../StatusBadge/StatusBadge';

interface InvoiceListItemProps {
    invoice: Invoice;
}

const InvoiceListItem: React.FC<InvoiceListItemProps> = ({ invoice }) => {

    return (
        <li className={styles[`invoice-item`]}>
            <div className={styles[`invoice-item__id`]}><span className={styles[`invoice-item__hash`]}>#</span>{invoice.id}</div>
            <div className={styles[`invoice-item__date`]}><span className={styles[`invoice-item__due`]}>Due</span> {formatDate(invoice.paymentDue)}</div>
            <div className={styles[`invoice-item__client`]}>{invoice.clientName}</div>
            <div className={styles[`invoice-item__total`]}>{formatCurrency(invoice.total)}</div>
            <StatusBadge className={styles[`invoice-item__status`]} status={invoice.status} />
            <div className={styles[`invoice-item__arrow`]}><IconArrowRight /></div>
        </li>
    );
};

export default InvoiceListItem;