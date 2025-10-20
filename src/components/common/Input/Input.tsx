import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
    type: React.HTMLInputTypeAttribute;
    id?: string;
    name?: string;
    value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    isFirst?: boolean;
    readOnly?: boolean;
}

const Input: React.FC<InputProps> = ({ type, id, name, value, placeholder, onChange, className, isFirst, readOnly }) => {
    return (
        <input type={type}
               id={id}
               name={name || id}
               value={value}
               placeholder={placeholder}
               onChange={onChange}
               className={`${styles.input} ${className || ''}`}
               data-autofocus={isFirst}
               readOnly={readOnly}
        />
    );
};

export default Input;