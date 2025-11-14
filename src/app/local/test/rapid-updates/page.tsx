"use client";

import RapidUpdateTester from '@/components/testing/RapidUpdateTester';
import Link from 'next/link';

export default function RapidUpdatesPage() {
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
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Rapid Update Tester
                        </h1>
                    </div>
                    <p className="text-zinc-400 text-sm">
                        Stress test the synchronization system with rapid consecutive updates
                    </p>
                </div>

                {/* Rapid Update Testing */}
                <RapidUpdateTester />

                {/* Testing Instructions */}
                <div className="border border-purple-500/20 bg-purple-500/5 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        Testing Instructions
                    </h2>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-300">
                        <li>Open this page in multiple browser tabs/windows (5-15 recommended)</li>
                        <li>Run rapid update tests from one tab</li>
                        <li>Observe updates propagating to all other tabs</li>
                        <li>Test different update speeds (immediate, 10ms, 50ms delays)</li>
                        <li>Monitor browser performance and console for errors</li>
                        <li>Verify final state matches across all tabs</li>
                    </ol>
                </div>

                {/* Test Checklist */}
                <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
                    <h2 className="text-lg font-semibold mb-5">
                        Rapid Update Checklist
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h3 className="font-medium text-zinc-300 text-sm">Update Tests</h3>
                            <ul className="text-xs text-zinc-500 space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>10 immediate updates</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>50 immediate updates</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>100 immediate updates</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>100 updates (10ms delay)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>100 updates (50ms delay)</span>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-medium text-zinc-300 text-sm">Validation</h3>
                            <ul className="text-xs text-zinc-500 space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>No console errors</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>All tabs show same state</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>No dropped updates</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Browser remains responsive</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>No memory leaks</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
