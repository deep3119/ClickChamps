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

    // const access_token = Cookies.get('access_token');    
    const access_token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`${apiUrl}/profile/data`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${access_token}` // If you're using Bearer token authentication
            }
        })
            .then(response => {
                setData(response.data); // Store the response data
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(err => {
                setError(err); // Handle any errors
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='__className_ea5f4b antialiased min-h-screen bg-gradient-to-b from-neutral-900 to-black text-neutral-400'>
            <Navbar isAuthenticated={isAuthenticated} />
            <main className="w-full max-w-5xl mx-auto space-y-8 p-6">
                <header className="flex items-center space-x-4">
                    <span className="relative flex shrink-0 overflow-hidden rounded-full size-20 border-4 border-red-400">
                        <span className="flex h-full w-full items-center justify-center rounded-full bg-muted text-xl font-bold text-neutral-200">
                            {data.user.username
                                .split(" ") 
                                .map((word) => word[0]) 
                                .join("") 
                                .toUpperCase()}
                        </span>
                    </span>
                    <h1 className="text-3xl fira-700 font-bold text-neutral-200">
                        {data.user.username}
                    </h1>
                </header>                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                <p className="text-sm fira-500 font-medium text-neutral-400 uppercase">
                                    Average Score
                                </p>
                                <p className="text-2xl fira-400 font-bold text-neutral-200">{Math.round(data.user.stats.average_score)}</p>                            </div>
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
                                <p className="text-sm fira-500 font-medium text-neutral-400 uppercase">
                                    target efficiency
                                </p>
                                <p className="text-2xl fira-700 font-bold text-neutral-200">{Math.round(data.user.stats.overall_efficiency)}%</p>
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
                                <p className="text-sm fira-500 font-medium text-neutral-400 uppercase">
                                    Tests Completed
                                </p>
                                <p className="text-2xl fira-700 font-bold text-neutral-200">{data.user.stats.tests_completed}</p>                            </div>
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
                                <span className="text-neutral-200 fira-600">All-Time Best Scores</span>
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
                                    <div className="grid grid-cols-3 gap-3 mt-4">
                                        <div className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50">
                                            <div className="flex items-center p-6 gap-x-2">
                                                <svg
                                                    viewBox="0 0 128 128"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    aria-hidden="true"
                                                    role="img"
                                                    height={40}
                                                    width={40}
                                                    className="iconify iconify--noto"
                                                    preserveAspectRatio="xMidYMid meet"
                                                    fill="#000000"
                                                >
                                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path
                                                            d="M116.46 3.96h-104c-4.42 0-8 3.58-8 8v104c0 4.42 3.58 8 8 8h104c4.42 0 8-3.58 8-8v-104c0-4.42-3.58-8-8-8z"
                                                            fill="#689f38"
                                                        />
                                                        <path
                                                            d="M110.16 3.96h-98.2a7.555 7.555 0 0 0-7.5 7.5v97.9c-.01 4.14 3.34 7.49 7.48 7.5H110.06c4.14.01 7.49-3.34 7.5-7.48V11.46c.09-4.05-3.13-7.41-7.18-7.5h-.22z"
                                                            fill="#7cb342"
                                                        />
                                                        <path
                                                            d="M40.16 12.86c0-2.3-1.6-3-10.8-2.7c-7.7.3-11.5 1.2-13.8 4s-2.9 8.5-3 15.3c0 4.8 0 9.3 2.5 9.3c3.4 0 3.4-7.9 6.2-12.3c5.4-8.7 18.9-10.6 18.9-13.6z"
                                                            opacity=".3"
                                                            fill="#ffffff"
                                                        />
                                                        <path
                                                            d="M43.26 109.46a8.862 8.862 0 0 1-8.7-6.2l-15.1-45.5c-1.46-4.81 1.26-9.9 6.07-11.36c4.65-1.41 9.59 1.08 11.23 5.66l9.8 29.5l47.1-59.6c3.12-3.95 8.85-4.62 12.8-1.5s4.62 8.85 1.5 12.8l-57.6 72.7a9.086 9.086 0 0 1-7.1 3.5z"
                                                            fill="#fbf9f9"
                                                        />
                                                    </g>
                                                </svg>


                                                <div>

                                                    <p className="text-sm fira-500 font-medium text-neutral-400 uppercase">
                                                        easy Level
                                                    </p>
                                                    <p className="text-2xl fira-700 font-bold text-neutral-200">{data.user.stats.overall.all_time_best.low_level.score}</p>                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50">
                                            <div className="flex items-center p-6 gap-x-2">
                                                <svg viewBox="0 0 48 48" fill="none" height={40} width={40} xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                    <g id="SVGRepo_iconCarrier">
                                                        {" "}
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M24 6C14.0583 6 6 14.0546 6 23.9892C6 28.9256 7.98814 33.396 11.2103 36.6475L9.78969 38.0553C6.21161 34.4446 4 29.4741 4 23.9892C4 12.949 12.9548 4 24 4C35.0452 4 44 12.949 44 23.9892C44 29.6236 41.6663 34.7148 37.9152 38.3471L36.5239 36.9103C39.9022 33.639 42 29.0598 42 23.9892C42 14.0546 33.9417 6 24 6Z"
                                                            fill="#eeff00"
                                                        />{" "}
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M23 11L23 6.00001L25 6L25 11L23 11Z"
                                                            fill="#eeff00"
                                                        />{" "}
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M36.7068 37.0681L33.0595 33.4209L34.4737 32.0067L38.1209 35.6538L36.7068 37.0681Z"
                                                            fill="#eeff00"
                                                        />{" "}
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M14.1214 14.5355L10.5857 11.0001L11.9999 9.58584L15.5356 13.1213L14.1214 14.5355Z"
                                                            fill="#eeff00"
                                                        />{" "}
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M37.6843 22H42.6843V24H37.6843V22Z"
                                                            fill="#eeff00"
                                                        />{" "}
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M5.05267 22H10.0527V24H5.05267V22Z"
                                                            fill="#eeff00"
                                                        />{" "}
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M32.5858 12.9999L36.2332 9.35298L37.6474 10.7673L33.9999 14.4142L32.5858 12.9999Z"
                                                            fill="#eeff00"
                                                        />{" "}
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M14.1968 33.6232L10.5496 37.2705L9.13539 35.8563L12.7825 32.209L14.1968 33.6232Z"
                                                            fill="#eeff00"
                                                        />{" "}
                                                        <path
                                                            d="M20.9521 36.7982C20.7139 36.4854 20.598 36.0963 20.6264 35.7042L22.996 21.8838C23.1402 19.887 25.1653 19.9052 25.3095 21.902L27.6907 35.7042C27.719 36.0963 27.6032 36.4854 27.365 36.7982L25.4425 39.0096C24.5 39.5 24 39.5 22.8745 39.0096L20.9521 36.7982Z"
                                                            fill="#eeff00"
                                                        />{" "}
                                                    </g>
                                                </svg>


                                                <div>
                                                    <p className="text-sm fira-500 font-medium text-neutral-400 uppercase">
                                                        Medium Level
                                                    </p>
                                                    <p className="text-2xl fira-700 font-bold text-neutral-200">{data.user.stats.overall.all_time_best.medium_level.score}</p>                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50">
                                            <div className="flex items-center p-6 gap-x-2">
                                                <svg
                                                    version="1.1"
                                                    id="_x32_"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    width={40}
                                                    height={40}
                                                    viewBox="0 0 512 512"
                                                    xmlSpace="preserve"
                                                    fill="#000000"
                                                    stroke="#000000"
                                                    strokeWidth="0.00512"
                                                >
                                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                    <g
                                                        id="SVGRepo_tracerCarrier"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        stroke="#CCCCCC"
                                                        strokeWidth="5.12"
                                                    />
                                                    <g id="SVGRepo_iconCarrier">
                                                        {" "}
                                                        <style
                                                            type="text/css"
                                                            dangerouslySetInnerHTML={{ __html: "  .st0{fill:#ff0000;}  " }}
                                                        />{" "}
                                                        <g>
                                                            {" "}
                                                            <path
                                                                className="st0"
                                                                d="M186.521,265.189v27.578c0,4.969,4.219,9.016,9.438,9.016h23.016c5.203,0,9.422-4.047,9.422-9.016v-23.094 h7.859v23.094c0,4.969,4.219,9.016,9.422,9.016h23.031c5.203,0,9.438-4.047,9.438-9.016v-23.094h7.844v23.094 c0,4.969,4.219,9.016,9.438,9.016h23.016c5.203,0,9.422-4.047,9.422-9.016v-27.578c23.984-6.969,64.031-23.141,77.656-55.828 c9.891-23.766,6.016-55.047-8.797-115.344C381.88,33.689,338.755,0.001,257.177,0.001S132.489,33.689,117.661,94.017 c-14.828,60.297-18.719,91.578-8.797,115.344C122.474,242.048,162.521,258.205,186.521,265.189z M314.114,108.83 c21.688-3.547,42.844,13.547,47.25,38.156c4.391,24.625-9.625,47.453-31.297,51.016c-21.719,3.531-42.891-13.531-47.281-38.172 C278.396,135.22,292.427,112.392,314.114,108.83z M287.724,221.314h-30.547h-30.516l30.516-36.5L287.724,221.314z M153.005,146.986 c4.438-24.609,25.563-41.703,47.25-38.156c21.703,3.563,35.75,26.391,31.328,51c-4.391,24.641-25.531,41.703-47.234,38.172 C162.63,194.439,148.614,171.611,153.005,146.986z"
                                                            />{" "}
                                                            <path
                                                                className="st0"
                                                                d="M450.208,397.83c-16.391-7.25-35.656-1.156-44.484,13.516c-6.484,8.063-16.563,4.906-21.188,2.875 c-3.438-1.516-39.281-17.36-81.844-36.157c36.578-16.75,66.781-30.578,72.828-33.344c16.703-7.641,28.703-11.813,39.719-2.781 c9.609,12.813,27.703,17.609,43.078,10.578c17.266-7.891,24.563-27.688,16.297-44.203c-4.984-10-14.547-16.469-25.125-18.297 c5.156-9.031,5.891-20.188,0.875-30.203c-8.25-16.516-28.938-23.484-46.203-15.594c-14.953,6.844-22.406,22.594-18.781,37.422 c0.859,11.156-15.75,20.094-26.766,25.141c-7.688,3.516-55.188,25.672-105.969,49.172c-47.75-21.094-91.875-40.578-99.359-43.875 c-16.828-7.438-27.844-13.609-27.609-27.469c4.188-15.25-3.484-31.641-18.969-38.5c-17.359-7.656-37.953-0.406-45.984,16.219 c-4.859,10.063-3.969,21.219,1.328,30.203c-10.563,1.953-20.031,8.531-24.875,18.594c-8.016,16.641-0.438,36.328,16.938,44 c15.047,6.641,32.484,2.078,42.094-10.047c8.453-7.766,26.234-1.234,37.297,3.688c5.781,2.547,34.063,14.813,69.359,30.172 c-42.5,19.531-78.5,35.86-84.156,37.657c-3.359,1.078-6.375,1.203-9.031,0.813c-0.203-0.453-0.375-0.938-0.609-1.375 c-8.234-16.516-28.938-23.5-46.203-15.594c-17.266,7.891-24.563,27.704-16.297,44.219c5,9.969,14.547,16.453,25.125,18.281 c-5.141,9.031-5.875,20.203-0.891,30.203c8.281,16.516,28.953,23.5,46.219,15.609c16.313-7.484,23.703-25.531,17.531-41.406 c-2.344-9.906,6.609-15.344,11.203-17.453c4.109-1.859,54.563-24.969,107.266-49.094c57.578,25.172,115.453,50.719,121.984,54.61 c3,1.781,5.031,3.922,6.406,6.125c-0.25,0.438-0.5,0.859-0.719,1.313c-8.016,16.625-0.453,36.297,16.938,44 c17.375,7.656,37.953,0.406,45.984-16.219c4.844-10.047,3.953-21.219-1.328-30.188c10.563-1.969,20.016-8.563,24.875-18.594 C475.177,425.205,467.599,405.501,450.208,397.83z"
                                                            />{" "}
                                                        </g>{" "}
                                                    </g>
                                                </svg>

                                                <div>
                                                    <p className="text-sm fira-500 font-medium text-neutral-400 uppercase">
                                                        Hard Level
                                                    </p>
                                                    <p className="text-2xl font-bold fira-700 text-neutral-200">{data.user.stats.overall.all_time_best.hard_level.score}</p>                                                </div>
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
                                <span className="text-neutral-200 fira-600">Recent Performance</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="">
                            <Profile_Bar apiUrl={apiUrl} access_token={access_token} />
                        </div>
                    </div>
                </div>
            </main >
        </div >
    )
}

export default Profile
