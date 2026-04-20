"use client";
import { useState } from 'react';
import Link from 'next/link';
import LiquidBackground from '@/components/LiquidBackground';
import { LanguageProvider, useLanguage } from '@/components/LanguageProvider';
import TopBar from '@/components/TopBar';
import AboutModal from '@/components/AboutModal';
import styles from '../docs.module.css';

export default function ApiDocs() {
    return (
        <LanguageProvider>
            <ApiDocsContent />
        </LanguageProvider>
    );
}

function ApiDocsContent() {
    const [showAbout, setShowAbout] = useState(false);
    const { language } = useLanguage();
    const copy = language === 'zh-TW' ? zhTwCopy : enCopy;

    return (
        <>
            <LiquidBackground />
            <TopBar onAboutClick={() => setShowAbout(true)} />
            {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

            <div className={styles.shell}>
                <div className={styles.frame}>
                    <Link href="/" className={styles.backLink}>&lt; {copy.back}</Link>

                    <main className={styles.content}>
                            <section id="standard" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{copy.standard.title}</h2>
                                <p className={styles.sectionLead}>
                                    {copy.standard.lead}
                                </p>
                                <div className={styles.gridTwo}>
                                    <article className={styles.endpointCard}>
                                        <div className={styles.endpointTop}>
                                            <span className={styles.method}>GET</span>
                                            <code className={styles.path}>/v1/status/:server?type=java</code>
                                        </div>
                                        <p className={styles.cardText}>{copy.standard.cardLead}</p>
                                        <ul className={styles.list}>
                                            {copy.standard.points.map((point) => (
                                                <li key={point} className={styles.listItem}>{point}</li>
                                            ))}
                                        </ul>
                                    </article>

                                    <article className={styles.endpointCard}>
                                        <div className={styles.endpointTop}>
                                            <span className={styles.method}>{copy.example}</span>
                                            <code className={styles.path}>/v1/status/mc.hypixel.net?type=java</code>
                                        </div>
                                        <pre className={styles.codeBlock}>{`{
  "online": true,
  "host": "mc.hypixel.net",
  "port": 25565,
  "latency": 703,
  "version": {
    "name": "Requires MC 1.8 / 1.21",
    "name_clean": "1.8",
    "protocol": 767
  }
}`}</pre>
                                    </article>
                                </div>
                            </section>

                            <section id="distributed" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{copy.distributed.title}</h2>
                                <p className={styles.sectionLead}>
                                    {copy.distributed.lead}
                                </p>
                                <div className={styles.gridTwo}>
                                    <article className={styles.endpointCard}>
                                        <div className={styles.endpointTop}>
                                            <span className={styles.method}>GET</span>
                                            <code className={styles.path}>/v1/distributed/:server?type=java</code>
                                        </div>
                                        <ul className={styles.list}>
                                            {copy.distributed.points.map((point) => (
                                                <li key={point} className={styles.listItem}>{point}</li>
                                            ))}
                                        </ul>
                                    </article>

                                    <article className={styles.endpointCard}>
                                        <div className={styles.endpointTop}>
                                            <span className={styles.method}>{copy.example}</span>
                                            <code className={styles.path}>/v1/distributed/mc.wynncraft.com?type=java</code>
                                        </div>
                                        <pre className={styles.codeBlock}>{`{
  "target": "mc.wynncraft.com",
  "result_count": 1,
  "nodes": {
    "local-01": {
      "node_region": "Local",
      "status": {
        "online": true,
        "latency": 447
      }
    }
  }
}`}</pre>
                                    </article>
                                </div>
                            </section>

                            <section id="health" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{copy.health.title}</h2>
                                <p className={styles.sectionLead}>{copy.health.lead}</p>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>{copy.table.route}</th>
                                            <th>{copy.table.purpose}</th>
                                            <th>{copy.table.access}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><code>/health</code></td>
                                            <td>{copy.health.publicPurpose}</td>
                                            <td>{copy.health.publicAccess}</td>
                                        </tr>
                                        <tr>
                                            <td><code>/health/details</code></td>
                                            <td>{copy.health.detailsPurpose}</td>
                                            <td>{copy.health.detailsAccess}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>

                            <section id="responses" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{copy.responses.title}</h2>
                                <p className={styles.sectionLead}>{copy.responses.lead}</p>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>{copy.table.field}</th>
                                            <th>{copy.table.meaning}</th>
                                            <th>{copy.table.notes}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><code>online</code></td>
                                            <td>{copy.responses.onlineMeaning}</td>
                                            <td>{copy.responses.onlineNotes}</td>
                                        </tr>
                                        <tr>
                                            <td><code>latency</code></td>
                                            <td>{copy.responses.latencyMeaning}</td>
                                            <td>{copy.responses.latencyNotes}</td>
                                        </tr>
                                        <tr>
                                            <td><code>ip_info</code></td>
                                            <td>{copy.responses.ipInfoMeaning}</td>
                                            <td>{copy.responses.ipInfoNotes}</td>
                                        </tr>
                                        <tr>
                                            <td><code>version</code></td>
                                            <td>{copy.responses.versionMeaning}</td>
                                            <td>{copy.responses.versionNotes}</td>
                                        </tr>
                                        <tr>
                                            <td><code>players</code></td>
                                            <td>{copy.responses.playersMeaning}</td>
                                            <td>{copy.responses.playersNotes}</td>
                                        </tr>
                                        <tr>
                                            <td><code>motd</code></td>
                                            <td>{copy.responses.motdMeaning}</td>
                                            <td>{copy.responses.motdNotes}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>

                            <section id="errors" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{copy.errors.title}</h2>
                                <p className={styles.sectionLead}>{copy.errors.lead}</p>
                                <div className={styles.gridTwo}>
                                    <article className={styles.endpointCard}>
                                        <h3 className={styles.sidebarTitle}>{copy.errors.commonTitle}</h3>
                                        <ul className={styles.list}>
                                            {copy.errors.commonPoints.map((point) => (
                                                <li key={point.code} className={styles.listItem}><code>{point.code}</code> {point.text}</li>
                                            ))}
                                        </ul>
                                    </article>

                                    <article className={styles.endpointCard}>
                                        <h3 className={styles.sidebarTitle}>{copy.errors.headersTitle}</h3>
                                        <ul className={styles.list}>
                                            {copy.errors.headerPoints.map((point) => (
                                                <li key={point.code} className={styles.listItem}><code>{point.code}</code> {point.text}</li>
                                            ))}
                                        </ul>
                                    </article>
                                </div>
                            </section>
                        </main>
                </div>
            </div>
        </>
    );
}

const enCopy = {
    back: 'Back to Home',
    example: 'Example',
    table: {
        route: 'Route',
        purpose: 'Purpose',
        access: 'Access',
        field: 'Field',
        meaning: 'Meaning',
        notes: 'Notes',
    },
    standard: {
        title: 'Standard Status',
        lead: 'Use standard mode when you want one clean answer from the controller itself. This is the simplest endpoint for websites, bots, and routine checks.',
        cardLead: 'Resolves SRV records for Java, performs one direct status ping, and returns normalized DNS and server details.',
        points: [
            'Use `type=java` for Java Edition servers.',
            'Use `type=bedrock` for Bedrock Edition servers.',
            'If no port is provided, Java defaults to `25565` and Bedrock to `19132`.',
        ],
    },
    distributed: {
        title: 'Distributed Status',
        lead: 'Use distributed mode when network location matters. Each connected probe checks the same target and reports back under its own node id and region label.',
        points: [
            'Returns `target`, `result_count`, and `nodes`.',
            'Each node includes its `node_region` and a normalized `status` object.',
            'Displayed DNS chains are kept consistent with the controller view.',
        ],
    },
    health: {
        title: 'Health Endpoints',
        lead: 'Health checks are intentionally split into a public liveness route and a restricted observability route.',
        publicPurpose: 'Minimal uptime signal for load balancers and public monitoring.',
        publicAccess: 'Public',
        detailsPurpose: 'Probe inventory, pending task count, task metrics, and recent errors.',
        detailsAccess: 'Restricted by `HEALTH_DETAILS_WHITELIST`',
    },
    responses: {
        title: 'Response Shape',
        lead: 'Standard and distributed mode now share the same formatting rules for core status objects. That means API consumers can parse the same field names and content conventions in both modes.',
        onlineMeaning: 'Server ping result',
        onlineNotes: '`false` when DNS lookup fails, connection times out, or ping parsing fails.',
        latencyMeaning: 'Round-trip time in milliseconds',
        latencyNotes: 'Available for successful Java and Bedrock responses.',
        ipInfoMeaning: 'Resolved IP data and DNS chain',
        ipInfoNotes: 'May include `ip`, `ips`, `srv_record`, `asn`, `location`, `dns_records`.',
        versionMeaning: 'Reported Minecraft version block',
        versionNotes: '`name_clean` is normalized to a stable value like `1.8` or `1.26.10`.',
        playersMeaning: 'Online player counts',
        playersNotes: 'Empty player sample arrays are stripped so consumers do not need to special-case them.',
        motdMeaning: 'Raw, clean, and HTML-formatted description',
        motdNotes: 'HTML output is normalized for consistent styling across both modes.',
    },
    errors: {
        title: 'Errors & Limits',
        lead: 'The API returns structured HTTP status codes and plain JSON error payloads. Plan for controller-side rate limiting and user input mistakes.',
        commonTitle: 'Common error responses',
        headersTitle: 'Headers to watch',
        commonPoints: [
            { code: '400', text: 'Missing or invalid `type` parameter.' },
            { code: '403', text: '`/health/details` requested from a non-whitelisted IP.' },
            { code: '429', text: 'Rate limit reached for the current scope.' },
            { code: '503', text: 'No connected probe nodes are available for distributed mode.' },
        ],
        headerPoints: [
            { code: 'X-RateLimit-Limit', text: 'total quota for the active window.' },
            { code: 'X-RateLimit-Remaining', text: 'requests left before throttling.' },
            { code: 'Retry-After', text: 'seconds to wait after a `429`.' },
        ],
    },
};

const zhTwCopy: typeof enCopy = {
    back: '返回首頁',
    example: '範例',
    table: {
        route: '路徑',
        purpose: '用途',
        access: '存取權限',
        field: '欄位',
        meaning: '意義',
        notes: '說明',
    },
    standard: {
        title: '標準模式',
        lead: '當你只需要 controller 給出一個乾淨結果時，請使用標準模式。這是網站、機器人與日常查詢最簡單的 API 入口。',
        cardLead: 'Java 會先解析 SRV，再進行單點狀態探測，最後回傳正規化後的 DNS 與伺服器資訊。',
        points: [
            'Java 版伺服器請使用 `type=java`。',
            '基岩版伺服器請使用 `type=bedrock`。',
            '若未提供連接埠，Java 預設為 `25565`，Bedrock 預設為 `19132`。',
        ],
    },
    distributed: {
        title: '分散式模式',
        lead: '當網路地理位置會影響結果時，請使用分散式模式。每個已連線的 probe 都會檢查同一個目標，並依自己的節點與區域回傳結果。',
        points: [
            '回傳格式包含 `target`、`result_count` 與 `nodes`。',
            '每個節點都會有 `node_region` 與正規化後的 `status` 物件。',
            '顯示的 DNS chain 會與 controller 視角保持一致。',
        ],
    },
    health: {
        title: '健康檢查',
        lead: '健康檢查刻意拆成公開的存活探測端點，以及受限制的詳細觀測端點。',
        publicPurpose: '提供給負載平衡器或公開監控使用的最小存活訊號。',
        publicAccess: '公開',
        detailsPurpose: '提供 probe 清單、待處理 task 數量、task 指標與近期錯誤。',
        detailsAccess: '受 `HEALTH_DETAILS_WHITELIST` 限制',
    },
    responses: {
        title: '回應結構',
        lead: '現在標準模式與分散式模式共用同一套核心欄位格式規則，因此 API 使用者可以用相同方式解析兩種模式的主要回應欄位。',
        onlineMeaning: '伺服器探測結果',
        onlineNotes: '當 DNS 查詢失敗、連線逾時或 ping 解析失敗時會是 `false`。',
        latencyMeaning: '來回延遲毫秒數',
        latencyNotes: 'Java 與 Bedrock 成功回應時都會提供。',
        ipInfoMeaning: '解析後的 IP 與 DNS chain 資訊',
        ipInfoNotes: '可能包含 `ip`、`ips`、`srv_record`、`asn`、`location`、`dns_records`。',
        versionMeaning: 'Minecraft 版本資訊區塊',
        versionNotes: '`name_clean` 會被正規化成像 `1.8` 或 `1.26.10` 這種穩定值。',
        playersMeaning: '線上玩家資訊',
        playersNotes: '空的玩家 sample 陣列會被移除，前端不需要特別判斷。',
        motdMeaning: '原始、純文字與 HTML 版 MOTD',
        motdNotes: 'HTML 輸出已正規化，兩種模式會保持一致的樣式格式。',
    },
    errors: {
        title: '錯誤與限制',
        lead: 'API 會回傳結構化的 HTTP 狀態碼與純 JSON 錯誤內容。整合時請預期限流與使用者輸入錯誤。',
        commonTitle: '常見錯誤回應',
        headersTitle: '值得注意的 Header',
        commonPoints: [
            { code: '400', text: '缺少或傳入了無效的 `type` 參數。' },
            { code: '403', text: '非白名單 IP 存取了 `/health/details`。' },
            { code: '429', text: '目前 scope 已達到 rate limit。' },
            { code: '503', text: '分散式模式目前沒有可用的 probe 節點。' },
        ],
        headerPoints: [
            { code: 'X-RateLimit-Limit', text: '目前視窗內的總配額。' },
            { code: 'X-RateLimit-Remaining', text: '在被限流前剩餘的請求數。' },
            { code: 'Retry-After', text: '收到 `429` 後建議等待的秒數。' },
        ],
    },
};
