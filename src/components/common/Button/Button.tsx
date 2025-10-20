import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps {
  // Button contents
  children?: React.ReactNode;
   // Button variant
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
   // Optional click handler
  onClick?: () => void;
   // Is the button disabled?
  disabled?: boolean;
   // Optional icon to display before the text
  icon?: React.ReactNode;
   // Is this an icon-only button?
  iconOnly?: boolean;
   // Is this a 100% width button?
  wide?: boolean;
   // Additional CSS class names
  className?: string;
   // Button type
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children = null,
  variant = 'primary',
  onClick,
  disabled = false,
  icon,
  iconOnly = false,
  wide = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[`button--${variant}`],
    icon && styles['button--iconed'],
    iconOnly && styles['button--icon-only'],
    wide && styles['button--wide'],
    className
  ].filter(Boolean).join(' ');
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className={styles.button__icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
