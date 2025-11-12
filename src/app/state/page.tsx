"use client";

import Center from '@/components/state/Center';
import ClientInfo from '@/components/state/ClientInfo';
import Sidebar from '@/components/state/Sidebar';

function page() {


    return (
        <div className='flex h-screen text-sm'>

            <Sidebar />

            <div className='flex-1'>
                <Center />
            </div>

            <ClientInfo />

        </div>
    )
}

export default page