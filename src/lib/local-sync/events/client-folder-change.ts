import { z } from "zod";

// Define the schema first
export const clientFolderChangeEventSchema = z.object({
    clientId: z.string().min(3, "Client ID cannot be empty"),
    folderId: z.string().min(3, "Folder ID cannot be empty").nullable()
});

// Infer the TypeScript type from the schema (ensures they're always in sync)
export type ClientFolderChangeEvent = z.infer<typeof clientFolderChangeEventSchema>;