import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { IconMoon, IconSun } from '../../../assets/icons';
import styles from './ThemeToggle.module.scss';

interface ThemeToggleProps {
    className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button className={`${styles['theme-toggle']} ${className || ''}`} onClick={toggleTheme} aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}>
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
        </button>
    );
};

export default ThemeToggle;