"use client";

import { useState, useEffect } from 'react';
import useLocalSync from '@/hooks/useLocalSync';

interface ManipulationResult {
    testName: string;
    action: string;
    value: string;
    timestamp: number;
    success: boolean;
    error?: string;
}

export default function LocalStorageManipulator() {
    const [storageKey] = useState('client-folder-change');
    const [currentValue, setCurrentValue] = useState<string>('');
    const [customValue, setCustomValue] = useState('');
    const [results, setResults] = useState<ManipulationResult[]>([]);
    const [storageSize, setStorageSize] = useState(0);

    // Use the hook to get the validated value
    const [hookValue, setHookValue] = useLocalSync('client-folder-change');
    const [lastUpdated, setLastUpdated] = useState<number | null>(null);

    // Track when hook value changes
    useEffect(() => {
        if (hookValue) {
            setLastUpdated(Date.now());
        }
    }, [hookValue]);

    useEffect(() => {
        const readValue = () => {
            const val = localStorage.getItem(storageKey);
            setCurrentValue(val || 'null');
            calculateStorageSize();
        };

        readValue();
        const interval = setInterval(readValue, 500);
        return () => clearInterval(interval);
    }, [storageKey]);

    const calculateStorageSize = () => {
        let totalSize = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                totalSize += localStorage[key].length + key.length;
            }
        }
        setStorageSize(totalSize);
    };

    const logResult = (testName: string, action: string, value: string, success: boolean, error?: string) => {
        const result: ManipulationResult = {
            testName,
            action,
            value,
            timestamp: Date.now(),
            success,
            error
        };
        setResults(prev => [result, ...prev]);

        if (success) {
            console.log(`✓ ${testName}: ${action}`, value);
        } else {
            console.error(`✗ ${testName}: ${action} failed`, error);
        }
    };

    const testInvalidJSON = () => {
        try {
            const invalidJSON = '{invalid json}';
            localStorage.setItem(storageKey, invalidJSON);
            logResult('Invalid JSON', 'Set invalid JSON', invalidJSON, true);
        } catch (error) {
            logResult('Invalid JSON', 'Set invalid JSON', '{invalid json}', false, String(error));
        }
    };

    const testWrongTypeString = () => {
        try {
            const value = 'just a string';
            localStorage.setItem(storageKey, value);
            logResult('Type Mismatch', 'Set plain string', value, true);
        } catch (error) {
            logResult('Type Mismatch', 'Set plain string', 'just a string', false, String(error));
        }
    };

    const testWrongTypeNumber = () => {
        try {
            const value = '12345';
            localStorage.setItem(storageKey, value);
            logResult('Type Mismatch', 'Set number', value, true);
        } catch (error) {
            logResult('Type Mismatch', 'Set number', '12345', false, String(error));
        }
    };

    const testWrongTypeArray = () => {
        try {
            const value = JSON.stringify(['client-1', 'folder-1']);
            localStorage.setItem(storageKey, value);
            logResult('Type Mismatch', 'Set array', value, true);
        } catch (error) {
            // @ts-ignore
            logResult('Type Mismatch', 'Set array', value, false, String(error));
        }
    };

    const testNullValue = () => {
        try {
            const value = 'null';
            localStorage.setItem(storageKey, value);
            logResult('Null/Undefined', 'Set null string', value, true);
        } catch (error) {
            logResult('Null/Undefined', 'Set null string', 'null', false, String(error));
        }
    };

    const testEmptyString = () => {
        try {
            localStorage.setItem(storageKey, '');
            logResult('Empty Values', 'Set empty string', '', true);
        } catch (error) {
            logResult('Empty Values', 'Set empty string', '', false, String(error));
        }
    };

    const testEmptyObject = () => {
        try {
            const value = JSON.stringify({});
            localStorage.setItem(storageKey, value);
            logResult('Empty Values', 'Set empty object', value, true);
        } catch (error) {
            logResult('Empty Values', 'Set empty object', '{}', false, String(error));
        }
    };

    const testDeleteKey = () => {
        try {
            localStorage.removeItem(storageKey);
            logResult('Key Deletion', 'Remove key', 'Key deleted', true);
        } catch (error) {
            logResult('Key Deletion', 'Remove key', '', false, String(error));
        }
    };

    const testRaceCondition = () => {
        try {
            console.log('🏁 Starting race condition simulation...');
            for (let i = 0; i < 50; i++) {
                localStorage.setItem(storageKey, JSON.stringify({
                    clientId: `client-${i}`,
                    folderId: `folder-${(i % 3) + 1}`
                }));
            }
            logResult('Race Condition', '50 rapid manual changes', 'Completed', true);
        } catch (error) {
            logResult('Race Condition', '50 rapid manual changes', 'Failed', false, String(error));
        }
    };

    const testCustomValue = () => {
        if (!customValue.trim()) {
            alert('Please enter a custom value');
            return;
        }
        try {
            localStorage.setItem(storageKey, customValue);
            logResult('Custom Value', 'Set custom value', customValue, true);
            setCustomValue('');
        } catch (error) {
            logResult('Custom Value', 'Set custom value', customValue, false, String(error));
        }
    };

    const testFillStorage = () => {
        try {
            const largeData = 'x'.repeat(100000);
            for (let i = 0; i < 50; i++) {
                localStorage.setItem(`test-large-${i}`, largeData);
            }
            logResult('Quota Test', 'Fill storage with 5MB data', 'Completed', true);
            calculateStorageSize();
        } catch (error) {
            logResult('Quota Test', 'Fill storage', 'Failed', false, String(error));
            calculateStorageSize();
        }
    };

    const clearTestData = () => {
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('test-large-')) {
                    localStorage.removeItem(key);
                }
            });
            logResult('Cleanup', 'Clear test data', 'Completed', true);
            calculateStorageSize();
        } catch (error) {
            logResult('Cleanup', 'Clear test data', 'Failed', false, String(error));
        }
    };

    const clearResults = () => {
        setResults([]);
    };

    return (
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <h2 className="text-lg font-semibold mb-1">
                localStorage Manipulation Testing
            </h2>
            <p className="text-zinc-400 text-sm mb-6">
                Test resilience against manual localStorage changes, data corruption, and edge cases
            </p>

            {/* Value Display - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Raw localStorage Value */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        Raw localStorage Value
                    </p>
                    <code className="text-xs text-zinc-300 font-mono break-all block">
                        {currentValue}
                    </code>
                </div>

                {/* Hook Value (Validated) */}
                <div className="bg-zinc-900 border border-emerald-900/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                            Hook Value (Validated)
                        </p>
                        {lastUpdated && (
                            <span className="text-xs text-zinc-500 font-mono">
                                {new Date(lastUpdated).toLocaleTimeString()}
                            </span>
                        )}
                    </div>
                    <code className="text-xs text-emerald-300 font-mono break-all block">
                        {hookValue ? hookValue.clientId + ' ' + hookValue.folderId : 'null'}
                    </code>
                    {!lastUpdated && (
                        <p className="text-xs text-zinc-500 mt-2 italic">
                            Waiting for first valid update...
                        </p>
                    )}
                </div>
            </div>

            {/* Storage Size */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Total localStorage Size
                </p>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-blue-400">
                        {(storageSize / 1024).toFixed(2)} KB
                    </span>
                    <span className="text-xs text-zinc-500">(Typical limit: 5-10 MB)</span>
                </div>
            </div>

            {/* Test Categories */}
            <div className="space-y-5 mb-6">
                {/* Data Corruption Tests */}
                <div>
                    <h3 className="text-sm font-semibold text-zinc-300 mb-3">
                        Data Corruption Tests
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <button
                            onClick={testInvalidJSON}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                            Invalid JSON
                        </button>
                        <button
                            onClick={testWrongTypeString}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                            String Type
                        </button>
                        <button
                            onClick={testWrongTypeNumber}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                            Number Type
                        </button>
                        <button
                            onClick={testWrongTypeArray}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                            Array Type
                        </button>
                    </div>
                </div>

                {/* Edge Case Tests */}
                <div>
                    <h3 className="text-sm font-semibold text-zinc-300 mb-3">
                        Edge Case Tests
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <button
                            onClick={testNullValue}
                            className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                            Null Value
                        </button>
                        <button
                            onClick={testEmptyString}
                            className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                            Empty String
                        </button>
                        <button
                            onClick={testEmptyObject}
                            className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                            Empty Object
                        </button>
                        <button
                            onClick={testDeleteKey}
                            className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                            Delete Key
                        </button>
                    </div>
                </div>

                {/* Stress Tests */}
                <div>
                    <h3 className="text-sm font-semibold text-zinc-300 mb-3">
                        Stress Tests
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <button
                            onClick={testRaceCondition}
                            className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                            Race Condition (50x)
                        </button>
                        <button
                            onClick={testFillStorage}
                            className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                            Fill Storage (5MB)
                        </button>
                        <button
                            onClick={clearTestData}
                            className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-xs font-medium rounded-lg transition-colors"
                        >
                            Clear Test Data
                        </button>
                    </div>
                </div>

                <div>
                    <button
                        onClick={() => setHookValue({ clientId: 'client-1', folderId: 'folder-1' })}
                        className='w-full bg-blue-500/10 text-blue-500 text-sm font-semibold rounded-lg py-2'
                    >
                        Set valid value {"(Set valid value before testing)"}
                    </button>
                </div>

                {/* Custom Value Test */}
                <div>
                    <h3 className="text-sm font-semibold text-zinc-300 mb-3">
                        Custom Value Test
                    </h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={customValue}
                            onChange={(e) => setCustomValue(e.target.value)}
                            placeholder='{"clientId":"client-1","folderId":"folder-1"}'
                            className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={testCustomValue}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Set Custom
                        </button>
                    </div>
                </div>
            </div>

            {/* Clear Results */}
            <button
                onClick={clearResults}
                className="mb-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium rounded-lg transition-colors"
            >
                Clear Results
            </button>

            {/* Test Results */}
            {results.length > 0 && (
                <div className="border-t border-zinc-800 pt-6">
                    <h3 className="text-sm font-semibold mb-4 text-zinc-300">
                        Manipulation Results
                    </h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {results.map((result, index) => (
                            <div
                                key={index}
                                className={`border rounded-lg p-3 ${result.success
                                    ? 'border-green-500/20 bg-green-500/5'
                                    : 'border-red-500/20 bg-red-500/5'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-xs">
                                        {result.testName} - {result.action}
                                    </span>
                                    <span className="text-xs text-zinc-500 font-mono">
                                        {new Date(result.timestamp).toLocaleTimeString()}
                                    </span>
                                </div>
                                <div className="text-xs text-zinc-400">
                                    <span className="text-zinc-500">Value:</span>{' '}
                                    <code className="bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-zinc-300">
                                        {result.value.substring(0, 100)}
                                        {result.value.length > 100 ? '...' : ''}
                                    </code>
                                </div>
                                {result.error && (
                                    <div className="text-xs text-red-400 mt-2 pt-2 border-t border-red-500/20">
                                        <span className="font-medium">Error:</span> {result.error}
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
