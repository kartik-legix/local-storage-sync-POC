import { folders } from '@/data/folders'
import { useCommonStore } from '@/store/commonStore'
import { useMainStore } from '@/store/mainStore'
import Link from 'next/link'
import { useQueryState } from 'nuqs'
import React, { useEffect, useState } from 'react'

function ClientInfo() {

    const [id, setId] = useQueryState('id')
    const data = useCommonStore(state => state.data)

    const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id || !data) {
            return
        }

        let clientInfo = data.find(client => client.id === id)
        if(!clientInfo){
            // search in folders
            let c = data.find(i => i.id === id)
        }
        if (clientInfo) {
            setClientInfo({
                id: clientInfo.id,
                name: clientInfo.name,
                folder: clientInfo.folder || null,
                contact: 'someone@example.com',
                joined: '25 Feb 2024',
                synced: '2 months ago'
            })
            setLoading(false)
        }
    }, [id, data])

    const handleClientInfoFolderChange = (folderId: string) => { }

    return (
        <div className='w-[320px] p-3 space-y-2 border-l border-white/10 h-full'>
            <div className='flex items-center justify-between'>
                <p>Client Info</p>
                <Link className='underline' target='_blank' href={clientInfo?.id ? `/state/feed?id=${clientInfo.id}` : '#'}>Go to Feed</Link>
            </div>
            <hr className='opacity-20' />

            {loading && (
                <div className='flex items-center justify-center py-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='animate-spin' width="18" height="18" viewBox="0 0 18 18"><title>loader-6</title><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="currentColor"><path d="m9,1.75c4.0041,0,7.25,3.2459,7.25,7.25"></path></g></svg>
                </div>
            )}

            <div className={`space-y-2 ${loading ? 'invisible' : 'visible'}`}>

                <div className='flex items-center gap-4'>
                    <p className='font-medium'>Folder</p>
                    <p>-</p>

                    <div className={`flex items-center gap-2 ${clientInfo?.folder ? 'opacity-100' : 'opacity-50'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><title>folder-5</title><g fill="currentColor"><path d="m1,5c0-1.105.895-2,2-2h3.48c-.076-.267-.145-.479-.187-.568l-.298-.637c-.369-.787-1.168-1.295-2.038-1.295h-1.708C1.009.5,0,1.509,0,2.75v2c0,.414.336.75.75.75.063,0,.152.04.25.094v-.594Z" strokeWidth="0"></path><path d="m9.25,11H2.75c-1.517,0-2.75-1.233-2.75-2.75v-3.5c0-1.517,1.233-2.75,2.75-2.75h6.5c1.517,0,2.75,1.233,2.75,2.75v3.5c0,1.517-1.233,2.75-2.75,2.75ZM2.75,3.5c-.689,0-1.25.561-1.25,1.25v3.5c0,.689.561,1.25,1.25,1.25h6.5c.689,0,1.25-.561,1.25-1.25v-3.5c0-.689-.561-1.25-1.25-1.25H2.75Z" strokeWidth="0"></path></g></svg>

                        {clientInfo?.folder ? (
                            <>
                                <select value={clientInfo?.folder?.id} onChange={(e) => handleClientInfoFolderChange(e.target.value)} className='appearance-none'>
                                    <option value={'None'}>None</option>
                                    {folders.map(f => (
                                        <option value={f.id} key={f.id}>{f.name}</option>
                                    ))}
                                </select>
                            </>
                        ) : (
                            <select value={'None'} onChange={(e) => handleClientInfoFolderChange(e.target.value)} className='appearance-none'>
                                <option value={'None'}>None</option>
                                {folders.map(f => (
                                    <option value={f.id} key={f.id}>{f.name}</option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <p className='font-medium'>Name</p>
                    <p>-</p>

                    <div className={`flex items-center gap-2`}>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><title>folder-5</title><g fill="currentColor"><path d="m1,5c0-1.105.895-2,2-2h3.48c-.076-.267-.145-.479-.187-.568l-.298-.637c-.369-.787-1.168-1.295-2.038-1.295h-1.708C1.009.5,0,1.509,0,2.75v2c0,.414.336.75.75.75.063,0,.152.04.25.094v-.594Z" strokeWidth="0"></path><path d="m9.25,11H2.75c-1.517,0-2.75-1.233-2.75-2.75v-3.5c0-1.517,1.233-2.75,2.75-2.75h6.5c1.517,0,2.75,1.233,2.75,2.75v3.5c0,1.517-1.233,2.75-2.75,2.75ZM2.75,3.5c-.689,0-1.25.561-1.25,1.25v3.5c0,.689.561,1.25,1.25,1.25h6.5c.689,0,1.25-.561,1.25-1.25v-3.5c0-.689-.561-1.25-1.25-1.25H2.75Z" strokeWidth="0"></path></g></svg> */}
                        <p>{clientInfo?.name || 'No name'}</p>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <p className='font-medium'>Contact</p>
                    <p>-</p>

                    <div className='flex items-center gap-2'>
                        <p>someone@example.com</p>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <p className='font-medium'>Joined</p>
                    <p>-</p>

                    <div className='flex items-center gap-2'>
                        <p>25 Feb 2024</p>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <p className='font-medium'>Synced</p>
                    <p>-</p>

                    <div className='flex items-center gap-2'>
                        <p>2 months ago</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ClientInfo