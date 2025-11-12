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

    topbarDetails: { folder: Folder | null, id: string, name: string } | null
    setTopbarDetails: (details: { folder: Folder | null, id: string, name: string } | null) => void
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
        if (get().clientInfo?.id === clientId) {
            // @ts-ignore
            set({ clientInfo: get().clientInfo ? { ...get().clientInfo, folder: folders.find(folder => folder.id === folderId) || null } : null })
        }
    },

    clientInfo: null,
    setClientInfo: (info) => set({ clientInfo: info }),
    handleClientInfoFolderChange: (folderId) => {
        if (get().clientInfo) {
            // @ts-ignore
            set({ clientInfo: get().clientInfo ? { ...get().clientInfo, folder: folders.find(folder => folder.id === folderId) || null } : null })
            set({ clientsList: get().clientsList.map(client => client.id === get().clientInfo?.id ? { ...client, folder: folders.find(folder => folder.id === folderId) || null } : client) })
            set({ topbarDetails: { ...get().topbarDetails, folder: folders.find(folder => folder.id === folderId) || null } as { folder: Folder | null, id: string, name: string } })
        }
    },

    topbarDetails: null,
    setTopbarDetails: (details) => set({ topbarDetails: details }),
}))

