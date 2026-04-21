"use client";

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

    return (
        <div className={styles.topBar}>
            <div className={styles.leftGroup}>
                <Link href="/" className={styles.titleLink}>
                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>{t('title')}</h1>
                        <span className={styles.subtitle}>{t('subtitle')}</span>
                    </div>
                </Link>

                {mode && setMode && (
                    <div className={`${styles.menu} ${styles.modeMenu}`}>
                        <button
                            type="button"
                            className={`${styles.navBtn} ${mode === 'standard' ? styles.active : ''}`}
                            onClick={() => setMode('standard')}
                        >
                            {t('mode_standard')}
                        </button>
                        <div className={styles.divider}></div>
                        <button
                            type="button"
                            className={`${styles.navBtn} ${mode === 'distributed' ? styles.active : ''}`}
                            onClick={() => setMode('distributed')}
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
                    onClick={() => setLanguage(language === 'en' ? 'zh-TW' : 'en')}
                >
                    {language === 'en' ? 'EN' : '繁體中文'}
                </button>
            </div>
        </div>
    );
}
