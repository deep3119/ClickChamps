import React from 'react'

function Footer() {
    return (
        <footer className="border-t border-neutral-800 py-8">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <a className="text-2xl font-bold text-emerald-400 geist-mono-latin-700" href="/">TypeFast</a>
                        <p className="text-sm text-neutral-400 geist-mono-latin-400 mt-2">
                            © 2025 TypeFast. All rights reserved.
                        </p>
                    </div>
                    <nav className="flex space-x-4 geist-mono-latin-400">
                        <a className="text-sm text-neutral-400 hover:text-emerald-400 transition-colors" href="#">
                            Privacy Policy
                        </a>
                        <a className="text-sm text-neutral-400 hover:text-emerald-400 transition-colors" href="#">
                            Terms of Service
                        </a>
                        <a className="text-sm text-neutral-400 hover:text-emerald-400 transition-colors" href="#">
                            Contact Us
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer
