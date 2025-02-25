import React from 'react'
import '../../Font.css'

function Navbar({ isAuthenticated }) {
    return (
        <header className='w-full max-w-5xl mx-auto flex items-center justify-between px-6 py-4 '>
            <a href="/" className='text-2xl font-bold text-neutral-200 flex items-center space-x-1'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 64 64"
                    fill="none"
                >
                    <circle cx={32} cy={32} r={30} stroke="rgb(191 63 63)" strokeWidth={4} />
                    <circle cx={32} cy={32} r={8} fill="rgb(248 113 113)" />
                    <path
                        d="M32 12L40 20L36 32L40 44L32 52L24 44L28 32L24 20L32 12Z"
                        fill="#FFFFFF"
                        stroke="#FF4500"
                        strokeWidth={2}
                    />
                </svg>

                <p className='fira-700'>
                    Click
                    <span className="text-red-400">Champs</span>
                </p>
            </a>
            <nav className="flex items-center gap-x-6 fira-400">
                <a className="flex items-center gap-x-2.5 hover:text-red-400 transition-colors duration-300" href="/click">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-keyboard"><path d="M4 7v-3c0-2.209 1.791-4 4-4h3v7h-7zm9 0h7v-3c0-2.209-1.791-4-4-4h-3v7zm-9 2v7c0 4.418 3.582 8 8 8s8-3.582 8-8v-7h-16z" />
                    </svg>
                    <p className="hidden md:block">Click</p>
                </a>
                <a className="flex items-center gap-x-2.5 hover:text-red-400 transition-colors duration-300" href="/multiplayer">
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
                <a className="flex items-center gap-x-2.5 hover:text-red-400 transition-colors duration-300" href="/leaderboard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-crown">
                        <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path>
                        <path d="M5 21h14"></path>
                    </svg>
                    <p className="hidden md:block">Leaderboard</p>
                </a>
                <a className="flex items-center gap-x-2.5 hover:text-red-400 transition-colors duration-300" href="/profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <p className="hidden md:block">Profile</p>
                </a>
                {isAuthenticated ?
                    <a href='/logout' className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 w-9 hover:bg-red-500 hover:text-white transition-colors duration-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-log-out !size-6"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1={21} x2={9} y1={12} y2={12} />
                        </svg>
                    </a>
                    : <></>
                }
            </nav>
        </header >
    )
}

export default Navbar
