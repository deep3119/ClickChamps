import React, { useState, useEffect } from 'react';
import Navbar from '../Common/Navbar'
import '../../Font.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import Profile_Bar from './Profile_Bar';

function Profile({ isAuthenticated, apiUrl }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const access_token = Cookies.get('access_token');
    // const access_token = localStorage.getItem('token'); 

    // useEffect(() => {
    //     axios.get(`${apiUrl}/profile/data`, {
    //         withCredentials: true, // Enable sending credentials (cookies, etc.)
    //         headers: {
    //             'Authorization': `Bearer ${access_token}` // If you're using Bearer token authentication
    //         }
    //     })
    //         .then(response => {
    //             console.log(response.data)
    //             setData(response.data); // Store the response data
    //             setLoading(false); // Set loading to false when data is fetched
    //         })
    //         .catch(err => {
    //             setError(err); // Handle any errors
    //             setLoading(false);
    //         });
    // }, []);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='__className_ea5f4b antialiased min-h-screen bg-gradient-to-b from-neutral-900 to-black text-neutral-400'>
            <Navbar isAuthenticated={isAuthenticated} />
            <main className="w-full max-w-5xl mx-auto space-y-8 p-6">
                <header className="flex items-center space-x-4">
                    <span className="relative flex shrink-0 overflow-hidden rounded-full size-20 border-4 border-red-400">
                        <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                            DP
                        </span>
                    </span>
                    <h1 className="text-3xl geist-mono-latin-800 font-bold text-neutral-200">{data.user.username}</h1>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50">
                        <div className="flex items-center p-6 gap-x-2">
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
                                className="lucide lucide-activity size-8 mr-2 text-sky-400"
                            >
                                <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
                            </svg>
                            <div>
                                <p className="text-sm geist-mono-latin-500 font-medium text-neutral-400 uppercase">
                                    Average WPM
                                </p>
                                <p className="text-2xl geist-mono-latin-700 font-bold text-neutral-200">{data.user.stats.overall.average_wpm}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50">
                        <div className="flex items-center p-6 gap-x-2">
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
                                className="lucide lucide-target size-8 mr-2 text-red-400"
                            >
                                <circle cx={12} cy={12} r={10} />
                                <circle cx={12} cy={12} r={6} />
                                <circle cx={12} cy={12} r={2} />
                            </svg>
                            <div>
                                <p className="text-sm geist-mono-latin-500 font-medium text-neutral-400 uppercase">
                                    Accuracy
                                </p>
                                <p className="text-2xl geist-mono-latin-700 font-bold text-neutral-200">{data.user.stats.overall.overall_accuracy}%</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50">
                        <div className="flex items-center p-6 gap-x-2">
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
                                className="lucide lucide-chart-column size-8 mr-2 text-amber-400"
                            >
                                <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                                <path d="M18 17V9" />
                                <path d="M13 17V5" />
                                <path d="M8 17v-3" />
                            </svg>
                            <div>
                                <p className="text-sm geist-mono-latin-500 font-medium text-neutral-400 uppercase">
                                    Tests Completed
                                </p>
                                <p className="text-2xl geist-mono-latin-700 font-bold text-neutral-200">{data.user.stats.overall.tests_completed}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <div className="font-semibold tracking-tight flex items-center space-x-3 text-2xl">
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
                                    className="lucide lucide-trophy size-8 text-yellow-400"
                                >
                                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                    <path d="M4 22h16" />
                                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                                </svg>
                                <span className="text-neutral-200 geist-mono-latin-600">All-Time Best Scores</span>
                            </div>
                        </div>
                        <div className="p-6 pt-0">
                            <div dir="ltr" data-orientation="horizontal" className="w-full">
                                <div
                                    data-state="active"
                                    data-orientation="horizontal"
                                    role="tabpanel"
                                    aria-labelledby="radix-:ra:-trigger-time"
                                    id="radix-:ra:-content-time"
                                    tabIndex={0}
                                    className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    style={{}}
                                >
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50">
                                            <div className="flex items-center p-6 gap-x-2">
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
                                                    className="lucide lucide-hourglass size-8 mr-2 text-sky-400"
                                                >
                                                    <path d="M5 22h14" />
                                                    <path d="M5 2h14" />
                                                    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                                                    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                                                </svg>
                                                <div>
                                                    <p className="text-sm geist-mono-latin-500 font-medium text-neutral-400 uppercase">
                                                        15 Seconds
                                                    </p>
                                                    <p className="text-2xl font-bold geist-mono-latin-700 text-neutral-200">{data.user.stats.overall.all_time_best.time_mode.wpm} WPM</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50">
                                            <div className="flex items-center p-6 gap-x-2">
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
                                                    className="lucide lucide-type size-8 mr-2 text-violet-400"
                                                >
                                                    <polyline points="4 7 4 4 20 4 20 7" />
                                                    <line x1={9} x2={15} y1={20} y2={20} />
                                                    <line x1={12} x2={12} y1={4} y2={20} />
                                                </svg>

                                                <div>
                                                    <p className="text-sm geist-mono-latin-500 font-medium text-neutral-400 uppercase">
                                                        10 WORDS
                                                    </p>
                                                    <p className="text-2xl geist-mono-latin-700 font-bold text-neutral-200">{data.user.stats.overall.all_time_best.words_mode.wpm} WPM</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    data-state="inactive"
                                    data-orientation="horizontal"
                                    role="tabpanel"
                                    aria-labelledby="radix-:ra:-trigger-words"
                                    hidden=""
                                    id="radix-:ra:-content-words"
                                    tabIndex={0}
                                    className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <div className="font-semibold leading-none tracking-tight flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-2xl">
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
                                    className="lucide lucide-chart-no-axes-combined size-8 text-yellow-400"
                                >
                                    <path d="M12 16v5" />
                                    <path d="M16 14v7" />
                                    <path d="M20 10v11" />
                                    <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
                                    <path d="M4 18v3" />
                                    <path d="M8 14v7" />
                                </svg>
                                <span className="text-neutral-200 geist-mono-latin-600">Recent Performance</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="h-[300px]">
                           <Profile_Bar apiUrl={apiUrl} access_token={access_token}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile
