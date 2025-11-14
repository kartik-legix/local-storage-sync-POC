"use client";

import SyncStatusDisplay from '@/components/testing/SyncStatusDisplay';
import Link from 'next/link';

export default function SyncStatusPage() {
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
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Sync Status Display
                        </h1>
                    </div>
                    <p className="text-zinc-400 text-sm">
                        Real-time monitoring of localStorage synchronization across tabs
                    </p>
                </div>

                {/* Sync Status Display */}
                <SyncStatusDisplay />

                {/* Testing Instructions */}
                <div className="border border-green-500/20 bg-green-500/5 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        Testing Instructions
                    </h2>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-300">
                        <li>Open this page in multiple browser tabs/windows</li>
                        <li>Monitor the sync status display for real-time updates</li>
                        <li>Navigate to other test pages and observe synchronization</li>
                        <li>Check for consistent state across all tabs</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
