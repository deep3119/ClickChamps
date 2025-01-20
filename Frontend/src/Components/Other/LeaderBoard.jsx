import React from 'react'
import Navbar from '../Common/Navbar'
import '../../Font.css'

function LeaderBoard() {
    return (
        <div className='__className_ea5f4b antialiased min-h-screen bg-gradient-to-b from-neutral-900 to-black text-neutral-400'>
            <Navbar />
            <div
                className="w-full max-w-5xl mx-auto space-y-8 pb-8 px-4 sm:px-6 lg:px-8 mt-7"
            >
                <div style={{ transform: "translateY(20px)" }}>
                    <div className="rounded-xl border text-card-foreground bg-neutral-900/50 border-neutral-800 shadow-lg">
                        <div className="flex flex-col space-y-1.5 p-6 pb-2">
                            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                <div className="font-semibold geist-mono-latin-600 tracking-tight text-xl sm:text-2xl flex items-center space-x-3 text-neutral-200">
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
                                        className="lucide lucide-crown size-6 sm:size-8 text-yellow-400"
                                    >
                                        <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
                                        <path d="M5 21h14" />
                                    </svg>
                                    <span>Leaderboard</span>
                                    <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs sm:text-sm">
                                        Updates in {/* */}30{/* */}s
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                    <div className="w-full flex items-center space-x-1 bg-neutral-800 rounded-md p-1">
                                        <button className="inline-flex geist-mono-latin-500 items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 w-full text-xs sm:text-sm bg-neutral-700 text-neutral-200">
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
                                                className="lucide lucide-activity size-3 sm:size-4 mr-1"
                                            >
                                                <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
                                            </svg>
                                            All-Time
                                        </button>
                                        <button className="inline-flex geist-mono-latin-500 items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 w-full text-xs sm:text-sm text-neutral-400">
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
                                                className="lucide lucide-hourglass size-3 sm:size-4 mr-1"
                                            >
                                                <path d="M5 22h14" />
                                                <path d="M5 2h14" />
                                                <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                                                <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                                            </svg>
                                            Daily
                                        </button>
                                    </div>
                                    <button
                                        className="inline-flex geist-mono-latin-400 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 bg-neutral-800 border-neutral-700 text-neutral-200 text-xs sm:text-sm w-full sm:w-auto"
                                        type="button"
                                        id="radix-:Rkpjttb:"
                                        aria-haspopup="menu"
                                        aria-expanded="false"
                                        data-state="closed"
                                    >
                                        All Modes
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
                                            className="lucide lucide-chevron-down ml-2 size-3 sm:size-4"
                                        >
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="flex geist-mono-latin-400 h-9 rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-neutral-800 border-neutral-700 text-gray-100 w-full"
                                    placeholder="Search by name..."
                                    defaultValue=""
                                />
                            </div>
                            <div className="overflow-x-auto">
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
                                    className="lucide lucide-loader-pinwheel animate-spin mx-auto size-10 text-yellow-400"
                                >
                                    <path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" />
                                    <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
                                    <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
                                    <circle cx={12} cy={12} r={10} />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="flex justify-center"
                    style={{ transform: "translateY(20px)" }}
                >
                    <a
                        className="inline-flex text-white geist-mono-latin-600 items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-700 hover:to-emerald-800 font-semibold transition-all duration-300 h-10 rounded-md px-8 w-full sm:w-auto"
                        href="/type"
                    >
                        Start New Race
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
                            className="lucide lucide-arrow-right ml-2"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>

    )
}

export default LeaderBoard
