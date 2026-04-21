"use client";

import { useEffect, useState } from 'react';
import styles from './TopBar.module.css';
import { useLanguage } from './LanguageProvider';
import Link from 'next/link';

interface TopBarProps {
    mode?: 'standard' | 'distributed';
    setMode?: (mode: 'standard' | 'distributed') => void;
    onAboutClick: () => void;
}

export default function TopBar({ mode, setMode, onAboutClick }: TopBarProps) {
    const { t, language, setLanguage } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const hasModeToggle = Boolean(mode && setMode);
    const nextMode = mode === 'standard' ? 'distributed' : 'standard';

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 769px)');
        const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
            if (event.matches) {
                setMobileMenuOpen(false);
            }
        };

        handleChange(mediaQuery);
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'zh-TW' : 'en');
    };

    const handleModeToggle = () => {
        if (!mode || !setMode) {
            return;
        }

        setMode(nextMode);
        setMobileMenuOpen(false);
    };

    return (
        <div className={styles.topBar}>
            <div className={styles.desktopBar}>
                <div className={styles.leftGroup}>
                    <Link href="/" className={styles.titleLink}>
                        <div className={styles.titleSection}>
                            <h1 className={styles.title}>{t('title')}</h1>
                            <span className={styles.subtitle}>{t('subtitle')}</span>
                        </div>
                    </Link>

                    {hasModeToggle && (
                        <div className={`${styles.menu} ${styles.modeMenu}`}>
                            <button
                                type="button"
                                className={`${styles.navBtn} ${mode === 'standard' ? styles.active : ''}`}
                                onClick={() => setMode?.('standard')}
                            >
                                {t('mode_standard')}
                            </button>
                            <div className={styles.divider}></div>
                            <button
                                type="button"
                                className={`${styles.navBtn} ${mode === 'distributed' ? styles.active : ''}`}
                                onClick={() => setMode?.('distributed')}
                            >
                                {t('mode_distributed')}
                            </button>
                        </div>
                    )}
                </div>

                <div className={styles.rightGroup}>
                    <Link href="/api-docs">
                        <button type="button" className={styles.navBtn}>{t('nav_api')}</button>
                    </Link>
                    <button type="button" className={styles.navBtn} onClick={onAboutClick}>{t('nav_about')}</button>
                    <Link href="/faq">
                        <button type="button" className={styles.navBtn}>{t('nav_faq')}</button>
                    </Link>

                    <div className={styles.divider}></div>

                    <button
                        type="button"
                        className={`${styles.navBtn} ${styles.languageBtn}`}
                        onClick={toggleLanguage}
                    >
                        {language === 'en' ? 'EN' : '繁體中文'}
                    </button>
                </div>
            </div>

            <div className={styles.mobileBar}>
                <div className={styles.mobileTopRow}>
                    <Link href="/" className={styles.titleLink}>
                        <div className={styles.titleSection}>
                            <h1 className={styles.title}>{t('title')}</h1>
                            <span className={styles.subtitle}>{t('subtitle')}</span>
                        </div>
                    </Link>

                    <button
                        type="button"
                        className={`${styles.navBtn} ${styles.mobileMenuToggle} ${mobileMenuOpen ? styles.active : ''}`}
                        onClick={() => setMobileMenuOpen((open) => !open)}
                    >
                        {mobileMenuOpen ? t('mobile_menu_close') : t('mobile_menu_open')}
                    </button>
                </div>

                {hasModeToggle && (
                    <button
                        type="button"
                        className={`${styles.navBtn} ${styles.mobileModeToggle}`}
                        onClick={handleModeToggle}
                    >
                        {nextMode === 'distributed' ? t('mobile_switch_distributed') : t('mobile_switch_standard')}
                    </button>
                )}

                {mobileMenuOpen && (
                    <div className={styles.mobileMenuPanel}>
                        <Link
                            href="/api-docs"
                            className={`${styles.navBtn} ${styles.mobileMenuItem}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('nav_api')}
                        </Link>
                        <button
                            type="button"
                            className={`${styles.navBtn} ${styles.mobileMenuItem}`}
                            onClick={() => {
                                setMobileMenuOpen(false);
                                onAboutClick();
                            }}
                        >
                            {t('nav_about')}
                        </button>
                        <Link
                            href="/faq"
                            className={`${styles.navBtn} ${styles.mobileMenuItem}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {t('nav_faq')}
                        </Link>
                        <button
                            type="button"
                            className={`${styles.navBtn} ${styles.mobileMenuItem}`}
                            onClick={toggleLanguage}
                        >
                            {language === 'en' ? 'EN' : '繁體中文'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
