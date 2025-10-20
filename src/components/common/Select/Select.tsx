import React from 'react';
import styles from './Select.module.scss';

interface SelectProps {
    id?: string;
    name?: string;
    value?: number;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
}

const Select: React.FC<SelectProps> = ({ id, name, value, onChange, className }) => {
    return (
        <select id={id} name={name || id} value={value} onChange={onChange} className={`${styles.input} ${className || ''}`}>
            <option value="1">Net 1 Day</option>
            <option value="7">Net 7 Days</option>
            <option value="14">Net 14 Days</option>
            <option value="30">Net 30 Days</option>
        </select>
    );
};

export default Select;