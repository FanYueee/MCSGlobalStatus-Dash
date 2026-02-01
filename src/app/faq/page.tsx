"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import LiquidBackground from '@/components/LiquidBackground';
import { LanguageProvider } from '@/components/LanguageProvider';
import TopBar from '@/components/TopBar';
import AboutModal from '@/components/AboutModal';

export default function FAQ() {
    return (
        <LanguageProvider>
            <FAQContent />
        </LanguageProvider>
    );
}

function FAQContent() {
    const [showAbout, setShowAbout] = useState(false);

    return (
        <>
            <LiquidBackground />
            <TopBar onAboutClick={() => setShowAbout(true)} />
            {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

            <div style={{ position: 'relative', zIndex: 10, padding: '120px 40px 40px 40px', color: '#fff', fontFamily: 'Minecraft, monospace' }}>
                <Link href="/" style={{ fontSize: '1.2rem', textDecoration: 'underline', marginBottom: '20px', display: 'block' }}>&lt; Back to Home</Link>
                <h1>Frequently Asked Questions</h1>
                <p>FAQ content coming soon...</p>
            </div>
        </>
    );
}
