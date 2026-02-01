"use client";

import { useLanguage } from './LanguageProvider';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className={styles.switcher}>
            <button
                className={`${styles.btn} ${language === 'en' ? styles.active : ''}`}
                onClick={() => setLanguage('en')}
            >
                EN
            </button>
            <div className={styles.divider}></div>
            <button
                className={`${styles.btn} ${language === 'zh-TW' ? styles.active : ''}`}
                onClick={() => setLanguage('zh-TW')}
            >
                繁中
            </button>
        </div>
    );
}
