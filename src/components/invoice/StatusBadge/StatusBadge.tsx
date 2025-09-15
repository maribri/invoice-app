import React from 'react';
import styles from './StatusBadge.module.scss';
import { InvoiceStatus } from '../../../types';

interface StatusBadgeProps {
    className?: string;
    status: InvoiceStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ className, status }) => {
    return (
        <div className={`${styles.badge} ${styles[`badge--${status}`]} ${className || ''}`}
        >
            {status}
        </div>
    );
};

export default StatusBadge;