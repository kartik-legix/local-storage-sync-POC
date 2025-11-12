"use client";

import Center from '@/components/common-state/Center';
import ClientInfo from '@/components/common-state/ClientInfo';
import Sidebar from '@/components/common-state/Sidebar';

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