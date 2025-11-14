import { z } from "zod";
import { clientFolderChangeEventSchema } from "./events/client-folder-change";

// Define events with their schemas
export const events = {
    'client-folder-change': {
        schema: clientFolderChangeEventSchema,
    }
};

// Type helpers for auto-completion
export type EventType = keyof typeof events;
export type EventPayload<T extends EventType> = z.infer<typeof events[T]['schema']>;

// Helper function to create typed event payloads with validation
export function createEventPayload<T extends EventType>(
    eventType: T,
    payload: EventPayload<T>
): EventPayload<T> {
    const result = events[eventType].schema.safeParse(payload);
    if (!result.success) {
        throw new Error(`Invalid payload for event "${eventType}": ${result.error.message}`);
    }
    return result.data as EventPayload<T>;
}

// Helper function to validate event payload
export function validateEventPayload<T extends EventType>(
    eventType: T,
    payload: unknown
): payload is EventPayload<T> {
    return events[eventType].schema.safeParse(payload).success;
}