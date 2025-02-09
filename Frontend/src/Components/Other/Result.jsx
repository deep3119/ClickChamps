import React, { useEffect } from 'react';
import Navbar from '../Common/Navbar';
import '../../Font.css';
import PerformanceChart from './PerformanceChart';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Result({ isAuthenticated, apiUrl }) {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract data from location.state
    const {
        score = 0,
        penalty = 0,
        level = "Unknown",
        targetEfficiency = "0%",
        efficiencyPerSecond = []
    } = location.state || {};

    // Stats for display
    const stats = [
        {
            title: 'Score',
            value: `${score}`,
            color: 'text-green-400',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check-circle size-8 mr-2"
                >
                    <path d="M20 6 9 17l-4-4" />
                </svg>
            ),
        },
        {
            title: 'Penalties',
            value: `${penalty}`,
            color: 'text-red-400',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x-circle size-8 mr-2"
                >
                    <circle cx={12} cy={12} r={10} />
                    <path d="M15 9l-6 6" />
                    <path d="M9 9l6 6" />
                </svg>
            ),
        },
        {
            title: 'Target Efficiency',
            value: `${targetEfficiency}`,
            color: 'text-blue-400',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-gamepad-2 size-8 mr-2"
                >
                    <path d="M6 11V7" />
                    <path d="M9 8H5" />
                    <path d="M15 8h.01" />
                    <path d="M18 11h.01" />
                    <path d="M17 7h.01" />
                    <path d="M6.5 15.5 3 12V7l3-3h12l3 3v5l-3.5 3.5" />
                    <path d="M9 12h6" />
                </svg>
            ),
        },
        {
            title: 'Game Mode',
            value: `${level}`,
            color: 'text-blue-400',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-gamepad-2 size-8 mr-2"
                >
                    <path d="M6 11V7" />
                    <path d="M9 8H5" />
                    <path d="M15 8h.01" />
                    <path d="M18 11h.01" />
                    <path d="M17 7h.01" />
                    <path d="M6.5 15.5 3 12V7l3-3h12l3 3v5l-3.5 3.5" />
                    <path d="M9 12h6" />
                </svg>
            ),
        },
    ];

    const storeGameResult = async () => {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        if (!token) {
            console.error('No token found, cannot store game result.');
            return; // Don't make the API call if no token is present
        }

        try {
            const response = await axios.post(
                `${apiUrl}/game/store_result`,
                {
                    score,
                    penalty,
                    targetEfficiency,
                    level,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                    },
                }
            );

            if (response.status === 200) {
                console.log('Game result stored successfully:', response.data);
            }
        } catch (error) {
            console.error('Error storing game result:', error.response?.data?.message || error.message);
        }
    };

    const endGame = () => {
        storeGameResult();
        navigate('/');
    };

    return (
        <div className="antialiased min-h-screen bg-gradient-to-b from-neutral-900 to-black text-neutral-400">
            <Navbar isAuthenticated={isAuthenticated} />
            <main className="grid place-content-center mt-20">
                <div className="w-full max-w-5xl mx-auto space-y-8 pb-8 px-4 sm:px-6 lg:px-8">
                    {/* Stats Grid */}
                    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8">
                        {/* Left Side - Stats Grid */}
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50"
                            >
                                <div className="flex items-center p-6 gap-x-2">
                                    <div className={stat.color}>{stat.icon}</div>
                                    <div>
                                        <p className="text-sm fira-500 font-medium text-neutral-400 uppercase">
                                            {stat.title}
                                        </p>
                                        <p className="text-2xl font-bold fira-700 text-neutral-200">
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Performance Chart */}
                    <div className="rounded-xl border text-card-foreground bg-neutral-900/50 border-neutral-800 shadow-lg p-6">
                        <div className="flex flex-col space-y-1.5 p-6 pb-2">
                            <div className="font-semibold tracking-tight text-2xl flex items-center space-x-3 text-neutral-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-chart-no-axes-combined size-8 text-yellow-400"
                                >
                                    <path d="M12 16v5" />
                                    <path d="M16 14v7" />
                                    <path d="M20 10v11" />
                                    <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
                                    <path d="M4 18v3" />
                                    <path d="M8 14v7" />
                                </svg>
                                <span>Performance Analysis</span>
                            </div>
                        </div>
                        <PerformanceChart clicksPerSecond={efficiencyPerSecond} />
                    </div>
                    {/* Retry Button */}
                    <div className="flex justify-evenly">
                        <button
                            onClick={() => navigate("/click")}
                            className="inline-flex fira-600 text-white items-center justify-center gap-2 text-sm font-semibold h-10 rounded-md px-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-700 hover:to-red-800 shadow transition-all duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-rotate-ccw"
                            >
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                <path d="M3 3v5h5" />
                            </svg>
                            Try Again
                        </button>
                        <button
                            onClick={endGame}
                            className="inline-flex fira-600 text-white items-center justify-center gap-2 text-sm font-semibold h-10 rounded-md px-8 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-700 hover:to-emerald-800 shadow transition-all duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-stop-circle"
                            >
                                <circle cx={12} cy={12} r={10} />
                                <path d="M9 9h6v6H9z" />
                            </svg>
                            End Game
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default Result;
