"use client";

import ClientInfo from '@/components/local/ClientInfo'
import CommandMenu from '@/components/local/CommandMenu';
import TopBar from '@/components/local/TopBar';
import React from 'react'

function page() {
    return (
        <div className='text-sm flex items-end flex-col h-screen'>

            <TopBar />

            <div className='h-full flex w-full'>
                <div className='flex-1 flex items-center justify-center'>
                    <CommandMenu />

                </div>
                <ClientInfo />
            </div>

        </div>
    )
}

export default page