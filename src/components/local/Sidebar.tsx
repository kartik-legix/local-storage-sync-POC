import { useEffect, useState } from 'react'

function Sidebar() {
    const [sidebarList, setSidebarList] = useState<SidebarList>([])

    useEffect(() => {
        fetch('/api/sidebar')
            .then(res => res.json())
            .then(data => {
                setSidebarList(data.list)
                console.log(data.list)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className='w-[290px] p-3 space-y-2 border-r border-white/10'>
            <p>Sidebar</p>
            <hr className='opacity-20' />

            <div className='space-y-3'>
                {sidebarList.map(i => (
                    <div key={i.id}>
                        {i.type === "folder" ? (
                            <div className='space-y-1'>
                                <div className='flex items-center gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><title>folder-5</title><g fill="currentColor"><path d="m1,5c0-1.105.895-2,2-2h3.48c-.076-.267-.145-.479-.187-.568l-.298-.637c-.369-.787-1.168-1.295-2.038-1.295h-1.708C1.009.5,0,1.509,0,2.75v2c0,.414.336.75.75.75.063,0,.152.04.25.094v-.594Z" strokeWidth="0"></path><path d="m9.25,11H2.75c-1.517,0-2.75-1.233-2.75-2.75v-3.5c0-1.517,1.233-2.75,2.75-2.75h6.5c1.517,0,2.75,1.233,2.75,2.75v3.5c0,1.517-1.233,2.75-2.75,2.75ZM2.75,3.5c-.689,0-1.25.561-1.25,1.25v3.5c0,.689.561,1.25,1.25,1.25h6.5c.689,0,1.25-.561,1.25-1.25v-3.5c0-.689-.561-1.25-1.25-1.25H2.75Z" strokeWidth="0"></path></g></svg>
                                    <p>{i.name}</p>
                                </div>
                                <div className='pl-4 opacity-60 space-y-1'>
                                    {i.clientItems.map(c => (
                                        <div className='flex items-center gap-2' key={c.id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><title>radio-checked</title><g fill="currentColor"><path d="m6,0C2.691,0,0,2.691,0,6s2.691,6,6,6,6-2.691,6-6S9.309,0,6,0Zm0,9c-1.654,0-3-1.346-3-3s1.346-3,3-3,3,1.346,3,3-1.346,3-3,3Z" strokeWidth="0"></path></g></svg>
                                            <p>{c.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className='flex items-center gap-2 opacity-80'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><title>radio-checked</title><g fill="currentColor"><path d="m6,0C2.691,0,0,2.691,0,6s2.691,6,6,6,6-2.691,6-6S9.309,0,6,0Zm0,9c-1.654,0-3-1.346-3-3s1.346-3,3-3,3,1.346,3,3-1.346,3-3,3Z" strokeWidth="0"></path></g></svg>
                                <p>{i.name}</p>
                            </div>
                        )}

                    </div>
                ))}

            </div>
        </div>
    )
}

export default Sidebar