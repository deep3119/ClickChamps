import React from 'react'

function Master() {
    return (
        <section className="container mx-auto px-4 py-20 text-center relative">
            <div className="space-y-8" >
                <h1 className="geist-mono-latin-800 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-200" style={{ transform: "translateY(20px)" }}>
                    Master Your Clicking Skills <br />with
                    <span className="text-red-400 ml-9 geist-mono-latin-800">ClickChamps</span>
                </h1>
                <p className="geist-mono-latin-400 text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed" style={{ transform: "translateY(20px)" }}>
                    Practice Clicking, challenge friends, and track improvements with real-time stats in a sleek, minimalist interface.
                </p>
                <div style={{ transform: "translateY(20px)" }}>
                    <a className="text-white geist-mono-latin-600 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r from-red-500 to-red-600 hover:from-red-700 hover:to-red-800 font-semibold transition-all duration-300 h-10 rounded-md px-8" href="/type">
                        Start Typing Now
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Master
