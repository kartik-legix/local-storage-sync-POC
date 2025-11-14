# Local Sync System - Complete Guide

A type-safe, validated localStorage synchronization system with automatic cross-tab sync and Zod validation.

## 🚀 Quick Start

### Basic Usage

```tsx
import useLocalSync from '@/hooks/useLocalSync';

function MyComponent() {
    // ✨ Just pass the event name - types and validation are automatic!
    const [clientFolderChange, setClientFolderChange] = useLocalSync('client-folder-change');

    const handleUpdate = () => {
        // TypeScript provides full auto-completion here ✅
        setClientFolderChange({
            clientId: 'client-123',
            folderId: 'folder-456'
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
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}
```

That's it! No manual type annotations, no schema passing, no validation code needed.

## 🎯 How It Works

### 1. Define Your Event Schema

Create a schema file in `src/lib/local-sync/events/`:

```typescript
// src/lib/local-sync/events/client-folder-change.ts
import { z } from "zod";

// Define the schema first
export const clientFolderChangeEventSchema = z.object({
    clientId: z.string().min(3, "Client ID must be at least 3 characters"),
    folderId: z.string().min(3, "Folder ID must be at least 3 characters").nullable()
});

// Infer the TypeScript type from the schema
export type ClientFolderChangeEvent = z.infer<typeof clientFolderChangeEventSchema>;
```

### 2. Register Your Event

Add it to the events registry in `src/lib/local-sync/index.ts`:

```typescript
import { z } from "zod";
import { clientFolderChangeEventSchema } from "./events/client-folder-change";
import { myOtherEventSchema } from "./events/my-other-event";

export const events = {
    'client-folder-change': {
        schema: clientFolderChangeEventSchema,
    },
    'my-other-event': {
        schema: myOtherEventSchema,
    }
} as const;
```

### 3. Use in Components

```tsx
import useLocalSync from '@/hooks/useLocalSync';

function MyComponent() {
    const [data, setData] = useLocalSync('client-folder-change');

    // TypeScript knows the exact type!
    // data is: { clientId: string; folderId: string | null } | null

    // Auto-completion works perfectly ✨
    setData({
        clientId: 'client-1',
        folderId: 'folder-1'
    });
}
```

## ✨ Features

### 🔒 Automatic Validation

Data is validated both when:
- **Sending**: Before storing to localStorage
- **Receiving**: When synced from other tabs

Invalid data is rejected and logged to console.

```typescript
const [data, setData] = useLocalSync('client-folder-change');

// ❌ This will fail validation and be rejected
setData({
    clientId: '', // Too short (min 3 chars)
    folderId: 'folder-1'
});
// Console: "Validation failed for outgoing data..."

// ✅ This will succeed
setData({
    clientId: 'client-123',
    folderId: 'folder-456'
});
```

### 🎨 Full TypeScript Support

```typescript
// TypeScript auto-completes event names
const [data1, setData1] = useLocalSync('client-folder-change'); // ✅
const [data2, setData2] = useLocalSync('my-other-event'); // ✅
const [data3, setData3] = useLocalSync('typo-event'); // ❌ Type error!

// TypeScript knows the exact shape of data
const [clientData, setClientData] = useLocalSync('client-folder-change');

if (clientData) {
    console.log(clientData.clientId); // ✅ Auto-complete works
    console.log(clientData.folderId); // ✅ Auto-complete works
    console.log(clientData.invalid); // ❌ Type error!
}

// TypeScript validates what you pass to setData
setClientData({
    clientId: 'client-1',
    folderId: 'folder-1'
}); // ✅

setClientData({
    clientId: 'client-1',
    invalid: 'field'
}); // ❌ Type error!
```

### 🔄 Cross-Tab Synchronization

Changes automatically sync across all browser tabs:

**Tab 1:**
```typescript
const [data, setData] = useLocalSync('client-folder-change');
setData({ clientId: 'client-123', folderId: 'folder-456' });
```

**Tab 2:** (automatically receives the update)
```typescript
const [data, setData] = useLocalSync('client-folder-change');
// data is automatically updated to { clientId: 'client-123', folderId: 'folder-456' }
```

### 💾 Persistence

Data persists in localStorage and is automatically loaded on component mount:

```typescript
// Page refresh
const [data, setData] = useLocalSync('client-folder-change');
// data is automatically loaded from localStorage if available
```

## 📚 Advanced Usage

### Creating Multiple Events

#### Step 1: Create event schemas

```typescript
// src/lib/local-sync/events/user-preferences.ts
import { z } from "zod";

export const userPreferencesEventSchema = z.object({
    theme: z.enum(['light', 'dark', 'auto']),
    language: z.string(),
    notifications: z.boolean()
});

export type UserPreferencesEvent = z.infer<typeof userPreferencesEventSchema>;
```

```typescript
// src/lib/local-sync/events/cart-items.ts
import { z } from "zod";

export const cartItemsEventSchema = z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive()
}));

export type CartItemsEvent = z.infer<typeof cartItemsEventSchema>;
```

#### Step 2: Register events

```typescript
// src/lib/local-sync/index.ts
import { clientFolderChangeEventSchema } from "./events/client-folder-change";
import { userPreferencesEventSchema } from "./events/user-preferences";
import { cartItemsEventSchema } from "./events/cart-items";

export const events = {
    'client-folder-change': { schema: clientFolderChangeEventSchema },
    'user-preferences': { schema: userPreferencesEventSchema },
    'cart-items': { schema: cartItemsEventSchema }
} as const;
```

#### Step 3: Use in components

```tsx
function PreferencesComponent() {
    const [prefs, setPrefs] = useLocalSync('user-preferences');

    return (
        <select
            value={prefs?.theme ?? 'auto'}
            onChange={(e) => setPrefs({
                ...prefs,
                theme: e.target.value as 'light' | 'dark' | 'auto'
            })}
        >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
        </select>
    );
}

function CartComponent() {
    const [cart, setCart] = useLocalSync('cart-items');

    const addItem = (productId: string, price: number) => {
        setCart([
            ...(cart ?? []),
            { productId, quantity: 1, price }
        ]);
    };

    return (
        <div>
            {cart?.map(item => (
                <div key={item.productId}>
                    {item.productId} x {item.quantity} = ${item.price * item.quantity}
                </div>
            ))}
        </div>
    );
}
```

### Helper Functions

The system also provides helper functions for manual validation:

```typescript
import { createEventPayload, validateEventPayload } from '@/lib/local-sync';

// Create and validate payload
const validated = createEventPayload('client-folder-change', {
    clientId: 'client-1',
    folderId: 'folder-1'
});

// Check if unknown data is valid
function handleUnknownData(data: unknown) {
    if (validateEventPayload('client-folder-change', data)) {
        // TypeScript now knows data is the correct type
        console.log(data.clientId);
    }
}
```

## 🔍 Debugging

### Console Logging

The system logs helpful messages:

```
✅ Success:
client-folder-change updated (validated) {"clientId":"client-1","folderId":"folder-1"}

❌ Validation Errors:
Validation failed for outgoing data on event "client-folder-change": [
  {
    "code": "too_small",
    "minimum": 3,
    "path": ["clientId"],
    "message": "Client ID must be at least 3 characters"
  }
]

❌ Parse Errors:
Error parsing localStorage value for event "client-folder-change": SyntaxError: ...
```

### DevTools Integration

Check localStorage in browser DevTools:
- Open DevTools → Application → Local Storage
- Find your event key (e.g., `client-folder-change`)
- View/edit the stored JSON

## 🎯 Type Safety Examples

### Event Name Auto-Completion

```typescript
// TypeScript suggests all available events
const [data, setData] = useLocalSync('...'); // Shows: 'client-folder-change', 'user-preferences', etc.
```

### Payload Auto-Completion

```typescript
const [data, setData] = useLocalSync('client-folder-change');

// TypeScript knows the exact structure
setData({
    clientId: '...', // ✅ Auto-completes
    folderId: '...', // ✅ Auto-completes
    invalid: '...' // ❌ Type error - property doesn't exist
});
```

### Conditional Type Narrowing

```typescript
const [data, setData] = useLocalSync('client-folder-change');

if (data) {
    // TypeScript knows data is not null here
    console.log(data.clientId); // ✅ Safe
    console.log(data.folderId); // ✅ Safe (can be null)
}
```

## 🛠️ Testing

The system includes comprehensive tests at `/local/test`:

1. **Sync Status Display** - Monitor real-time sync events
2. **Rapid Update Tester** - Stress test with rapid updates
3. **localStorage Manipulator** - Test data corruption scenarios
4. **Performance Monitor** - Track memory and performance

Visit `http://localhost:3000/local/test` to run tests.

## 📝 Best Practices

### 1. Always Use Type Inference

✅ **Good** - Let Zod infer the type:
```typescript
export const schema = z.object({ name: z.string() });
export type MyType = z.infer<typeof schema>;
```

❌ **Bad** - Manually defining types can cause mismatches:
```typescript
export type MyType = { name: string };
export const schema = z.object({ name: z.string() });
```

### 2. Use Descriptive Event Names

✅ **Good:**
```typescript
'client-folder-change'
'user-preferences-update'
'cart-items-sync'
```

❌ **Bad:**
```typescript
'data'
'update'
'sync'
```

### 3. Add Validation Rules

```typescript
// ✅ Good - Provides meaningful validation
export const schema = z.object({
    email: z.string().email("Invalid email format"),
    age: z.number().int().min(0).max(150),
    username: z.string().min(3).max(20)
});

// ❌ Bad - No validation
export const schema = z.object({
    email: z.string(),
    age: z.number(),
    username: z.string()
});
```

### 4. Handle Null States

```typescript
const [data, setData] = useLocalSync('client-folder-change');

// ✅ Good - Handle null case
if (data) {
    console.log(data.clientId);
} else {
    console.log('No data yet');
}

// ❌ Bad - Might crash if data is null
console.log(data.clientId); // Error if data is null
```

## 🔧 Troubleshooting

### Issue: Types not working

**Solution:** Make sure events are registered in `src/lib/local-sync/index.ts` with `as const`:

```typescript
export const events = {
    'my-event': { schema: myEventSchema }
} as const; // ← Don't forget this!
```

### Issue: Validation always fails

**Solution:** Check your schema matches the data structure:

```typescript
// Schema
z.object({
    clientId: z.string().min(3), // Requires at least 3 characters
    folderId: z.string().nullable()
})

// ❌ This will fail
setData({ clientId: 'ab', folderId: null }); // 'ab' is too short

// ✅ This will succeed
setData({ clientId: 'abc', folderId: null });
```

### Issue: Cross-tab sync not working

**Checklist:**
1. Both tabs using same event name?
2. Both tabs on same origin (domain + port)?
3. localStorage enabled in browser?
4. Check browser console for errors

## 📖 API Reference

### useLocalSync

```typescript
function useLocalSync<T extends EventType>(
    eventName: T
): [EventPayload<T> | null, (value: EventPayload<T>) => void]
```

**Parameters:**
- `eventName` - The registered event name (auto-completed)

**Returns:**
- `[value, setValue]` - Tuple like `useState`, but with:
  - Automatic validation
  - Cross-tab synchronization
  - localStorage persistence
  - Full TypeScript support

### createEventPayload

```typescript
function createEventPayload<T extends EventType>(
    eventType: T,
    payload: EventPayload<T>
): EventPayload<T>
```

Creates and validates an event payload. Throws if validation fails.

### validateEventPayload

```typescript
function validateEventPayload<T extends EventType>(
    eventType: T,
    payload: unknown
): payload is EventPayload<T>
```

Type guard that validates unknown data.

## 🎓 Summary

1. **Define schemas** in `src/lib/local-sync/events/`
2. **Register events** in `src/lib/local-sync/index.ts`
3. **Use in components** with `useLocalSync('event-name')`
4. **Get** automatic validation, types, and sync!

No manual type annotations, no passing schemas around, no validation code in components. Everything just works! ✨
