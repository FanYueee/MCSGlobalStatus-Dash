"use client";

import styles from './LiquidBackground.module.css';

export default function LiquidBackground() {
    return (
        <div className={styles.container}>
            <div className={styles.dirtLayer}></div>
        </div>
    );
}
