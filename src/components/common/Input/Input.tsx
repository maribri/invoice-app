import React, { forwardRef, JSX, useEffect, useRef } from 'react';
import styles from './Input.module.scss';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
    isFirst?: boolean;
    className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ isFirst = false, className, id, name, ...rest }, forwardedRef): JSX.Element => {
        const internalRef = useRef<HTMLInputElement>(null);
        
        const inputRef = (forwardedRef || internalRef) as React.RefObject<HTMLInputElement>;

        useEffect(() => {
            if (isFirst && inputRef && 'current' in inputRef && inputRef.current) {
                const focusTimer = setTimeout(() => {
                    inputRef.current?.focus();
                }, 150);
                
                return () => clearTimeout(focusTimer);
            }
        }, [isFirst, inputRef]);

        return (
            <input
                ref={inputRef}
                id={id}
                name={name || id}
                className={[styles.input, className].filter(Boolean).join(' ')}
                {...rest}
            />
        );
    }
);

Input.displayName = 'Input';

export default Input;