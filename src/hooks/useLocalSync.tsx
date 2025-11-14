import { useEffect, useState } from "react";
import { events, EventType, EventPayload } from "@/lib/local-sync";

/**
 * Type-safe hook for syncing data across tabs using localStorage with automatic validation
 *
 * @example
 * const [clientFolderChange, setClientFolderChange] = useLocalSync('client-folder-change');
 *
 * // TypeScript knows the exact shape of clientFolderChange and validates on set
 * setClientFolderChange({ clientId: 'f02ed631-003b-496e-8850-9a8f238808c4', folderId: 'cccb6240-338d-49b3-a144-7fed5482c45b' });
 */
const useLocalSync = <T extends EventType>(eventName: T): [EventPayload<T> | null, (value: EventPayload<T>) => void] => {

    const [value, setValue] = useState<EventPayload<T> | null>(() => {
        // Never loads initial value from localStorage
        return null;
    });

    useEffect(() => {

        const handleStorageChange = (event: StorageEvent) => {
            console.log("event", event);
            if (event.key === eventName && event.newValue !== null) {
                console.log("Received event", eventName);
                try {
                    const parsedValue = JSON.parse(event.newValue);

                    // [SECURITY] Validate with Zod schema
                    const schema = events[eventName].schema;
                    const validationResult = schema.safeParse(parsedValue);

                    if (!validationResult.success) {
                        console.error(
                            `Validation failed for incoming data on event "${eventName}":`,
                            validationResult.error.issues
                        );
                        // Do nothing if validation fails
                        return;
                    }

                    setValue(validationResult.data as EventPayload<T>);
                    // console.log(`${eventName} updated (validated)`, event.newValue);

                } catch (error) { // do nothnig if parsing fails (likely external data manipulation attempt)
                    // console.error(`Error parsing localStorage value for event "${eventName}":`, error);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [eventName]);

    const updateValue = (newValue: EventPayload<T>) => {
        try {
            // Validate with Zod schema before sending
            const schema = events[eventName].schema;
            const validationResult = schema.safeParse(newValue);

            if (!validationResult.success) {
                console.error(
                    `Validation failed for outgoing data on event "${eventName}":`,
                    validationResult.error.issues
                );
                // Do nothing if validation fails
                return;
            }

            // Use validated data
            const validatedValue = validationResult.data as EventPayload<T>;
            const valueToStore = JSON.stringify(validatedValue);

            localStorage.setItem(eventName, valueToStore);

            // Dispatch custom storage event to sync within the same tab
            window.dispatchEvent(
                new StorageEvent("storage", {
                    key: eventName,
                    newValue: valueToStore,
                    storageArea: localStorage,
                })
            );

            // remove event from localStorage
            localStorage.removeItem(eventName);

            setValue(validatedValue);
        } catch (error) {
            console.error(`Error setting localStorage for event "${eventName}":`, error);
        }
    };

    return [value, updateValue];
};

export default useLocalSync;
