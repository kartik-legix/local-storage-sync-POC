"use client";

import Link from 'next/link';

export default function TestPage() {
    const testRoutes = [
        {
            name: 'Sync Status Display',
            description: 'Real-time monitoring of localStorage synchronization across tabs',
            href: '/local/test/sync-status',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            gradient: 'from-green-500 to-emerald-500',
            borderColor: 'border-green-500/20 hover:border-green-500/40',
            bgColor: 'bg-green-500/5 hover:bg-green-500/10',
        },
        {
            name: 'Rapid Update Tester',
            description: 'Stress test the synchronization system with rapid consecutive updates',
            href: '/local/test/rapid-updates',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
            ),
            gradient: 'from-purple-500 to-pink-500',
            borderColor: 'border-purple-500/20 hover:border-purple-500/40',
            bgColor: 'bg-purple-500/5 hover:bg-purple-500/10',
        },
        {
            name: 'LocalStorage Manipulator',
            description: 'Test edge cases, data corruption scenarios, and error handling',
            href: '/local/test/local-storage',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
            ),
            gradient: 'from-orange-500 to-red-500',
            borderColor: 'border-orange-500/20 hover:border-orange-500/40',
            bgColor: 'bg-orange-500/5 hover:bg-orange-500/10',
        },
        {
            name: 'Performance Test - 50 Listeners',
            description: 'Test synchronization performance with 50 concurrent listeners',
            href: '/local/test/performance',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
            ),
            gradient: 'from-cyan-500 to-blue-500',
            borderColor: 'border-cyan-500/20 hover:border-cyan-500/40',
            bgColor: 'bg-cyan-500/5 hover:bg-cyan-500/10',
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-950">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-semibold tracking-tight">
                            useLocalSync Testing Suite
                        </h1>
                    </div>
                    <p className="text-zinc-400 text-base">
                        Comprehensive stress testing and validation for localStorage synchronization
                    </p>
                </div>

                {/* Test Routes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testRoutes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={`group border ${route.borderColor} ${route.bgColor} rounded-lg p-6 transition-all duration-200 cursor-pointer`}
                        >
                            <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${route.gradient} flex items-center justify-center mb-4`}>
                                {route.icon}
                            </div>
                            <h2 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
                                {route.name}
                            </h2>
                            <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                {route.description}
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                <span>Open test</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Global Testing Instructions */}
                <div className="border border-blue-500/20 bg-blue-500/5 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        Multi-Tab Testing Best Practices
                    </h2>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-300">
                        <li>Open each test page in multiple browser tabs/windows (5-15 recommended)</li>
                        <li>Run tests from one tab and observe synchronization in others</li>
                        <li>Monitor browser console for errors and warnings</li>
                        <li>Test combinations of different test pages open simultaneously</li>
                        <li>Verify browser remains responsive throughout testing</li>
                    </ol>
                </div>

                {/* Overall Test Checklist */}
                <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
                    <h2 className="text-lg font-semibold mb-5">
                        Overall Testing Checklist
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-3">
                            <h3 className="font-medium text-zinc-300 text-sm">Rapid Updates</h3>
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
                            <h3 className="font-medium text-zinc-300 text-sm">Data Integrity</h3>
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
                                    <span>Quota exceeded</span>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-medium text-zinc-300 text-sm">Multi-Tab Sync</h3>
                            <ul className="text-xs text-zinc-500 space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>3-5 tabs basic sync</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>10+ tabs stress test</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Mixed page sync</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Window vs tab testing</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Tab lifecycle testing</span>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-medium text-zinc-300 text-sm">Performance</h3>
                            <ul className="text-xs text-zinc-500 space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>No console errors</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>No memory leaks</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Acceptable render times</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Browser responsive</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>No visual glitches</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
