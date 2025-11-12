import { create } from 'zustand';


export interface CommonStore {
    data: ClientsList | null
    setData: (data: ClientsList | null) => void;
    
    handleFolderChange: (folderId: string) => void;
}


export const useCommonStore = create<CommonStore>((set, get) => ({
    data: null,
    setData: (data) => set({ data: data }),
    handleFolderChange: (folderId) => {
        // set({ data: get().data.map(client => client.id === folderId ? { ...client, folder: folders.find(folder => folder.id === folderId) || null } : client) })
    }
}))

