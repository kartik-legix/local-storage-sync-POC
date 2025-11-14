"use client";

import LocalStorageManipulator from '@/components/testing/LocalStorageManipulator';
import Link from 'next/link';

export default function LocalStoragePage() {
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
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            LocalStorage Manipulator
                        </h1>
                    </div>
                    <p className="text-zinc-400 text-sm">
                        Test edge cases, data corruption scenarios, and error handling
                    </p>
                </div>

                {/* LocalStorage Manipulation */}
                <LocalStorageManipulator />

                {/* Testing Instructions */}
                <div className="border border-orange-500/20 bg-orange-500/5 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-orange-400 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        Testing Instructions
                    </h2>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-300">
                        <li>Open this page in multiple browser tabs/windows</li>
                        <li>Test invalid JSON injection and verify error handling</li>
                        <li>Try corrupting data and observe recovery mechanisms</li>
                        <li>Test edge cases like null, undefined, and empty values</li>
                        <li>Monitor console for proper error logging</li>
                        <li>Verify other tabs handle corrupted data gracefully</li>
                    </ol>
                </div>

                {/* Test Checklist */}
                <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
                    <h2 className="text-lg font-semibold mb-5">
                        Data Integrity Checklist
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h3 className="font-medium text-zinc-300 text-sm">Edge Cases</h3>
                            <ul className="text-xs text-zinc-500 space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Invalid JSON handling</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Type mismatch handling</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Null/undefined values</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Empty values</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Data corruption recovery</span>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-medium text-zinc-300 text-sm">Validation</h3>
                            <ul className="text-xs text-zinc-500 space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Errors logged to console</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>No unhandled exceptions</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Graceful degradation</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>State recovery works</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Other tabs not affected</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
