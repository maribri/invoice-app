import React from 'react';
import styles from './Input.module.scss';

interface ThemeToggleProps {
    className?: string;
}

const Input: React.FC<ThemeToggleProps> = ({ className }) => {
    return (
        <p>
            Placehoder for Input component
        </p>
    );
};

export default Input;