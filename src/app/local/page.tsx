"use client";

import Center from '@/components/local/Center';
import ClientInfo from '@/components/local/ClientInfo';
import Sidebar from '@/components/local/Sidebar';

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