"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import LiquidBackground from '@/components/LiquidBackground';
import { LanguageProvider } from '@/components/LanguageProvider';
import TopBar from '@/components/TopBar';
import AboutModal from '@/components/AboutModal';

export default function ApiDocs() {
    return (
        <LanguageProvider>
            <ApiDocsContent />
        </LanguageProvider>
    );
}

function ApiDocsContent() {
    const [showAbout, setShowAbout] = useState(false);

    return (
        <>
            <LiquidBackground />
            <TopBar onAboutClick={() => setShowAbout(true)} />
            {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

            <div style={{ position: 'relative', zIndex: 10, padding: '120px 40px 40px 40px', color: '#fff', fontFamily: 'Minecraft, monospace' }}>
                <Link href="/" style={{ fontSize: '1.2rem', textDecoration: 'underline', marginBottom: '20px', display: 'block' }}>&lt; Back to Home</Link>
                <h1>API Documentation</h1>
                <p>Documentation coming soon...</p>
            </div>
        </>
    );
}
