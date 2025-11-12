"use client";

import ClientInfo from '@/components/state/ClientInfo'
import TopBar from '@/components/state/TopBar';

function page() {
    return (
        <div className='text-sm flex items-end flex-col h-screen'>

            <TopBar />

            <ClientInfo />

        </div>
    )
}

export default page