import React from 'react'
import '../../Font.css'

function Navbar() {
    return (
        <header className='w-full max-w-5xl mx-auto flex items-center justify-between px-6 py-4 '>
            <a href="" className='text-2xl font-bold text-neutral-200 flex items-center space-x-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap size-6 text-emerald-400">
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                </svg>
                <p className='geist-mono-latin-700'>
                    Type
                    <span className="text-emerald-400">Fast</span>
                </p>
            </a>
            <nav className="flex items-center gap-x-6 geist-mono-latin-400">
                <a className="flex items-center gap-x-2.5 hover:text-white transition-colors duration-300" href="/type">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-keyboard">
                        <path d="M10 8h.01"></path>
                        <path d="M12 12h.01"></path>
                        <path d="M14 8h.01"></path>
                        <path d="M16 12h.01"></path>
                        <path d="M18 8h.01"></path>
                        <path d="M6 8h.01"></path>
                        <path d="M7 16h10"></path>
                        <path d="M8 12h.01"></path>
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    </svg>
                    <p className="hidden md:block">Type</p>
                </a>
                <a className="flex items-center gap-x-2.5 hover:text-white transition-colors duration-300" href="/multiplayer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-swords">
                        <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"> </polyline>
                        <line x1="13" x2="19" y1="19" y2="13"></line>
                        <line x1="16" x2="20" y1="16" y2="20"></line>
                        <line x1="19" x2="21" y1="21" y2="19"></line>
                        <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"></polyline>
                        <line x1="5" x2="9" y1="14" y2="18"></line>
                        <line x1="7" x2="4" y1="17" y2="20"></line>
                        <line x1="3" x2="5" y1="19" y2="21"></line>
                    </svg>
                    <p className="hidden md:block">Multiplayer</p>
                </a>
                <a className="flex items-center gap-x-2.5 hover:text-white transition-colors duration-300" href="/leaderboard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-crown">
                        <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path>
                        <path d="M5 21h14"></path>
                    </svg>
                    <p className="hidden md:block">Leaderboard</p>
                </a>
                <a className="flex items-center gap-x-2.5 hover:text-white transition-colors duration-300" href="/profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <p className="hidden md:block">Profile</p>
                </a>
            </nav>
        </header >
    )
}

export default Navbar
