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
        error_failed: "Request Failed",
        error_connection_title: "Unable to Reach API",
        error_connection_body: "The dashboard could not connect to the API service. Check whether the API server is running and whether the configured API base URL is correct.",
        error_timeout_title: "Request Timed Out",
        error_timeout_body: "The API did not finish responding in time. This can happen when the target server is slow to answer, DNS resolution is delayed, or distributed mode is waiting for probes.",
        error_bad_request_title: "Invalid Request",
        error_bad_request_body: "The request was rejected by the API. Please review the server address and query parameters, then try again.",
        error_unavailable_title: "Service Temporarily Unavailable",
        error_unavailable_body: "The API is running, but it cannot process this request right now. In distributed mode, this usually means no probe nodes are currently connected.",
        error_server_title: "API Internal Error",
        error_server_body: "The API encountered an internal error while processing the request. Check the controller logs for the exact failure.",
        error_http_title: "API Request Failed",
        error_http_body_prefix: "The API returned HTTP status",
        error_details_prefix: "Details:",
        error_backend_missing_type: "The API expected a server type parameter, but it was not included in the request.",
        error_backend_no_probes: "No distributed probe nodes are currently available. Wait for probes to reconnect, or switch back to Standard mode.",
        error_backend_invalid_hostname: "The server address format looks invalid. Please enter a valid hostname or IP address.",
        error_backend_internal: "The API reported an internal server error.",
        error_backend_dns_failed_prefix: "DNS resolution failed for",
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
        error_failed: "請求失敗",
        error_connection_title: "無法連線到 API",
        error_connection_body: "前端無法連線到 API 服務。請確認 API 伺服器是否正在執行，以及目前設定的 API 位址是否正確。",
        error_timeout_title: "請求逾時",
        error_timeout_body: "API 在時限內沒有完成回應。這可能是目標伺服器回應過慢、DNS 解析延遲，或分散式模式正在等待探測節點結果。",
        error_bad_request_title: "請求格式不正確",
        error_bad_request_body: "API 拒絕了這次請求。請重新確認伺服器位址與查詢參數後再試一次。",
        error_unavailable_title: "服務暫時不可用",
        error_unavailable_body: "API 服務雖然在線，但目前無法處理這次請求。在分散式模式下，通常代表現在沒有任何可用的 Probe 節點。",
        error_server_title: "API 內部錯誤",
        error_server_body: "API 在處理請求時發生內部錯誤。建議直接查看 controller 日誌以確認實際原因。",
        error_http_title: "API 請求失敗",
        error_http_body_prefix: "API 回傳了 HTTP 狀態碼",
        error_details_prefix: "詳細資訊：",
        error_backend_missing_type: "API 預期要收到伺服器類型參數，但這次請求中沒有帶入。",
        error_backend_no_probes: "目前沒有任何可用的分散式 Probe 節點。請等待節點重新連上，或先切換回標準模式。",
        error_backend_invalid_hostname: "輸入的伺服器位址格式看起來不正確。請輸入有效的主機名稱或 IP 位址。",
        error_backend_internal: "API 回報了內部伺服器錯誤。",
        error_backend_dns_failed_prefix: "DNS 解析失敗，目標主機為",
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
