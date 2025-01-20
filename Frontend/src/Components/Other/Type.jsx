import React from 'react'
import Navbar from '../Common/Navbar'
import '../../Font.css'

function Type() {
    return (
        <div className='__className_ea5f4b antialiased min-h-screen bg-gradient-to-b from-neutral-900 to-black text-neutral-400'>
            <Navbar />
            <main className="grid place-content-center mt-20">
                <div
                    className="w-full max-w-4xl"
                    style={{ transform: "translateY(20px)" }}
                >
                    <div className="mb-8">
                        <div className="mx-auto geist-mono-latin-400 w-fit flex items-center justify-center space-x-3 bg-neutral-900/50 p-2 rounded-full shadow-lg">
                            <button
                                className="rounded-full px-4 py-2 flex items-center transition-colors duration-200 text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300"
                                tabIndex={0}
                            >
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
                                    className="lucide lucide-hourglass mr-2"
                                >
                                    <path d="M5 22h14" />
                                    <path d="M5 2h14" />
                                    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                                    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                                </svg>
                                time
                            </button>
                            <button
                                className="rounded-full px-4 py-2 flex items-center transition-colors duration-200 bg-neutral-800 text-neutral-200"
                                tabIndex={0}
                            >
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
                                    className="lucide lucide-type mr-2"
                                >
                                    <polyline points="4 7 4 4 20 4 20 7" />
                                    <line x1={9} x2={15} y1={20} y2={20} />
                                    <line x1={12} x2={12} y1={4} y2={20} />
                                </svg>
                                words
                            </button>
                            <div className="h-7 w-px bg-neutral-700" />
                            <button
                                className="rounded-full px-3 py-1 min-w-[2rem] transition-colors duration-200 bg-neutral-800 text-neutral-200"
                                tabIndex={0}
                            >
                                10
                            </button>
                            <button
                                className="rounded-full px-3 py-1 min-w-[2rem] transition-colors duration-200 text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300"
                                tabIndex={0}
                            >
                                25
                            </button>
                            <button
                                className="rounded-full px-3 py-1 min-w-[2rem] transition-colors duration-200 text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300"
                                tabIndex={0}
                            >
                                50
                            </button>
                        </div>
                    </div>
                    <div
                        className="relative geist-mono-latin-400 text-2xl leading-relaxed tracking-wide mt-8"
                    >
                        <span
                            className="border-r-2 border-neutral-200 absolute h-8"
                            style={{ top: 0, left: 0 }}
                        />
                        <input
                            type="text"
                            autofocus=""
                            className="absolute inset-0 opacity-0 cursor-default"
                            defaultValue=""
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Type
