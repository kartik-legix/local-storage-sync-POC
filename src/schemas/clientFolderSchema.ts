import { z } from "zod";

// Schema for client folder change data
export const clientFolderChangeSchema = z.object({
    clientId: z.string().min(1, "Client ID must not be empty"),
    folderId: z.string().nullable()
}).nullable();

// Type inference from schema
export type ClientFolderChange = z.infer<typeof clientFolderChangeSchema>;
