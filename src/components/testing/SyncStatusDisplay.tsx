"use client";

import { useState, useEffect } from 'react';
import useLocalSync from '@/hooks/useLocalSync';

interface SyncEvent {
    timestamp: number;
    clientId: string;
    folderId: string | null;
    source: 'local' | 'external';
}

export default function SyncStatusDisplay() {
    // ✨ Just pass the event name - types and validation are automatic!
    const [val, setVal] = useLocalSync('client-folder-change');

    const [syncHistory, setSyncHistory] = useState<SyncEvent[]>([]);
    const [lastUpdate, setLastUpdate] = useState<number>(Date.now());
    const [updateCount, setUpdateCount] = useState(0);

    useEffect(() => {
        if (val) {
            const event: SyncEvent = {
                timestamp: Date.now(),
                clientId: val.clientId,
                folderId: val.folderId,
                source: 'external'
            };

            setSyncHistory(prev => [event, ...prev.slice(0, 49)]);
            setLastUpdate(Date.now());
            setUpdateCount(prev => prev + 1);
        }
    }, [val]);

    const testLocalUpdate = () => {
        const testValue = {
            clientId: `test-client-${Math.floor(Math.random() * 100)}`,
            folderId: `folder-${Math.floor(Math.random() * 3) + 1}`
        };
        setVal(testValue);
        console.log('🧪 Test update triggered:', testValue);
    };

    const clearHistory = () => {
        setSyncHistory([]);
        setUpdateCount(0);
    };

    const timeSinceLastUpdate = () => {
        const seconds = Math.floor((Date.now() - lastUpdate) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        return `${minutes}m ago`;
    };

    return (
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                Sync Status & Real-time Monitor
            </h2>
            <p className="text-zinc-400 text-sm mb-6">
                Monitor real-time synchronization events across all components and tabs
            </p>

            {/* Current Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                    <p className="text-xs text-zinc-500 font-medium mb-2">Total Updates</p>
                    <p className="text-3xl font-semibold text-green-400">{updateCount}</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                    <p className="text-xs text-zinc-500 font-medium mb-2">Last Update</p>
                    <p className="text-3xl font-semibold text-blue-400">{timeSinceLastUpdate()}</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                    <p className="text-xs text-zinc-500 font-medium mb-2">History Size</p>
                    <p className="text-3xl font-semibold text-purple-400">{syncHistory.length}</p>
                </div>
            </div>

            {/* Current Value */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                    Current Synced Value
                </h3>
                {val ? (
                    <div className="space-y-2 text-sm font-mono">
                        <div className="flex items-center justify-between py-2 border-b border-zinc-800">
                            <span className="text-zinc-500">Client ID</span>
                            <span className="text-zinc-200">{val.clientId}</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-zinc-500">Folder ID</span>
                            <span className="text-zinc-200">{val.folderId || 'null'}</span>
                        </div>
                    </div>
                ) : (
                    <p className="text-zinc-600 text-sm">No value synced yet</p>
                )}
            </div>

            {/* Test Controls */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={testLocalUpdate}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    Trigger Test Update
                </button>
                <button
                    onClick={clearHistory}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium rounded-lg transition-colors"
                >
                    Clear History
                </button>
            </div>

            {/* Sync History */}
            {syncHistory.length > 0 && (
                <div className="border-t border-zinc-800 pt-6">
                    <h3 className="text-sm font-semibold mb-4 text-zinc-300">
                        Sync Event History
                    </h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-950">
                        {syncHistory.map((event, index) => (
                            <div
                                key={index}
                                className="border border-zinc-800 rounded-lg p-3 bg-zinc-900/50 hover:bg-zinc-900 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-zinc-500 font-mono">
                                        {new Date(event.timestamp).toLocaleTimeString()}.
                                        {String(event.timestamp % 1000).padStart(3, '0')}
                                    </span>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded font-medium ${
                                            event.source === 'local'
                                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                        }`}
                                    >
                                        {event.source === 'local' ? 'Local' : 'Synced'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                                    <div>
                                        <span className="text-zinc-500">Client:</span>{' '}
                                        <span className="text-zinc-300">{event.clientId}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-500">Folder:</span>{' '}
                                        <span className="text-zinc-300">{event.folderId || 'null'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Multi-Tab Instructions */}
            <div className="mt-6 bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-cyan-400 mb-3">
                    Multi-Tab Testing
                </h3>
                <ul className="text-xs text-zinc-400 space-y-1.5 list-disc list-inside">
                    <li>Open this page in multiple browser tabs</li>
                    <li>Click "Trigger Test Update" in one tab</li>
                    <li>Watch all other tabs update in real-time</li>
                    <li>Verify sync history appears in all tabs</li>
                    <li>Check console logs for synchronization events</li>
                </ul>
            </div>
        </div>
    );
}
