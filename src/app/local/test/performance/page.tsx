"use client";

import { useState } from 'react';
import Link from 'next/link';
import useLocalSync from '@/hooks/useLocalSync';
import PerformanceListener from '@/components/testing/PerformanceListener';

export default function PerformancePage() {
    const [, setClientFolderChange] = useLocalSync('client-folder-change');
    const [updateCount, setUpdateCount] = useState(0);

    const generateRandomId = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const triggerUpdate = () => {
        const randomClientId = generateRandomId();
        const randomFolderId = generateRandomId();

        setClientFolderChange({
            clientId: randomClientId,
            folderId: randomFolderId
        });

        setUpdateCount(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-950">
                    <Link
                        href="/local/test"
                        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-4"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back to Test Suite
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Performance Test - 50 Listeners
                        </h1>
                    </div>
                    <p className="text-zinc-400 text-sm">
                        Test synchronization performance with 50 concurrent listeners
                    </p>
                </div>

                {/* Control Panel */}
                <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold mb-1">Trigger Update</h2>
                            <p className="text-sm text-zinc-400">
                                Updates sent: <span className="text-white font-semibold">{updateCount}</span>
                            </p>
                        </div>
                        <button
                            onClick={triggerUpdate}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Send Random Update
                        </button>
                    </div>
                </div>

                {/* 50 Listeners Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 50 }, (_, i) => (
                        <PerformanceListener key={i} id={i + 1} />
                    ))}
                </div>
            </div>
        </div>
    );
}
