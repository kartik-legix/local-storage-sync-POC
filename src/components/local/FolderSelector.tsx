import { folders } from '@/data/folders'
import useLocalSync from '@/hooks/useLocalSync'
import React from 'react'

function FolderSelector({ clientId, folder, onChange }: { clientId: string, folder: Folder | null, onChange: (folderId: string) => void }) {

    // ✨ Just pass the event name - types and validation are automatic!
    const [val, setVal] = useLocalSync('client-folder-change')

    const handleChange = (folderId: string) => {
        setVal({ clientId, folderId: folderId === 'None' ? null : folderId })
        onChange(folderId)
    }

    return (
        <div className={`flex items-center gap-2 ${folder ? 'opacity-100' : 'opacity-50'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><title>folder-5</title><g fill="currentColor"><path d="m1,5c0-1.105.895-2,2-2h3.48c-.076-.267-.145-.479-.187-.568l-.298-.637c-.369-.787-1.168-1.295-2.038-1.295h-1.708C1.009.5,0,1.509,0,2.75v2c0,.414.336.75.75.75.063,0,.152.04.25.094v-.594Z" strokeWidth="0"></path><path d="m9.25,11H2.75c-1.517,0-2.75-1.233-2.75-2.75v-3.5c0-1.517,1.233-2.75,2.75-2.75h6.5c1.517,0,2.75,1.233,2.75,2.75v3.5c0,1.517-1.233,2.75-2.75,2.75ZM2.75,3.5c-.689,0-1.25.561-1.25,1.25v3.5c0,.689.561,1.25,1.25,1.25h6.5c.689,0,1.25-.561,1.25-1.25v-3.5c0-.689-.561-1.25-1.25-1.25H2.75Z" strokeWidth="0"></path></g></svg>

            {folder ? (
                <>
                    <select value={folder?.id} onChange={(e) => handleChange(e.target.value)} className='appearance-none'>
                        <option value={'None'}>None</option>
                        {folders.map(f => (
                            <option value={f.id} key={f.id}>{f.name}</option>
                        ))}
                    </select>
                </>
            ) : (
                <select value={'None'} onChange={(e) => handleChange(e.target.value)} className='appearance-none'>
                    <option value={'None'}>None</option>
                    {folders.map(f => (
                        <option value={f.id} key={f.id}>{f.name}</option>
                    ))}
                </select>
            )}
        </div>
    )
}

export default FolderSelector