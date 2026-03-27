"use client";

import React, { createContext, useContext, useState, useSyncExternalStore } from 'react';

type Language = 'en' | 'zh-TW';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const translations = {
    en: {
        title: "MCBoxes",
        subtitle: "Minecraft Server Status Checker",
        placeholder: "Enter server address (e.g., mc.hypixel.net)",
        auto: "Auto",
        java: "Java",
        bedrock: "Bedrock",
        both: "Both (Side by Side)",
        check: "Check Status",
        analyzing: "Analyzing Network Route...",
        online: "ONLINE",
        offline: "OFFLINE",
        players: "Players",
        latency: "Latency",
        location: "Location",
        ip: "IP Address",
        protocol: "Protocol",
        software: "Software",
        srv: "SRV Record",
        asn: "ASN (ISP)",
        error_empty: "Please enter a server address",
        error_failed: "Failed to connect to API",
        copyright: "Copyright © 2026 FanYueee",
        mode_standard: "Standard",
        mode_distributed: "Distributed",
        global_nodes: "Global Nodes",
        dns_records: "DNS Records",
        dns_hostname: "Hostname",
        dns_type: "Type",
        dns_data: "Data",
        no_active_probes: "No Active Probes",
        nav_api: "API",
        nav_about: "About",
        nav_faq: "FAQ",
        about_title: "About MCBoxes",
        about_desc: "MCBoxes is a tool page providing Minecraft server detection tools, supporting multi-region node detection, easy to detect and use.",
        about_sponsor_title: "Hosting Sponsor",
        about_sponsor_desc: "Professional Minecraft hosting platform in Taiwan and Asia-Pacific, providing multiple deployment nodes in the Asia-Pacific region.",
        about_contact_title: "Contact",
        about_contact_email: "If you have questions or want to provide a Probe, please contact:",
        about_thanks: "Thank you very much"
    },
    'zh-TW': {
        title: "MCBoxes",
        subtitle: "Minecraft 伺服器狀態查詢系統",
        placeholder: "輸入伺服器位置 (例如 mc.hypixel.net)",
        auto: "自動偵測",
        java: "Java",
        bedrock: "基岩版",
        both: "兩者並排顯示",
        check: "查詢狀態",
        analyzing: "分析網路路徑與節點中...",
        online: "在線",
        offline: "離線",
        players: "線上玩家",
        latency: "延遲",
        location: "地理位置",
        ip: "IP 位址",
        protocol: "協定版本",
        software: "伺服器核心",
        srv: "SRV 紀錄",
        asn: "ISP 業者",
        error_empty: "請輸入伺服器地址",
        error_failed: "無法連接至 API",
        copyright: "Copyright © 2026 FanYueee",
        mode_standard: "標準模式",
        mode_distributed: "分佈式",
        global_nodes: "全球節點",
        dns_records: "DNS 紀錄",
        dns_hostname: "主機名稱",
        dns_type: "類型",
        dns_data: "內容",
        no_active_probes: "無可用探測節點",
        nav_api: "API",
        nav_about: "關於此頁",
        nav_faq: "常見問題",
        about_title: "關於 MCBoxes",
        about_desc: "MCBoxes 是一個工具頁面，提供 Minecraft 伺服器檢測工具，並且支援多個不同地區節點檢測，易於檢測與利用。",
        about_sponsor_title: "主機贊助商",
        about_sponsor_desc: "台灣與亞太地區的專業 Minecraft 託管平台，在亞太地區提供多個部署節點。",
        about_contact_title: "聯絡我們先",
        about_contact_email: "有問題或想提供 Probe 可以透過以下方式聯絡:",
        about_thanks: "非常感謝"
    }
};

type TranslationKey = keyof typeof translations.en;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectLanguage(): Language {
    if (typeof window === 'undefined') {
        return 'en';
    }

    const browserLang = navigator.language.toLowerCase();
    return browserLang.includes('zh') || browserLang.includes('tw') || browserLang.includes('hk')
        ? 'zh-TW'
        : 'en';
}

function subscribeToLanguageChange(onStoreChange: () => void): () => void {
    void onStoreChange;
    return () => {};
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const detectedLanguage = useSyncExternalStore(
        subscribeToLanguageChange,
        detectLanguage,
        () => null
    );
    const [languageOverride, setLanguageOverride] = useState<Language | null>(null);
    const language = languageOverride ?? detectedLanguage;

    const t = (key: TranslationKey) => {
        return translations[language][key];
    };

    if (!language) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: setLanguageOverride, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
