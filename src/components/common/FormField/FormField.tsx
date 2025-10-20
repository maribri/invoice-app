import React from 'react';
import styles from './FormField.module.scss';
interface FormFieldProps {
    children: React.ReactNode;
    inputId?: string;
    label?: string;
}

const FormField: React.FC<FormFieldProps> = ({ children, inputId, label }) => {

    return (
        <div className={styles.field}>
            <label className={styles.field__label} htmlFor={inputId}>
                {label}
            </label>
            {children}
        </div>
    );
};

export default FormField;