type Folder = {
    id: string;
    name: string;
}

// ------------------------------------------------------------
// Client info
// ------------------------------------------------------------
type ClientInfo = {
    id: string;
    name: string;
    folder: Folder | null;
    contact: string;
    joined: string;
    synced: string;
}


// ------------------------------------------------------------
// Client list
// ------------------------------------------------------------
type ClientsList = {
    id: string;
    name: string;
    folder: Folder | null;
}[]


// ------------------------------------------------------------
// Sidebar
// ------------------------------------------------------------
type SidebarList = SidebarListItem[]

type SidebarListItem = SidebarFolderItem | SidebarClientItem

type SidebarFolderItem = Folder & {
    clientItems: SidebarClientItem[];
    type: "folder"
}

type SidebarClientItem = {
    type: "client"
    id: string;
    name: string;
}