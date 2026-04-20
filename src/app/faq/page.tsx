"use client";
import { useState } from 'react';
import Link from 'next/link';
import LiquidBackground from '@/components/LiquidBackground';
import { LanguageProvider, useLanguage } from '@/components/LanguageProvider';
import TopBar from '@/components/TopBar';
import AboutModal from '@/components/AboutModal';
import styles from '../docs.module.css';

export default function FAQ() {
    return (
        <LanguageProvider>
            <FAQContent />
        </LanguageProvider>
    );
}

function FAQContent() {
    const [showAbout, setShowAbout] = useState(false);
    const [openIndex, setOpenIndex] = useState<number>(0);
    const { language } = useLanguage();
    const copy = language === 'zh-TW' ? zhTwFaqCopy : enFaqCopy;

    return (
        <>
            <LiquidBackground />
            <TopBar onAboutClick={() => setShowAbout(true)} />
            {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

            <div className={styles.shell}>
                <div className={styles.frame}>
                    <Link href="/" className={styles.backLink}>&lt; {copy.back}</Link>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>{copy.title}</h2>
                        <p className={styles.sectionLead}>{copy.lead}</p>

                        <div className={styles.faqList}>
                            {copy.items.map((item, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <article
                                        key={item.question}
                                        className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ''}`}
                                    >
                                        <button
                                            type="button"
                                            className={styles.faqButton}
                                            onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                            aria-expanded={isOpen}
                                        >
                                            <span className={styles.faqQuestion}>{item.question}</span>
                                            <span className={styles.faqArrow}>▼</span>
                                        </button>

                                        {isOpen && (
                                            <div className={styles.faqAnswer}>
                                                <div className={styles.faqAnswerInner}>
                                                    <p style={{ marginTop: 16 }}>{item.answer}</p>
                                                </div>
                                            </div>
                                        )}
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

const enFaqCopy = {
    back: 'Back to Home',
    title: 'Frequently Asked Questions',
    lead: 'Open a block to read the answer. The layout is intentionally menu-like, closer to an in-game server selector than a generic support page.',
    items: [
        {
            question: 'What is the difference between Standard and Distributed mode?',
            answer: 'Standard mode is a single-controller lookup. It is the fastest option and is ideal for websites, launchers, or bots that only need one answer. Distributed mode sends the same request to connected probes, so you can compare results from multiple network locations.',
        },
        {
            question: 'Why can Standard mode show online while Distributed mode shows offline?',
            answer: 'That usually means the target behaves differently from another network path. A firewall, geo-routing rule, provider outage, or DNS split can affect one region but not another. That difference is expected and is one of the reasons distributed probes exist.',
        },
        {
            question: 'Why do the IPs or latency values differ between nodes?',
            answer: 'Different probes can resolve the same hostname to different Anycast or geo-balanced IPs. Latency also depends on where the probe is physically located and which path it takes through the network.',
        },
        {
            question: 'Do I need to run my own probe to use the project?',
            answer: 'No. The frontend and controller work without probes by using Standard mode. You only need probes if you want region-aware visibility through the distributed endpoint.',
        },
        {
            question: 'How is Java SRV support handled?',
            answer: 'For Java lookups, the controller resolves SRV records before pinging the target. The response can include both the SRV target and the visible DNS chain, so custom domains still show their indirection clearly.',
        },
        {
            question: 'Why is /health/details restricted?',
            answer: 'Detailed health output reveals internal probe state, pending tasks, recent errors, and node metadata. That information is useful for operators but should not be exposed to everyone on the public internet, so it is protected by an IP allowlist.',
        },
        {
            question: 'What does rate limiting mean for API users?',
            answer: 'The API tracks requests per scope and per client IP. If you exceed the quota, the controller responds with HTTP 429 and rate limit headers. Client applications should back off when they receive Retry-After.',
        },
        {
            question: 'Does Bedrock use port 19132 automatically?',
            answer: 'Yes. If you do not provide an explicit port and request a Bedrock check, the controller switches from the Java default 25565 to 19132 before sending the ping.',
        },
    ],
};

const zhTwFaqCopy: typeof enFaqCopy = {
    back: '返回首頁',
    title: '常見問題',
    lead: '點開問題即可查看答案。這頁刻意維持像遊戲選單一樣的閱讀方式，而不是一般文件網站的 FAQ 排版。',
    items: [
        {
            question: '標準模式和分散式模式有什麼差別？',
            answer: '標準模式是由 controller 單點直接查詢，速度最快，適合網站、機器人或一般快速檢查。分散式模式則會把同一個請求送到已連線的 probe，讓你比較不同網路位置看到的結果。',
        },
        {
            question: '為什麼標準模式顯示在線，但分散式模式顯示離線？',
            answer: '這通常代表目標主機在不同網路路徑下行為不同。防火牆、地理路由、服務商異常或 DNS split 都可能讓某個地區能連，另一個地區不能連。這正是分散式探測存在的價值之一。',
        },
        {
            question: '為什麼不同節點看到的 IP 或延遲不同？',
            answer: '同一個主機名稱可能會因為 Anycast 或地理負載平衡而解析到不同 IP。延遲也會受到 probe 實際所在位置與路徑影響，因此不同節點看到的數值不一定相同。',
        },
        {
            question: '要使用這個專案一定要自己跑 probe 嗎？',
            answer: '不一定。前端與 controller 在沒有 probe 的情況下仍可透過標準模式運作。只有在你需要不同區域視角時，才需要額外部署 probe。',
        },
        {
            question: 'Java 的 SRV 支援是怎麼處理的？',
            answer: 'Java 查詢會先解析 SRV，再對實際目標做探測。回應中也可以看到 SRV target 與可見的 DNS chain，所以即使使用自訂網域，也能清楚看到中間轉向。',
        },
        {
            question: '為什麼 /health/details 需要受限制？',
            answer: '詳細 health 會暴露 probe 狀態、待處理 task、近期錯誤與節點資訊。這些資料對維運很有用，但不適合直接公開給所有人，因此會受到 IP allowlist 保護。',
        },
        {
            question: 'API 的 rate limit 對使用者代表什麼？',
            answer: 'API 會依照 scope 與 client IP 計算配額。超過限制後 controller 會回傳 HTTP 429 與對應 header。整合方應該在收到 Retry-After 後暫停重試。',
        },
        {
            question: 'Bedrock 會自動使用 19132 port 嗎？',
            answer: '會。如果你沒有明確指定 port，且查詢類型是 Bedrock，controller 會把 Java 預設的 25565 自動切換成 19132 再送出探測。',
        },
    ],
};
