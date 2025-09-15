import React from 'react';
import { IconPlus } from '../../../assets/icons';
import styles from './InvoiceListHeader.module.scss';
import { useInvoices } from '../../../hooks/useInvoices';
import Button from '../../common/Button/Button';

interface InvoiceListHeaderProps {
    invoicesLength: number;
}

const InvoiceListHeader: React.FC<InvoiceListHeaderProps> = ({ invoicesLength }) => {
    const { openNewInvoiceForm } = useInvoices();

    return (
        <div className={styles['list-header']}>
            <div className={styles['list-header__caption']}>
                <h1 className={styles['list-header__title']}>Invoices</h1>
                <p className={styles['list-header__subtitle']}>
                    {invoicesLength > 0 ? (
                        <>
                            <span className="tablet-hidden-down">There are </span>
                            {invoicesLength}
                            <span className="tablet-hidden-down"> total</span> invoices
                        </>
                    ) : (
                        'No invoices'
                    )}
                </p>
            </div>
            <div className={styles['list-header__actions']}>
                <div className={styles['list-header__filter']} onClick={()=>alert('To be done')}>Filter<span className="tablet-hidden-down">&nbsp;by status</span> {/* Placeholder for FilterDropdown */}</div>
                <Button icon={<IconPlus/>} onClick={openNewInvoiceForm}>New<span className="tablet-hidden-down">&nbsp;Invoice</span></Button>
            </div>
        </div>
    );
};

export default InvoiceListHeader;