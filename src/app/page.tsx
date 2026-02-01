"use client";

import styles from './page.module.css';
import LiquidBackground from '@/components/LiquidBackground';
import { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { LanguageProvider, useLanguage } from '@/components/LanguageProvider';
import TopBar from '@/components/TopBar';
import AboutModal from '@/components/AboutModal';

function PageContent() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'standard' | 'distributed'>('standard');
  const [showAbout, setShowAbout] = useState(false);

  return (
    <main className={styles.main}>
      <TopBar mode={mode} setMode={setMode} onAboutClick={() => setShowAbout(true)} />

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

      <div className={styles.contentWrapper}>
        <div className={styles.cardContainer}>
          <GlassCard mode={mode} />
        </div>
      </div>



      <div className={styles.bottomRight}>
        <p>{t('copyright')}</p>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <>
      <LiquidBackground />
      <LanguageProvider>
        <PageContent />
      </LanguageProvider>
    </>
  );
}
