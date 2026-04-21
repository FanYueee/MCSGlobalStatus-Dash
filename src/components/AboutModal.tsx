"use client";

import Image from 'next/image';
import styles from './GlassCard.module.css'; // Reusing GlassCard styles for consistency
import { useLanguage } from './LanguageProvider';

interface AboutModalProps {
    onClose: () => void;
}

export default function AboutModal({ onClose }: AboutModalProps) {
    const { t } = useLanguage();

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            boxSizing: 'border-box',
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(5px)'
        }} onClick={onClose}>
            <div
                className={styles.glassCard}
                style={{
                    width: 'min(600px, 100%)',
                    maxWidth: '100%',
                    maxHeight: 'calc(100vh - 24px)',
                    overflowY: 'auto',
                    cursor: 'default'
                }}
                onClick={e => e.stopPropagation()}
            >
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, textShadow: '2px 2px 0 #000' }}>{t('about_title')}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                            fontFamily: 'Minecraft, monospace',
                            fontSize: '1.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        X
                    </button>
                </div>
                <div style={{ lineHeight: '1.6', fontSize: '1rem', color: '#dddddd', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <p style={{ margin: 0 }}>{t('about_desc')}</p>

                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h3 style={{ margin: '0 0 12px 0', color: '#FFFF55', fontSize: '1.1rem', textShadow: '1px 1px 0 #000' }}>
                            {t('about_sponsor_title')}
                        </h3>
                        <a href="https://vproxy.cloud" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', marginBottom: '12px' }}>
                            <Image
                                src="/vproxy_logo.png"
                                alt="vProxy Cloud"
                                width={240}
                                height={60}
                                style={{ height: '60px', width: 'auto', maxWidth: '100%' }}
                            />
                        </a>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#ccc' }}>
                            {t('about_sponsor_desc')}
                        </p>
                    </div>

                    <div>
                        <p style={{ margin: '0 0 8px 0' }}>{t('about_contact_email')}</p>
                        <a href="mailto:fanyueee@vproxy.cloud" style={{ color: '#55FFFF', textDecoration: 'underline' }}>
                            fanyueee@vproxy.cloud
                        </a>
                    </div>

                    <p style={{ margin: 0, textAlign: 'center', color: '#AAAAAA' }}>{t('about_thanks')}</p>
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
                    {t('copyright')}
                </div>
            </div>
        </div>
    );
}
