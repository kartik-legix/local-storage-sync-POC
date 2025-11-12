import React, { useState } from 'react'

function CommandMenu() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>
                Command Menu
            </button>
            {isOpen && (
                <div
                    className='fixed top-0 left-0 w-full h-full bg-black/50 z-50 inset flex items-center justify-center'
                    onClick={() => setIsOpen(false)}
                >
                    <div className='w-[440px] h-auto rounded-lg bg-neutral-900' onClick={(event) => event.stopPropagation()}>
                        <div className='p-2 border-b border-white/10 bg-white/10'>
                            <p>Command Menu</p>
                        </div>

                        <div className=''>
                            <div className='border-b p-2 border-white/10 hover:bg-white/10'>
                                <p>Categorize transactions</p>
                            </div>

                            <div className='border-b p-2 border-white/10 hover:bg-white/10'>
                                <p>Change category</p>
                            </div>

                            <div className='border-b p-2 border-white/10 hover:bg-white/10'>
                                <p>Change party</p>
                            </div>

                            <div className='borde r-b p-2 border-white/10 hover:bg-white/10'>
                                <p>Move client</p>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default CommandMenu