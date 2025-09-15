import React from 'react';
import styles from './Header.module.scss';
import Logo from '../../../assets/images/logo.svg?react';
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle';
import UserAvatar from '../../../assets/images/image-avatar.jpg';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles['header__logo-container']}>
                <div className={styles['header__inner-circle']}></div>
                <Logo />
            </div>
            <ThemeToggle className={styles['header__theme-toggle']} />
            <div className={styles['header__avatar']}>
                <img src={UserAvatar} alt="User Avatar" />
            </div>
        </header>
    );
};

export default Header;