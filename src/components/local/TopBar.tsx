import { folders } from '@/data/folders'
import useLocalSync from '@/hooks/useLocalSync'
import { useQueryState } from 'nuqs'
import React, { useEffect, useState } from 'react'

function TopBar() {
    const [id, setId] = useQueryState('id')
    const [activeClientDetails, setActiveClientDetails] = useState<{ folder: Folder | null, id: string, name: string, count: number } | null>(null)

    // ✨ Just pass the event name - types and validation are automatic!
    const [val, setVal] = useLocalSync('client-folder-change')

    useEffect(() => {
        if (!id) {
            return
        }

        fetch(`/api/active-client?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setActiveClientDetails(data.info)
            })
    }, [id])

    useEffect(() => {
        if (val && val.clientId === id && activeClientDetails) {
            setActiveClientDetails({ ...activeClientDetails, folder: folders.find(folder => folder.id === val.folderId) || null })
        }
    }, [val])

    return (
        <div className='h-[50px] border-b border-white/10 w-full flex px-2 items-center'>

            <div className='flex items-center justify-between gap-2 border border-white/30 pr-2'>
                <div className='flex items-center gap-2 bg-white/20 h-[32px] px-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><title>folder-5</title><g fill="currentColor"><path d="m1,5c0-1.105.895-2,2-2h3.48c-.076-.267-.145-.479-.187-.568l-.298-.637c-.369-.787-1.168-1.295-2.038-1.295h-1.708C1.009.5,0,1.509,0,2.75v2c0,.414.336.75.75.75.063,0,.152.04.25.094v-.594Z" strokeWidth="0"></path><path d="m9.25,11H2.75c-1.517,0-2.75-1.233-2.75-2.75v-3.5c0-1.517,1.233-2.75,2.75-2.75h6.5c1.517,0,2.75,1.233,2.75,2.75v3.5c0,1.517-1.233,2.75-2.75,2.75ZM2.75,3.5c-.689,0-1.25.561-1.25,1.25v3.5c0,.689.561,1.25,1.25,1.25h6.5c.689,0,1.25-.561,1.25-1.25v-3.5c0-.689-.561-1.25-1.25-1.25H2.75Z" strokeWidth="0"></path></g></svg>
                    <p>{activeClientDetails?.folder?.name || 'No folder'}</p>
                </div>

                <div className='flex items-center gap-2 text-xs'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='size-2.5' width="12" height="12" viewBox="0 0 12 12"><title>radio-checked</title><g fill="currentColor"><path d="m6,0C2.691,0,0,2.691,0,6s2.691,6,6,6,6-2.691,6-6S9.309,0,6,0Zm0,9c-1.654,0-3-1.346-3-3s1.346-3,3-3,3,1.346,3,3-1.346,3-3,3Z" strokeWidth="0"></path></g></svg>
                    <p>{activeClientDetails?.name || 'No client'}</p>
                    <p> - {activeClientDetails?.count}</p>
                </div>
            </div>



            {/* <div className='flex items-center justify-between gap-2 border border-white/30 pr-2'>
                <div className='flex items-center gap-2 bg-white/20 h-[32px] px-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><title>folder-5</title><g fill="currentColor"><path d="m1,5c0-1.105.895-2,2-2h3.48c-.076-.267-.145-.479-.187-.568l-.298-.637c-.369-.787-1.168-1.295-2.038-1.295h-1.708C1.009.5,0,1.509,0,2.75v2c0,.414.336.75.75.75.063,0,.152.04.25.094v-.594Z" strokeWidth="0"></path><path d="m9.25,11H2.75c-1.517,0-2.75-1.233-2.75-2.75v-3.5c0-1.517,1.233-2.75,2.75-2.75h6.5c1.517,0,2.75,1.233,2.75,2.75v3.5c0,1.517-1.233,2.75-2.75,2.75ZM2.75,3.5c-.689,0-1.25.561-1.25,1.25v3.5c0,.689.561,1.25,1.25,1.25h6.5c.689,0,1.25-.561,1.25-1.25v-3.5c0-.689-.561-1.25-1.25-1.25H2.75Z" strokeWidth="0"></path></g></svg>
                    <p>Tech Startups</p>
                </div>

                <div className='flex items-center gap-2 text-xs'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='size-2.5' width="12" height="12" viewBox="0 0 12 12"><title>radio-checked</title><g fill="currentColor"><path d="m6,0C2.691,0,0,2.691,0,6s2.691,6,6,6,6-2.691,6-6S9.309,0,6,0Zm0,9c-1.654,0-3-1.346-3-3s1.346-3,3-3,3,1.346,3,3-1.346,3-3,3Z" strokeWidth="0"></path></g></svg>
                    <p>CloudSync Solutions</p>
                </div>

                <span className='inline-block w-px h-[20px] bg-white/30' />

                <div className='flex items-center gap-2 text-xs'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='size-2.5' width="12" height="12" viewBox="0 0 12 12"><title>radio-checked</title><g fill="currentColor"><path d="m6,0C2.691,0,0,2.691,0,6s2.691,6,6,6,6-2.691,6-6S9.309,0,6,0Zm0,9c-1.654,0-3-1.346-3-3s1.346-3,3-3,3,1.346,3,3-1.346,3-3,3Z" strokeWidth="0"></path></g></svg>
                    <p>DataFlow Analytics</p>
                </div>

                <span className='inline-block w-px h-[20px] bg-white/30' />

                <div className='flex items-center gap-2 text-xs'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='size-2.5' width="12" height="12" viewBox="0 0 12 12"><title>radio-checked</title><g fill="currentColor"><path d="m6,0C2.691,0,0,2.691,0,6s2.691,6,6,6,6-2.691,6-6S9.309,0,6,0Zm0,9c-1.654,0-3-1.346-3-3s1.346-3,3-3,3,1.346,3,3-1.346,3-3,3Z" strokeWidth="0"></path></g></svg>
                    <p>AI Innovations Lab</p>
                </div>
            </div> */}

        </div>
    )
}

export default TopBar