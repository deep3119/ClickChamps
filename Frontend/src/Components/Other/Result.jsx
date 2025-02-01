import React from 'react';
import Navbar from '../Common/Navbar';
import '../../Font.css';
import PerformanceChart from './PerformanceChart';
import { useLocation } from 'react-router-dom';

function Result({ isAuthenticated }) {
    const location = useLocation();
    const { targetEfficiency = 0, clickAccuracy = 0, totalHits = 0, totalClicks = 0, clicksPerSecond = [] } = location.state || {};

    const stats = [
        {
            title: 'Target Efficiency',
            value: `${targetEfficiency}%`,
            color: 'text-sky-400',
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
                    className="lucide lucide-activity size-8 mr-2"
                >
                    <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
                </svg>
            ),
        },
        {
            title: 'Click Accuracy',
            value: `${clickAccuracy}%`,
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
                    className="lucide lucide-target size-8 mr-2"
                >
                    <circle cx={12} cy={12} r={10} />
                    <circle cx={12} cy={12} r={6} />
                    <circle cx={12} cy={12} r={2} />
                </svg>
            ),
        },
        {
            title: 'Total Hits',
            value: `${totalHits}`,
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
            title: 'Total Clicks',
            value: `${totalClicks}`,
            color: 'text-yellow-400',
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
                    className="lucide lucide-mouse-pointer size-8 mr-2"
                >
                    <path d="M14 2v10H4v-2h6V0h4v10h6v2h-6V2z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="antialiased min-h-screen bg-gradient-to-b from-neutral-900 to-black text-neutral-400">
            <Navbar isAuthenticated={isAuthenticated} />
            <main className="grid place-content-center mt-20">
                <div className="w-full max-w-5xl mx-auto space-y-8 pb-8 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50"
                            >
                                <div className="flex items-center p-6 gap-x-2">
                                    <div className={stat.color}>{stat.icon}</div>
                                    <div>
                                        <p className="text-sm geist-mono-latin-500 font-medium text-neutral-400 uppercase">
                                            {stat.title}
                                        </p>
                                        <p className="text-2xl font-bold geist-mono-latin-700 text-neutral-200">
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-xl border text-card-foreground bg-neutral-900/50 border-neutral-800 shadow-lg">
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
                        <PerformanceChart clicksPerSecond={clicksPerSecond} />
                    </div>

                    <div className="flex justify-center">
                        <a
                            href="/click"
                            className="inline-flex geist-mono-latin-600 text-white items-center justify-center gap-2 text-sm font-semibold h-10 rounded-md px-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-700 hover:to-red-800 shadow transition-all duration-300"
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
                            Type Again
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Result;