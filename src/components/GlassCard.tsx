"use client";

import React, { useState, useEffect } from 'react';
import styles from './GlassCard.module.css';
import { useLanguage } from './LanguageProvider';

interface DnsRecord {
    hostname: string;
    type: 'SRV' | 'A' | 'AAAA' | 'CNAME';
    data: string;
}

interface ServerResult {
    online: boolean;
    host: string;
    port: number;
    type?: 'java' | 'bedrock';
    version?: { name: string; name_clean: string; protocol: number };
    players?: { online: number; max: number };
    motd?: { raw: string; clean: string; html: string };
    favicon?: string;
    error?: string;
    ip_info?: {
        ip: string;
        ips?: string[];
        asn?: { number: number; org: string } | { number: number; org: string }[];
        location?: { country: string; city?: string };
        dns_records?: DnsRecord[];
    };
}


// Protocol to version mapping (Java Edition)
const JAVA_PROTOCOL_VERSIONS: Record<number, string> = {
    774: '1.21.11',
    773: '1.21.9',
    772: '1.21.7',
    771: '1.21.6',
    770: '1.21.5',
    769: '1.21.2',
    768: '1.21.1',
    767: '1.21',
    766: '1.20.5',
    765: '1.20.3',
    764: '1.20.2',
    763: '1.20.1',
    762: '1.19.4',
    761: '1.19.3',
    760: '1.19.2',
    759: '1.19',
    758: '1.18.2',
    757: '1.18.1',
    756: '1.17.1',
    755: '1.17',
    754: '1.16.5',
    753: '1.16.3',
    751: '1.16.2',
    736: '1.16.1',
    735: '1.16',
    578: '1.15.2',
    575: '1.15.1',
    573: '1.15',
    498: '1.14.4',
    490: '1.14.3',
    485: '1.14.2',
    480: '1.14.1',
    477: '1.14',
    404: '1.13.2',
    393: '1.13',
    340: '1.12.2',
    338: '1.12.1',
    335: '1.12',
    315: '1.11',
    210: '1.10',
    110: '1.9.4',
    109: '1.9.2',
    108: '1.9.1',
    107: '1.9',
    47: '1.8.9',
    5: '1.7.10',
    4: '1.7.5',
};

// Protocol to version mapping (Bedrock Edition)
const BEDROCK_PROTOCOL_VERSIONS: Record<number, string> = {
    898: '1.21.130',
    794: '1.21.80',
    766: '1.21.60',
    765: '1.21.50',
    748: '1.21.40',
    729: '1.21.30',
    712: '1.21.20',
    686: '1.21.0',
    685: '1.20.80',
    671: '1.20.70',
    662: '1.20.60',
    649: '1.20.50',
    630: '1.20.40',
    618: '1.20.30',
    594: '1.20.10',
    589: '1.20.0',
};

function getVersionFromProtocol(protocol: number, type?: 'java' | 'bedrock'): string {
    if (type === 'bedrock') {
        return BEDROCK_PROTOCOL_VERSIONS[protocol] || `${protocol}`;
    }
    return JAVA_PROTOCOL_VERSIONS[protocol] || `${protocol}`;
}

function ServerCard({ result, label }: { result: ServerResult; label?: string }) {
    const { t } = useLanguage();
    const [dnsExpanded, setDnsExpanded] = useState(false);

    return (
        <div className={styles.result}>
            <div className={styles.resultHeader}>
                {result.favicon ? (
                    <img src={result.favicon} alt="Favicon" className={styles.favicon} />
                ) : (
                    <div className={styles.faviconPlaceholder}>?</div>
                )}
                <div className={styles.headerInfo}>
                    <h3>{label || result.host}</h3>
                    <div className={styles.tags}>
                        <span className={result.online ? styles.tagOnline : styles.tagOffline}>
                            {result.online ? t('online') : t('offline')}
                        </span>
                        {result.online && result.type && (
                            <span className={styles.tagType}>
                                {result.type === 'java' ? 'Java' : 'Bedrock'}
                            </span>
                        )}
                        {result.version && <span className={styles.tagVersion}>{result.version.name}</span>}
                    </div>
                </div>
            </div>

            {result.motd && (
                <div className={styles.motdBox} dangerouslySetInnerHTML={{ __html: result.motd.html }} />
            )}

            {result.online && (
                <>
                    <div className={styles.statsRow}>
                        <div className={styles.statBox}>
                            <span className={styles.statLabel}>{t('players')}</span>
                            <span className={styles.statValue}>{result.players?.online || 0} <span className={styles.statSub}>/ {result.players?.max}</span></span>
                        </div>
                    </div>

                    <div className={styles.metaInfo}>
                        {result.version && (
                            <div className={styles.metaRow}>
                                <span>{t('protocol')}</span>
                                <span>{getVersionFromProtocol(result.version.protocol, result.type)} ({result.version.protocol})</span>
                            </div>
                        )}
                        <div className={styles.metaRow}>
                            <span>{t('ip')}</span>
                            <span
                                className={styles.mono}
                                style={{ cursor: 'pointer' }}
                                title="Click to copy"
                                onClick={() => {
                                    const text = result.ip_info?.ip || result.host;
                                    if (navigator.clipboard && navigator.clipboard.writeText) {
                                        navigator.clipboard.writeText(text).catch(err => {
                                            console.error('Failed to copy: ', err);
                                        });
                                    } else {
                                        // Fallback for insecure contexts
                                        const textArea = document.createElement("textarea");
                                        textArea.value = text;
                                        textArea.style.position = "fixed";
                                        document.body.appendChild(textArea);
                                        textArea.focus();
                                        textArea.select();
                                        try {
                                            document.execCommand('copy');
                                        } catch (err) {
                                            console.error('Fallback: Oops, unable to copy', err);
                                        }
                                        document.body.removeChild(textArea);
                                    }
                                }}
                            >
                                {result.ip_info?.ip || result.host}
                            </span>
                        </div>
                        <div className={styles.metaRow}>
                            <span>Port</span>
                            <span className={styles.mono}>{result.port}</span>
                        </div>
                        <div className={styles.metaRow}>
                            <span>ISP / ASN</span>
                            <span>{
                                result.ip_info?.asn
                                    ? Array.isArray(result.ip_info.asn)
                                        ? result.ip_info.asn.map(a => `AS${a.number} ${a.org}`).join(' / ')
                                        : `AS${result.ip_info.asn.number} ${result.ip_info.asn.org}`
                                    : 'N/A'
                            }</span>
                        </div>
                        <div className={styles.metaRow}>
                            <span>{t('location')}</span>
                            <span>{result.ip_info?.location?.country ? (result.ip_info.location.city ? `${result.ip_info.location.city}, ${result.ip_info.location.country}` : result.ip_info.location.country) : 'Unknown'}</span>
                        </div>
                    </div>

                    {result.ip_info?.dns_records && result.ip_info.dns_records.length > 0 && (
                        <div className={styles.dnsSection}>
                            <button
                                className={styles.dnsToggle}
                                onClick={() => setDnsExpanded(!dnsExpanded)}
                            >
                                <span>{t('dns_records')}</span>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    style={{ transform: dnsExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                                >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                            <div className={`${styles.dnsWrapper} ${dnsExpanded ? styles.expanded : ''}`}>
                                <div className={styles.dnsInner}>
                                    <div className={styles.dnsTable}>
                                        <div className={styles.dnsHeader}>
                                            <span>{t('dns_hostname')}</span>
                                            <span>{t('dns_type')}</span>
                                            <span>{t('dns_data')}</span>
                                        </div>
                                        {result.ip_info.dns_records.map((record, index) => (
                                            <div key={index} className={styles.dnsRow}>
                                                <span className={styles.mono}>{record.hostname}</span>
                                                <span className={styles.dnsType}>{record.type}</span>
                                                <span className={styles.mono}>{record.data}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )
            }



            {
                !result.online && result.error && (
                    <div className={styles.offlineMessage}>
                        Reason: {result.error}
                    </div>
                )
            }

            {/* DNS Records for offline servers */}
            {!result.online && result.ip_info?.dns_records && result.ip_info.dns_records.length > 0 && (
                <div className={styles.dnsSection}>
                    <button
                        className={styles.dnsToggle}
                        onClick={() => setDnsExpanded(!dnsExpanded)}
                    >
                        <span>{t('dns_records')}</span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            style={{ transform: dnsExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <div className={`${styles.dnsWrapper} ${dnsExpanded ? styles.expanded : ''}`}>
                        <div className={styles.dnsInner}>
                            <div className={styles.dnsTable}>
                                <div className={styles.dnsHeader}>
                                    <span>{t('dns_hostname')}</span>
                                    <span>{t('dns_type')}</span>
                                    <span>{t('dns_data')}</span>
                                </div>
                                {result.ip_info.dns_records.map((record, index) => (
                                    <div key={index} className={styles.dnsRow}>
                                        <span className={styles.mono}>{record.hostname}</span>
                                        <span className={styles.dnsType}>{record.type}</span>
                                        <span className={styles.mono}>{record.data}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}


interface GlassCardProps {
    mode: 'standard' | 'distributed';
}

export default function GlassCard({ mode }: GlassCardProps) {
    const { t } = useLanguage();
    const [server, setServer] = useState('');
    const [type, setType] = useState<'java' | 'bedrock'>('java');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ServerResult | null>(null);
    const [distributedResult, setDistributedResult] = useState<any>(null);
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [errorHeader, setErrorHeader] = useState('');
    const [errorBody, setErrorBody] = useState('');

    // Reset results when mode changes
    useEffect(() => {
        setResult(null);
        setDistributedResult(null);
        setSelectedNode(null);
        setErrorHeader('');
        setErrorBody('');
    }, [mode]);

    const handleSearch = async () => {
        if (!server.trim()) {
            setErrorHeader(t('error_empty'));
            setErrorBody('');
            return;
        }

        // Reset State
        setErrorHeader('');
        setErrorBody('');
        setResult(null);
        setDistributedResult(null);
        setSelectedNode(null);
        setLoading(true);

        try {
            const API_BASE = 'http://localhost:3000';
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), mode === 'distributed' ? 20000 : 15000); // 20s for distributed might need more time

            let endpoint = mode === 'distributed'
                ? `/v1/distributed/${encodeURIComponent(server.trim())}`
                : `/v1/status/${encodeURIComponent(server.trim())}`;

            let url = `${API_BASE}${endpoint}?type=${type}`;

            let res;
            try {
                res = await fetch(url, { signal: controller.signal });
            } catch (err: any) {
                if (err.name === 'AbortError') {
                    throw new Error('Request Timeout');
                }
                throw new Error('Connection Failed');
            } finally {
                clearTimeout(timeoutId);
            }

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();
            // await new Promise(r => setTimeout(r, 500)); // Delay for effect

            if (mode === 'distributed') {
                setDistributedResult(data);
                // Auto-select first node
                if (data.nodes && Object.keys(data.nodes).length > 0) {
                    setSelectedNode(Object.values(data.nodes)[0]);
                }
            } else {
                setResult(data);
            }

        } catch (err: any) {
            console.error("API Error:", err);
            setErrorHeader(t('error_failed'));
            setErrorBody(err.message || 'Unknown Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.glassCard}>
                {/* Input Section */}
                <div className={styles.controls}>
                    <label className={styles.inputLabel}>{t('placeholder')}</label>

                    <div className={styles.combinedInputRow}>
                        {/* Type Toggle Button (Minecraft Style) */}
                        <button
                            className={`${styles.searchBtn} ${styles.typeToggleBtn}`}
                            onClick={() => {
                                setType(type === 'java' ? 'bedrock' : 'java');
                            }}
                            type="button"
                            disabled={loading}
                        >
                            {type === 'java' && t('java')}
                            {type === 'bedrock' && t('bedrock')}
                        </button>

                        {/* Input Field */}
                        <div className={styles.inputContainer}>
                            <div className={styles.inputBoxWrapper}>
                                <div className={styles.inputMirror}>
                                    {server}<span className={styles.blinkingUnderscore}>_</span>
                                </div>
                                <input
                                    type="text"
                                    value={server}
                                    onChange={(e) => setServer(e.target.value)}
                                    placeholder=""
                                    className={styles.input}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    autoComplete="off"
                                    spellCheck={false}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className={styles.searchBtn}
                        >
                            {loading ? (
                                <div className={styles.spinner}></div>
                            ) : (
                                t('check')
                            )}
                        </button>
                    </div>
                </div>

                {/* Error Display */}
                {(errorHeader || errorBody) && (
                    <div className={styles.errorContainer}>
                        <div className={styles.errorIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        </div>
                        <div>
                            <h4>{errorHeader}</h4>
                            <p>{errorBody}</p>
                        </div>
                    </div>
                )}

                {/* Distributed Result Display */}
                {mode === 'distributed' && distributedResult && (
                    <div className={styles.distributedLayout}>
                        {/* Left Sidebar: Node List */}
                        <div className={styles.nodeSidebar}>
                            <h3 className={styles.sidebarTitle}>{t('global_nodes')} ({distributedResult.result_count})</h3>
                            {Object.keys(distributedResult.nodes).length === 0 ? (
                                <div className={styles.errorContainer}>
                                    <div className={styles.errorHeader}>{t('no_active_probes')}</div>
                                </div>
                            ) : (
                                <div className={styles.nodeList}>
                                    {Object.entries(distributedResult.nodes).map(([nodeId, node]: [string, any]) => (
                                        <button
                                            key={nodeId}
                                            className={`${styles.nodeItem} ${selectedNode === node ? styles.selectedNode : ''}`}
                                            onClick={() => setSelectedNode(node)}
                                        >
                                            <div className={styles.nodeInfo}>
                                                <span className={styles.nodeRegion}>{node.node_region}</span>
                                                <span className={styles.nodeIp}>
                                                    {node.status.ip_info?.ip || node.status.host}
                                                    {node.status.ip_info?.location?.country && ` - ${node.status.ip_info.location.country}`}
                                                </span>
                                            </div>

                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Content: Selected Node Detail */}
                        <div className={styles.nodeDetail}>
                            {selectedNode ? (
                                <ServerCard
                                    result={selectedNode.status}
                                    label={selectedNode.status.host}
                                />
                            ) : (
                                <div className={styles.emptyDetail}>
                                    <p>Select a node to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Standard Results Display */}
                {mode === 'standard' && result && (
                    <ServerCard result={result} />
                )}
            </div>
        </div>
    );
}