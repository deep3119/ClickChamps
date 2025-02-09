import React, { useState } from "react";
import Navbar from "../Common/Navbar";
import "../../Font.css";
import LowLevel from "./LowLevel";
import MediumLevel from "./MediumLevel";
import HardLevel from "./HardLevel";

const ClickGame = ({ isAuthenticated }) => {
    const [selectedLevel, setSelectedLevel] = useState('low'); // Default to Low level

    const setSignInMethodHandler = (level) => {
        setSelectedLevel(level);
    }

    return (
        <div className="antialiased min-h-screen bg-gradient-to-b from-neutral-900 to-black text-neutral-400">
            <Navbar isAuthenticated={isAuthenticated} />
            <div className="p-6 pt-0">
                <div
                    role="tablist"
                    aria-orientation="horizontal"
                    className="h-9 items-center justify-center rounded-lg p-1 grid w-full grid-cols-3 bg-neutral-800 text-neutral-300"
                    tabIndex={-1}
                    data-orientation="horizontal"
                    style={{ outline: "none" }}
                >
                    <button
                        type="button"
                        role="tab"
                        aria-selected={selectedLevel === 'low'}
                        onClick={() => setSignInMethodHandler('low')}
                        className={`py-1 fira-500 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 text-sm font-medium ring-offset-neutral-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 ${selectedLevel === 'low' ? 'bg-neutral-700 text-neutral-50' : ''}`}
                    >
                        Easy
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={selectedLevel === 'medium'}
                        onClick={() => setSignInMethodHandler('medium')}
                        className={`py-1 fira-500 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 text-sm font-medium ring-offset-neutral-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 ${selectedLevel === 'medium' ? 'bg-neutral-700 text-neutral-50' : ''}`}
                    >
                        Medium
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={selectedLevel === 'hard'}
                        onClick={() => setSignInMethodHandler('hard')}
                        className={`py-1 fira-500 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 text-sm font-medium ring-offset-neutral-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 ${selectedLevel === 'hard' ? 'bg-neutral-700 text-neutral-50' : ''}`}
                    >
                        Hard
                    </button>
                </div>
            </div>

            {/* Render corresponding level based on selectedLevel state */}
            {selectedLevel === 'low' && <LowLevel />}
            {selectedLevel === 'medium' && <MediumLevel />}
            {selectedLevel === 'hard' && <HardLevel />}
        </div>
    );
};

export default ClickGame;
