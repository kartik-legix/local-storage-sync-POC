"use client";

import { useState, useEffect } from 'react';
import useLocalSync from '@/hooks/useLocalSync';

interface PerformanceListenerProps {
    id: number;
}

export default function PerformanceListener({ id }: PerformanceListenerProps) {
    const [value] = useLocalSync('client-folder-change');
    const [updateCount, setUpdateCount] = useState(0);

    useEffect(() => {
        if (value) {
            setUpdateCount(prev => prev + 1);
        }
    }, [value]);

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded p-3">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-zinc-400">#{id}</span>
                <span className="text-xs text-zinc-500">{updateCount} updates</span>
            </div>
            {value ? (
                <div className="text-xs text-zinc-300 font-mono space-y-1">
                    <div className="truncate">{value.clientId}</div>
                    <div className="truncate text-zinc-500">{value.folderId}</div>
                </div>
            ) : (
                <div className="text-xs text-zinc-500 italic">Waiting...</div>
            )}
        </div>
    );
}
