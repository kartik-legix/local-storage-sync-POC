# Next.js localStorage Data Transfer POC

A production-ready proof-of-concept for real-time, type-safe data synchronization across browser tabs using localStorage and React hooks.

## Overview

This project demonstrates a robust solution for synchronizing application state across multiple browser tabs/windows using localStorage events with **Zod schema validation**, **TypeScript type safety**, and **React hooks**.

### Key Features

- ✅ **Real-time Synchronization**: Instant updates across all browser tabs and windows
- ✅ **Type-Safe**: Full TypeScript support with automatic type inference
- ✅ **Schema Validation**: Zod-powered validation for data integrity
- ✅ **Production Ready**: Tested with 1,800 concurrent listeners
- ✅ **Easy to Use**: Simple React hook API (`useLocalSync`)
- ✅ **Secure**: Bidirectional validation prevents data corruption
- ✅ **Performance**: Handles extreme loads without degradation
- ✅ **Extensible**: Easy to add new event types

---

## Getting Started

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Access Testing Suite

Navigate to [http://localhost:3000/local/test](http://localhost:3000/local/test) to access the comprehensive testing suite.

---

### View Zustand Comparison

Navigate to [branch - compare-zustand](https://github.com/kartik-legix/local-storage-sync-POC/tree/compare-zustand) to view the Zustand comparison.

---

## The `useLocalSync` Hook

### Overview

`useLocalSync` is a custom React hook that provides type-safe, validated localStorage synchronization across tabs.

**Location:** `src/hooks/useLocalSync.tsx`

### Features

- **Type-safe API**: Full TypeScript inference for event names and payloads
- **Automatic validation**: Zod schema validation on both incoming and outgoing data
- **React-friendly**: Returns `[value, setValue]` tuple like `useState`
- **Storage event handling**: Automatically listens to localStorage changes
- **Error resilience**: Gracefully handles invalid data without affecting other tabs

### Basic Usage

```typescript
import useLocalSync from '@/hooks/useLocalSync';

function MyComponent() {
    // Hook returns [value, setValue] tuple
    const [clientFolderChange, setClientFolderChange] = useLocalSync('client-folder-change');

    // Update value (validates and syncs to all tabs)
    const handleUpdate = () => {
        setClientFolderChange({
            clientId: 'client-123',
            folderId: 'folder-456'
        });
    };

    return (
        <div>
            {clientFolderChange && (
                <div>
                    <p>Client: {clientFolderChange.clientId}</p>
                    <p>Folder: {clientFolderChange.folderId}</p>
                </div>
            )}
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}
```

---

## Creating Custom Events

### Step 1: Define Your Schema

Create a new schema file in `src/schemas/`:

```typescript
// src/schemas/userStatusSchema.ts
import { z } from "zod";

export const userStatusSchema = z.object({
    userId: z.string().uuid(),
    status: z.enum(['online', 'offline', 'away']),
    lastActive: z.number()
});

export type UserStatus = z.infer<typeof userStatusSchema>;
```

### Step 2: Create Event File

Create an event file in `src/lib/local-sync/events/`:

```typescript
// src/lib/local-sync/events/user-status.ts
import { z } from "zod";

export const userStatusEventSchema = z.object({
    userId: z.string().uuid(),
    status: z.enum(['online', 'offline', 'away']),
    lastActive: z.number()
});
```

### Step 3: Register Event

Add your event to `src/lib/local-sync/index.ts`:

```typescript
import { userStatusEventSchema } from "./events/user-status";

export const events = {
    'client-folder-change': {
        schema: clientFolderChangeEventSchema,
    },
    'user-status': {
        schema: userStatusEventSchema,
    }
};
```

### Step 4: Use Your Event

```typescript
import useLocalSync from '@/hooks/useLocalSync';

function UserStatusComponent() {
    const [userStatus, setUserStatus] = useLocalSync('user-status');

    const goOnline = () => {
        setUserStatus({
            userId: 'user-uuid-here',
            status: 'online',
            lastActive: Date.now()
        });
    };

    return (
        <div>
            <p>Status: {userStatus?.status}</p>
            <button onClick={goOnline}>Go Online</button>
        </div>
    );
}
```

That's it! Full type safety and validation are automatic.

---

## Architecture

### Event Flow

```
Component A (Tab 1)                    Component B (Tab 2)
      |                                       |
      | setClientFolderChange()               |
      v                                       |
  Validate with Zod                           |
      |                                       |
      | Valid ✓                               |
      v                                       |
localStorage.setItem()                        |
      |                                       |
      | Dispatch StorageEvent                 |
      |-------------------------------------->|
                                              v
                                    Receive StorageEvent
                                              |
                                    Validate with Zod
                                              |
                                          Valid ✓
                                              |
                                    Update Component State
```

### Key Components

- **`useLocalSync` Hook** (`src/hooks/useLocalSync.tsx`)
  - Main API for components
  - Handles storage events
  - Manages validation

- **Event Registry** (`src/lib/local-sync/index.ts`)
  - Central event definitions
  - Type system foundation
  - Schema mappings

- **Event Schemas** (`src/lib/local-sync/events/`)
  - Individual event definitions
  - Zod validation schemas

- **Type Schemas** (`src/schemas/`)
  - Reusable schema definitions
  - Type inference sources

### Validation Strategy

1. **Outgoing Validation**: Data validated before writing to localStorage
2. **Incoming Validation**: Data validated when received from other tabs
3. **Schema-First**: TypeScript types derived from Zod schemas
4. **Fail-Safe**: Invalid data rejected without affecting app state

---

## Testing Suite

The project includes a comprehensive testing suite at `/local/test` with four test pages:

### 1. Sync Status Display
Real-time monitoring of localStorage synchronization across tabs.

### 2. Rapid Update Tester
Stress tests with:
- 10, 50, 100 immediate updates
- Delayed updates (10ms, 50ms intervals)

### 3. LocalStorage Manipulator
Tests edge cases:
- Invalid JSON injection
- Type mismatches
- Null/empty values
- Data corruption scenarios
- Storage quota testing

### 4. Performance Test - 50 Listeners
Performance validation with 50 concurrent components listening for updates.

### Test Results

**✅ ALL TESTS PASSED**

Highlights:
- Validated with 1,800 concurrent listeners (36 tabs × 50 components)
- Zero dropped updates
- No performance degradation
- No memory leaks
- Complete data integrity maintained

📊 **Full Testing Report**: [TESTING_REPORT.md](./TESTING_REPORT.md)

---

## API Reference

### `useLocalSync<T>(eventName: T)`

#### Parameters
- `eventName`: The name of the event to sync (type-safe, auto-completed)

#### Returns
`[value, setValue]` tuple:
- `value`: Current validated value (or `null` if no valid data)
- `setValue`: Function to update and sync value

#### Example
```typescript
const [data, setData] = useLocalSync('client-folder-change');
```

### Type Helpers

```typescript
// Get event type
type EventType = keyof typeof events;

// Get payload type for specific event
type ClientFolderPayload = EventPayload<'client-folder-change'>;

// Create validated payload
const payload = createEventPayload('client-folder-change', {
    clientId: 'client-1',
    folderId: 'folder-1'
});

// Validate unknown data
if (validateEventPayload('client-folder-change', unknownData)) {
    // TypeScript knows the type now
    console.log(unknownData.clientId);
}
```

---

## Project Structure

```
src/
├── app/
│   └── local/
│       └── test/              # Testing suite pages
│           ├── page.tsx       # Test hub
│           ├── sync-status/   # Sync monitoring
│           ├── rapid-updates/ # Rapid update tests
│           ├── local-storage/ # Data manipulation tests
│           └── performance/   # Performance tests
│
├── components/
│   ├── local/                 # Main app components
│   └── testing/               # Testing components
│       ├── RapidUpdateTester.tsx
│       ├── LocalStorageManipulator.tsx
│       ├── SyncStatusDisplay.tsx
│       └── PerformanceListener.tsx
│
├── hooks/
│   └── useLocalSync.tsx       # Main synchronization hook
│
├── lib/
│   └── local-sync/            # Event system core
│       ├── index.ts           # Event registry
│       ├── events/            # Event definitions
│       └── USAGE_EXAMPLE.ts   # Usage examples
│
└── schemas/                   # Zod schemas
    └── clientFolderSchema.ts
```

---

## Use Cases

### Multi-Tab Applications
- User sessions across tabs
- Shopping cart synchronization
- Form data persistence
- Real-time notifications

### Collaborative Features
- User presence indicators
- Shared state management
- Live data updates
- Cross-tab coordination

### Performance Critical
- Tested up to 1,800 concurrent listeners
- Zero performance overhead
- Memory efficient
- Browser responsive

---

## Best Practices

1. **Always Define Schemas**: Use Zod schemas for all events
2. **Type Safety First**: Let TypeScript infer types from schemas
3. **Keep Events Simple**: One clear purpose per event
4. **Test Edge Cases**: Use the testing suite to validate behavior
5. **Monitor Performance**: Check with multiple tabs open
6. **Handle Nulls**: Hook returns `null` before first valid update

---

## Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Zod** - Schema validation
- **Tailwind CSS** - Styling
- **localStorage API** - Storage mechanism
- **StorageEvent API** - Cross-tab communication

---

## Testing & Validation

The system has been comprehensively tested:

- ✅ 1,800 concurrent listeners (extreme performance test)
- ✅ Rapid updates (up to 100 consecutive updates)
- ✅ Data corruption scenarios
- ✅ Type mismatch handling
- ✅ Edge cases (null, empty, invalid data)
- ✅ Memory leak testing
- ✅ Cross-window synchronization

**Verdict:** Production ready with exceptional performance.

For detailed test results, see [TESTING_REPORT.md](./TESTING_REPORT.md)

---

## Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

### Related Technologies
- [Zod Documentation](https://zod.dev) - TypeScript-first schema validation
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Web Storage API
- [StorageEvent](https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent) - Cross-tab communication

---

## License

This is a proof-of-concept project for demonstration purposes.

---

**Built using Next.js, TypeScript, and Zod**
