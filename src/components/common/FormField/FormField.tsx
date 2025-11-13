import React from 'react';
import styles from './FormField.module.scss';
interface FormFieldProps {
    children: React.ReactNode;
    inputId?: string;
    label?: string;
    error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ inputId, label, children, error }) => {
    return (
        <div className={styles.field}>
            <label htmlFor={inputId} className={styles.field__label}>
                {label}
            </label>
            {children}
            {error && (
                <span id={`${inputId}-error`} className={styles.field__error} role="alert">
                    {error}
                </span>
            )}
        </div>
    );
};

export default FormField;