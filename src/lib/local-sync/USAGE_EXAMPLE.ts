/**
 * Usage Examples for Local Sync Events with Auto-Completion
 *
 * This file demonstrates how to use the typed event system with full IDE auto-completion
 */

import { createEventPayload, validateEventPayload, EventType, EventPayload, events } from './index';

// ============================================
// Example 1: Create Event Payload with Validation
// ============================================

// ✅ Valid payload - TypeScript will auto-suggest the correct structure
const validPayload = createEventPayload('client-folder-change', {
    clientId: 'client-123',
    folderId: 'some'
});

console.log('Valid payload:', validPayload);

// ✅ Valid with null folderId
const validNullPayload = createEventPayload('client-folder-change', {
    clientId: 'client-123',
    folderId: null
});

// ❌ This will throw an error at runtime (and TypeScript will warn you)
try {
    const invalidPayload = createEventPayload('client-folder-change', {
        clientId: '', // Empty string will fail validation if schema requires min length
        folderId: 'folder-456'
    } as any);
} catch (error) {
    console.error('Validation failed:', error);
}

// ============================================
// Example 2: Validate Unknown Payload
// ============================================

function handleUnknownData(data: unknown) {
    if (validateEventPayload('client-folder-change', data)) {
        // TypeScript now knows that 'data' is EventPayload<'client-folder-change'>
        console.log('Valid client ID:', data.clientId);
        console.log('Valid folder ID:', data.folderId);
    } else {
        console.error('Invalid payload');
    }
}

handleUnknownData({ clientId: 'client-1', folderId: 'folder-1' });
handleUnknownData({ invalid: 'data' });

// ============================================
// Example 3: Type-Safe Event Handling
// ============================================

function dispatchEvent<T extends EventType>(
    eventType: T,
    payload: EventPayload<T>
) {
    // Validate before dispatching
    const validatedPayload = createEventPayload(eventType, payload);

    // Dispatch to localStorage or any other mechanism
    localStorage.setItem(eventType, JSON.stringify(validatedPayload));

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent(eventType, { detail: validatedPayload }));
}

// Usage with full auto-completion
dispatchEvent('client-folder-change', {
    clientId: 'client-789',
    folderId: 'folder-123'
});

// ============================================
// Example 4: Listen to Events with Type Safety
// ============================================

function listenToEvent<T extends EventType>(
    eventType: T,
    callback: (payload: EventPayload<T>) => void
) {
    window.addEventListener(eventType, (event: Event) => {
        const customEvent = event as CustomEvent;
        if (validateEventPayload(eventType, customEvent.detail)) {
            callback(customEvent.detail);
        } else {
            console.error('Invalid event payload received');
        }
    });
}

// Usage with full type safety
listenToEvent('client-folder-change', (payload) => {
    // TypeScript knows the exact shape of payload here
    console.log('Client ID:', payload.clientId);
    console.log('Folder ID:', payload.folderId);
});

// ============================================
// Example 5: Direct Schema Access
// ============================================

// Access schema directly if needed
const schema = events['client-folder-change'].schema;

// Manual validation
const result = schema.safeParse({
    clientId: 'client-1',
    folderId: 'folder-1'
});

if (result.success) {
    console.log('Parsed data:', result.data);
} else {
    console.error('Validation errors:', result.error.issues);
}

// ============================================
// Example 6: Generic Event Handler
// ============================================

class EventManager {
    private listeners: Map<EventType, Set<(payload: any) => void>> = new Map();

    on<T extends EventType>(
        eventType: T,
        callback: (payload: EventPayload<T>) => void
    ) {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, new Set());
        }
        this.listeners.get(eventType)!.add(callback);
    }

    emit<T extends EventType>(
        eventType: T,
        payload: EventPayload<T>
    ) {
        // Validate payload before emitting
        const validatedPayload = createEventPayload(eventType, payload);

        const callbacks = this.listeners.get(eventType);
        if (callbacks) {
            callbacks.forEach(callback => callback(validatedPayload));
        }
    }
}

// Usage
const eventManager = new EventManager();

eventManager.on('client-folder-change', (payload) => {
    // Full auto-completion for payload properties
    console.log('Client changed:', payload.clientId, payload.folderId);
});

eventManager.emit('client-folder-change', {
    clientId: 'client-999',
    folderId: null
});

// ============================================
// Example 7: React Hook Integration
// ============================================
// Note: Copy this entire example to a .tsx file to use with React

/*
import { useState, useEffect } from 'react';
import { EventType, EventPayload, validateEventPayload, createEventPayload } from './index';

function useTypedLocalSync<T extends EventType>(eventType: T) {
    const [payload, setPayload] = useState<EventPayload<T> | null>(null);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === eventType && event.newValue) {
                try {
                    const parsed = JSON.parse(event.newValue);
                    if (validateEventPayload(eventType, parsed)) {
                        setPayload(parsed);
                    }
                } catch (error) {
                    console.error('Failed to parse event:', error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [eventType]);

    const updatePayload = (newPayload: EventPayload<T>) => {
        const validated = createEventPayload(eventType, newPayload);
        localStorage.setItem(eventType, JSON.stringify(validated));
        setPayload(validated);
    };

    return [payload, updatePayload] as const;
}
*/

/*
// Usage in React component (copy this to a .tsx file):
function MyComponent() {
    const [clientFolderChange, setClientFolderChange] = useTypedLocalSync('client-folder-change');

    const handleClick = () => {
        // Full auto-completion here!
        setClientFolderChange({
            clientId: 'client-new',
            folderId: 'folder-new'
        });
    };

    return (
        <div>
            {clientFolderChange && (
                <div>
                    Client: {clientFolderChange.clientId}
                    Folder: {clientFolderChange.folderId}
                </div>
            )}
            <button onClick={handleClick}>Update</button>
        </div>
    );
}
*/

export {};
