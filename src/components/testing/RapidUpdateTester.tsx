"use client";

import { useState } from 'react';
import useLocalSync from '@/hooks/useLocalSync';

interface TestResult {
    testName: string;
    count: number;
    delay: number;
    startTime: number;
    endTime: number;
    duration: number;
    status: 'success' | 'error';
    errors?: string[];
}

export default function RapidUpdateTester() {
    // ✨ Just pass the event name - types and validation are automatic!
    const [val, setVal] = useLocalSync('client-folder-change');

    const [isRunning, setIsRunning] = useState(false);
    const [results, setResults] = useState<TestResult[]>([]);
    const [currentTest, setCurrentTest] = useState<string | null>(null);
    const [updateCount, setUpdateCount] = useState(0);

    const runRapidTest = async (count: number, delay: number = 0, testName: string) => {
        setIsRunning(true);
        setCurrentTest(testName);
        const errors: string[] = [];

        console.log(`🧪 Starting ${testName}: ${count} rapid updates with ${delay}ms delay`);
        const startTime = performance.now();

        try {
            for (let i = 0; i < count; i++) {
                setUpdateCount(prev => prev + 1);
                await new Promise((resolve) => {
                    setTimeout(() => {
                        try {
                            setVal({
                                clientId: `client-${(i % 12) + 1}`,
                                folderId: i % 3 === 0 ? 'folder-1' : i % 3 === 1 ? 'folder-2' : 'folder-3'
                            });
                            console.log(`✓ Update ${i + 1}/${count} completed`);
                        } catch (error) {
                            errors.push(`Update ${i + 1} failed: ${error}`);
                            console.error(`✗ Update ${i + 1} failed:`, error);
                        }
                        resolve(true);
                    }, i * delay);
                });
            }

            await new Promise(resolve => setTimeout(resolve, 100));

            const endTime = performance.now();
            const duration = endTime - startTime;

            const result: TestResult = {
                testName,
                count,
                delay,
                startTime,
                endTime,
                duration,
                status: errors.length === 0 ? 'success' : 'error',
                errors: errors.length > 0 ? errors : undefined
            };

            setResults(prev => [result, ...prev]);

            console.log(`✅ ${testName} completed in ${duration.toFixed(2)}ms`);
            console.log(`📊 Average time per update: ${(duration / count).toFixed(2)}ms`);

            if (errors.length > 0) {
                console.error(`❌ ${errors.length} errors occurred during test`);
            }
        } catch (error) {
            console.error(`❌ Test failed:`, error);
            const endTime = performance.now();
            setResults(prev => [{
                testName,
                count,
                delay,
                startTime,
                endTime,
                duration: endTime - startTime,
                status: 'error',
                errors: [String(error)]
            }, ...prev]);
        } finally {
            setIsRunning(false);
            setCurrentTest(null);
        }
    };

    const runAllTests = async () => {
        const tests = [
            { count: 10, delay: 0, name: '10 Immediate Updates' },
            { count: 50, delay: 0, name: '50 Immediate Updates' },
            { count: 100, delay: 0, name: '100 Immediate Updates' },
        ];

        for (const test of tests) {
            await runRapidTest(test.count, test.delay, test.name);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    };

    const clearResults = () => {
        setResults([]);
        console.clear();
    };

    return (
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <h2 className="text-lg font-semibold mb-1">
                Rapid Update Testing
            </h2>
            <p className="text-zinc-400 text-sm mb-6">
                Stress test the hook with programmatic rapid-fire updates to validate stability under load
            </p>

            {/* Current Synced Value */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Current Synced Value ({updateCount} updates)
                </p>
                <code className="text-xs text-zinc-300 font-mono block">
                    {val ? JSON.stringify(val, null, 2) : 'null'}
                </code>
            </div>

            {/* Test Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                <button
                    onClick={() => runRapidTest(10, 0, '10 Immediate Updates')}
                    disabled={isRunning}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                >
                    10 Immediate
                </button>
                <button
                    onClick={() => runRapidTest(50, 0, '50 Immediate Updates')}
                    disabled={isRunning}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                >
                    50 Immediate
                </button>
                <button
                    onClick={() => runRapidTest(100, 0, '100 Immediate Updates')}
                    disabled={isRunning}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                >
                    100 Immediate
                </button>
            </div>

            {/* Batch Actions */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={runAllTests}
                    disabled={isRunning}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                >
                    Run All Tests
                </button>
                <button
                    onClick={clearResults}
                    disabled={isRunning}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:text-zinc-600 disabled:cursor-not-allowed text-zinc-300 text-sm font-medium rounded-lg transition-colors"
                >
                    Clear Results
                </button>
            </div>

            {/* Running Status */}
            {isRunning && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="h-4 w-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-yellow-400 font-medium text-sm">
                            Running: {currentTest}
                        </span>
                    </div>
                </div>
            )}

            {/* Test Results */}
            {results.length > 0 && (
                <div className="border-t border-zinc-800 pt-6">
                    <h3 className="text-sm font-semibold mb-4 text-zinc-300">Test Results</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {results.map((result, index) => (
                            <div
                                key={index}
                                className={`border rounded-lg p-4 ${result.status === 'success'
                                        ? 'border-green-500/20 bg-green-500/5'
                                        : 'border-red-500/20 bg-red-500/5'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-medium text-sm">
                                        {result.testName}
                                    </span>
                                    <span
                                        className={`text-xs font-semibold px-2 py-1 rounded ${result.status === 'success'
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-red-500/20 text-red-400'
                                            }`}
                                    >
                                        {result.status === 'success' ? '✓ SUCCESS' : '✗ FAILED'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                    <div>
                                        <span className="text-zinc-500">Updates:</span>{' '}
                                        <span className="text-zinc-300">{result.count}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-500">Delay:</span>{' '}
                                        <span className="text-zinc-300">{result.delay}ms</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-500">Duration:</span>{' '}
                                        <span className="text-zinc-300">{result.duration.toFixed(2)}ms</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-500">Avg/Update:</span>{' '}
                                        <span className="text-zinc-300">
                                            {(result.duration / result.count).toFixed(2)}ms
                                        </span>
                                    </div>
                                </div>
                                {result.errors && result.errors.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-red-500/20">
                                        <p className="text-xs font-medium text-red-400 mb-2">Errors:</p>
                                        <ul className="space-y-1">
                                            {result.errors.map((error, i) => (
                                                <li key={i} className="text-xs text-red-300">{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
