import { folders } from '@/data/folders'
import { create } from 'zustand'


export interface MainStore {
    sidebarList: SidebarList
    setSidebarList: (list: SidebarList) => void

    clientsList: ClientsList
    setClientsList: (list: ClientsList) => void
    handleClientListFolderChange: (clientId: string, folderId: string | null) => void

    clientInfo: ClientInfo | null
    setClientInfo: (info: ClientInfo | null) => void
    handleClientInfoFolderChange: (folderId: string | null) => void

    topbarDetails: { folder: Folder | null, id: string, name: string, count: number } | null
    setTopbarDetails: (details: { folder: Folder | null, id: string, name: string, count: number } | null) => void
}


export const useMainStore = create<MainStore>((set, get) => ({
    sidebarList: [],
    setSidebarList: (list) => set({ sidebarList: list }),

    clientsList: [],
    setClientsList: (list) => set({ clientsList: list }),
    handleClientListFolderChange: (clientId, folderId) => {
        // update clients list
        set({ clientsList: get().clientsList.map(client => client.id === clientId ? { ...client, folder: folders.find(folder => folder.id === folderId) || null } : client) })

        // update client info
        // @ts-ignore
        set({ clientInfo: get().clientInfo ? { ...get().clientInfo, folder: folders.find(folder => folder.id === folderId) || null } : null })

        const sidebarList = get().sidebarList
        // Check if client is outside (not in a folder)
        const clientOutside = sidebarList.find(i => i.id === clientId && i.type === 'client')

        // update sidebar list
        if (clientOutside) {
            // Case 1: Move client from outside to folder
            if (folderId) {
                const newList = sidebarList
                    .filter(i => i.id !== clientId)
                    .map(item => {
                        if (item.id === folderId && item.type === 'folder') {
                            return {
                                ...item,
                                clientItems: [...item.clientItems, {
                                    id: clientId,
                                    name: clientOutside.name,
                                    type: 'client' as const
                                }]
                            }
                        }
                        return item
                    })
                set({ sidebarList: newList })
            }
        } else {
            // Client is in a folder - find which folder
            const sourceFolder = sidebarList.find(
                (i): i is SidebarFolderItem =>
                    i.type === 'folder' &&
                    i.clientItems.some(c => c.id === clientId)
            )

            if (sourceFolder) {
                const clientItem = sourceFolder.clientItems.find(c => c.id === clientId)
                if (!clientItem) return

                if (folderId) {
                    // Case 2: Move client from folder A to folder B
                    let targetFolderFound = false

                    const mappedList = sidebarList.map(item => {
                        if (item.type === 'folder') {
                            if (item.id === sourceFolder.id) {
                                // Remove from source folder
                                return {
                                    ...item,
                                    clientItems: item.clientItems.filter(c => c.id !== clientId)
                                }
                            }

                            if (item.id === folderId) {
                                targetFolderFound = true
                                // Add to target folder
                                return {
                                    ...item,
                                    clientItems: [...item.clientItems, {
                                        id: clientId,
                                        name: clientItem.name,
                                        type: 'client' as const
                                    }]
                                }
                            }
                        }

                        return item
                    })

                    const newList = targetFolderFound
                        ? mappedList
                        : [...mappedList, {
                            id: clientId,
                            name: clientItem.name,
                            type: 'client' as const
                        }]

                    set({ sidebarList: newList })
                } else {
                    // Case 3: Move client from folder to outside
                    const newList = sidebarList.map(i =>
                        i.type === 'folder' && i.id === sourceFolder.id
                            ? { ...i, clientItems: i.clientItems.filter(c => c.id !== clientId) }
                            : i
                    )
                    newList.push({
                        id: clientId,
                        name: clientItem.name,
                        type: 'client' as const
                    })
                    set({ sidebarList: newList })
                }
            }
        }

    },

    clientInfo: null,
    setClientInfo: (info) => set({ clientInfo: info }),
    handleClientInfoFolderChange: (folderId) => {
        if (get().clientInfo) {
            // @ts-ignorefolderContainsClient
            set({ clientInfo: get().clientInfo ? { ...get().clientInfo, folder: folders.find(folder => folder.id === folderId) || null } : null })
            set({ clientsList: get().clientsList.map(client => client.id === get().clientInfo?.id ? { ...client, folder: folders.find(folder => folder.id === folderId) || null } : client) })
            set({ topbarDetails: { ...get().topbarDetails, folder: folders.find(folder => folder.id === folderId) || null } as { folder: Folder | null, id: string, name: string, count: number } })

            const sidebarList = get().sidebarList
            const clientId = get().clientInfo?.id
            // Check if client is outside (not in a folder)
            const clientOutside = sidebarList.find(i => i.id === clientId && i.type === 'client')

            // update sidebar list
            if (clientOutside) {
                // Case 1: Move client from outside to folder
                if (folderId) {
                    const newList = sidebarList
                        .filter(i => i.id !== clientId)
                        .map(item => {
                            if (item.id === folderId && item.type === 'folder') {
                                return {
                                    ...item,
                                    clientItems: [...item.clientItems, {
                                        id: clientId,
                                        name: clientOutside.name,
                                        type: 'client' as const
                                    }]
                                }
                            }
                            return item
                        })
                    // @ts-ignore
                    set({ sidebarList: newList })
                }
            } else {
                // Client is in a folder - find which folder
                const sourceFolder = sidebarList.find(
                    (i): i is SidebarFolderItem =>
                        i.type === 'folder' &&
                        i.clientItems.some(c => c.id === clientId)
                )

                if (sourceFolder) {
                    const clientItem = sourceFolder.clientItems.find(c => c.id === clientId)
                    if (!clientItem) return

                    if (folderId) {
                        // Case 2: Move client from folder A to folder B
                        let targetFolderFound = false

                        const mappedList = sidebarList.map(item => {
                            if (item.type === 'folder') {
                                if (item.id === sourceFolder.id) {
                                    // Remove from source folder
                                    return {
                                        ...item,
                                        clientItems: item.clientItems.filter(c => c.id !== clientId)
                                    }
                                }

                                if (item.id === folderId) {
                                    targetFolderFound = true
                                    // Add to target folder
                                    return {
                                        ...item,
                                        clientItems: [...item.clientItems, {
                                            id: clientId,
                                            name: clientItem.name,
                                            type: 'client' as const
                                        }]
                                    }
                                }
                            }

                            return item
                        })

                        const newList = targetFolderFound
                            ? mappedList
                            : [...mappedList, {
                                id: clientId,
                                name: clientItem.name,
                                type: 'client' as const
                            }]

                        set({ sidebarList: newList as SidebarList })
                    } else {
                        // Case 3: Move client from folder to outside
                        const newList = sidebarList.map(i =>
                            i.type === 'folder' && i.id === sourceFolder.id
                                ? { ...i, clientItems: i.clientItems.filter(c => c.id !== clientId) }
                                : i
                        )
                        newList.push({
                            // @ts-ignore
                            id: clientId,
                            name: clientItem.name,
                            type: 'client' as const
                        })
                        set({ sidebarList: newList as SidebarList })
                    }
                }
            }

        }
    },

    topbarDetails: null,
    setTopbarDetails: (details) => set({ topbarDetails: details }),
}))

