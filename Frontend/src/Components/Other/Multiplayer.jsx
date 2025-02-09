import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Navbar from '../Common/Navbar'
import '../../Font.css'

const socket = io("http://127.0.0.1:5000");

function Multiplayer({isAuthenticated}) {
    const [username, setUsername] = useState("");
    const [gameId, setGameId] = useState("");
    const [sentence, setSentence] = useState("");
    const [players, setPlayers] = useState([]);
    const [results, setResults] = useState({});
    const [stats, setStats] = useState({});
    const [isCreator, setIsCreator] = useState(false);
    const [isInGame, setIsInGame] = useState(false);

    const handleCreateGame = (mode, wordCount, timeDuration) => {
        if (!username) {
          alert("Please enter a username.");
          return;
        }
        socket.emit("create_game", username, mode);
      };
    
      // Handle joining an existing game
      const handleJoinGame = () => {
        if (!username || !gameId) {
          alert("Please enter both username and game ID.");
          return;
        }
        socket.emit("join_game", { game_id: gameId, username });
      };
    
      // Handle starting the game
      const handleStartGame = () => {
        if (isCreator) {
          socket.emit("start_game_for_all", { game_id: gameId });
        }
      };
    
      // WebSocket event listeners
      useEffect(() => {
        socket.on("game_created", ({ game_id, is_creator }) => {
          setGameId(game_id);
          setIsCreator(is_creator);
        });
    
        socket.on("player_joined", ({ username }) => {
          setPlayers((prevPlayers) => [...prevPlayers, username]);
        });
    
        socket.on("update_players", ({ players }) => {
          setPlayers(players.map((p) => p.username));
        });
    
        socket.on("game_started_for_all", ({ sentence }) => {
          setSentence(sentence);
          setIsInGame(true);
        });
    
        socket.on("update_leaderboard", (updatedStats) => {
          setStats(updatedStats); // Update real-time stats
        });
    
        socket.on("game_over", ({ results }) => {
          setResults(results);
          setIsInGame(false);
        });
    
        socket.on("error", ({ message }) => {
          alert(message);
        });
    
        return () => {
          socket.off("game_created");
          socket.off("player_joined");
          socket.off("update_players");
          socket.off("game_started_for_all");
          socket.off("update_leaderboard");
          socket.off("game_over");
          socket.off("error");
        };
      }, []);

    return (
        <div className='__className_ea5f4b antialiased min-h-screen bg-gradient-to-b from-neutral-900 to-black text-neutral-400'>
            <Navbar isAuthenticated={isAuthenticated} />
            <div
                className="min-h-screen text-neutral-200"
                style={{
                    opacity: "1",
                }}>
                <div className="w-full max-w-5xl mx-auto space-y-8 pb-16 px-4 sm:px-6 lg:px-8">
                    <div
                        className="flex flex-col sm:flex-row justify-between items-center pt-8"
                        style={{
                            opacity: "1",
                            transform: "none",
                        }}>
                        <h1 className="text-3xl font-bold fira-700 mb-4 sm:mb-0">Multiplayer Arena</h1>
                    </div>
                    <div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        style={{
                            opacity: "1",
                            transform: "none",
                        }}>
                        <div className="rounded-xl border shadow bg-neutral-900/50 border-neutral-800 text-neutral-200">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <div className="font-semibold fira-600 tracking-tight flex items-center space-x-3 text-2xl">
                                    <svg
                                        className="lucide lucide-plus size-8 text-emerald-400"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12h14" />
                                        <path d="M12 5v14" />
                                    </svg>
                                    <span>Create Room</span>
                                </div>
                            </div>
                            <div className="p-6 pt-0">
                                <form className="space-y-4 fira-400">
                                    <div className="space-y-2 ">
                                        <input
                                            aria-describedby=":rl:-form-item-description"
                                            aria-invalid="false"
                                            className="flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
                                            id=":rl:-form-item"
                                            name="name"
                                            placeholder="Room Name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <button
                                                aria-autocomplete="none"
                                                aria-controls="radix-:rn:"
                                                aria-describedby=":rm:-form-item-description"
                                                aria-expanded="false"
                                                aria-invalid="false"
                                                className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-neutral-800 border-neutral-700 text-neutral-200"
                                                data-state="closed"
                                                dir="ltr"
                                                id=":rm:-form-item"
                                                role="combobox"
                                                type="button">
                                                <span
                                                    style={{
                                                        pointerEvents: "none",
                                                    }}>
                                                    Words
                                                </span>
                                                <svg
                                                    aria-hidden="true"
                                                    className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                                                    fill="none"
                                                    height="24"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m6 9 6 6 6-6" />
                                                </svg>
                                            </button>
                                            <select
                                                aria-hidden="true"
                                                style={{
                                                    border: "0px",
                                                    clip: "rect(0px, 0px, 0px, 0px)",
                                                    height: "1px",
                                                    margin: "-1px",
                                                    overflow: "hidden",
                                                    overflowWrap: "normal",
                                                    padding: "0px",
                                                    position: "absolute",
                                                    whiteSpace: "nowrap",
                                                    width: "1px",
                                                }}
                                                tabIndex="-1">
                                                <option selected value="words">
                                                    Words
                                                </option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <button
                                                aria-autocomplete="none"
                                                aria-controls="radix-:rp:"
                                                aria-describedby=":ro:-form-item-description"
                                                aria-expanded="false"
                                                aria-invalid="false"
                                                className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-neutral-800 border-neutral-700 text-neutral-200"
                                                data-placeholder=""
                                                data-state="closed"
                                                dir="ltr"
                                                id=":ro:-form-item"
                                                role="combobox"
                                                type="button">
                                                <span
                                                    style={{
                                                        pointerEvents: "none",
                                                    }}>
                                                    Mode Option
                                                </span>
                                                <svg
                                                    aria-hidden="true"
                                                    className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                                                    fill="none"
                                                    height="24"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m6 9 6 6 6-6" />
                                                </svg>
                                            </button>
                                            <select
                                                aria-hidden="true"
                                                style={{
                                                    border: "0px",
                                                    clip: "rect(0px, 0px, 0px, 0px)",
                                                    height: "1px",
                                                    margin: "-1px",
                                                    overflow: "hidden",
                                                    overflowWrap: "normal",
                                                    padding: "0px",
                                                    position: "absolute",
                                                    whiteSpace: "nowrap",
                                                    width: "1px",
                                                }}
                                                tabIndex="-1">
                                                <option value="10">10 words</option>
                                                <option value="25">25 words</option>
                                                <option value="50">50 words</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-700 hover:to-emerald-800 font-semibold transition-all duration-300 h-10 rounded-md px-8 w-full"
                                        type="submit">
                                        <svg
                                            className="lucide lucide-plus"
                                            fill="none"
                                            height="24"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12h14" />
                                            <path d="M12 5v14" />
                                        </svg>
                                        Create Room
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="rounded-xl border shadow bg-neutral-900/50 border-neutral-800 text-neutral-200">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <div className="font-semibold fira-600 tracking-tight flex items-center space-x-3 text-2xl">
                                    <svg
                                        className="lucide lucide-log-in size-8 text-sky-400"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                        <polyline points="10 17 15 12 10 7" />
                                        <line x1="15" x2="3" y1="12" y2="12" />
                                    </svg>
                                    <span>Join Room</span>
                                </div>
                            </div>
                            <div className="p-6 pt-0">
                                <form className="space-y-4 fira-400">
                                    <div className="space-y-2">
                                        <input
                                            aria-describedby=":rq:-form-item-description"
                                            aria-invalid="false"
                                            className="flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
                                            id=":rq:-form-item"
                                            name="code"
                                            placeholder="Room Code"
                                        />
                                    </div>
                                    <button
                                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-700 hover:to-sky-800 font-semibold transition-all duration-300 h-10 rounded-md px-8 w-full"
                                        type="submit">
                                        <svg
                                            className="lucide lucide-log-in"
                                            fill="none"
                                            height="24"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                            <polyline points="10 17 15 12 10 7" />
                                            <line x1="15" x2="3" y1="12" y2="12" />
                                        </svg>
                                        <span>Join Room</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            opacity: "1",
                            transform: "none",
                        }}>
                        <div className="rounded-xl border shadow bg-neutral-900/50 border-neutral-800 text-neutral-200">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <div className="font-semibold fira-600 tracking-tight flex items-center space-x-3 text-2xl">
                                    <svg
                                        className="lucide lucide-hash size-8 text-violet-400"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <line x1="4" x2="20" y1="9" y2="9" />
                                        <line x1="4" x2="20" y1="15" y2="15" />
                                        <line x1="10" x2="8" y1="3" y2="21" />
                                        <line x1="16" x2="14" y1="3" y2="21" />
                                    </svg>
                                    <span>Public Room</span>
                                </div>
                            </div>
                            <div className="p-6 pt-0">
                                <div
                                    className="relative overflow-hidden h-[400px] pr-4"
                                    dir="ltr"
                                    style={{
                                        "--radix-scroll-area-corner-height": "0px",
                                        "--radix-scroll-area-corner-width": "0px",
                                        position: "relative",
                                    }}>
                                    <style
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}",
                                        }}
                                    />
                                    <div
                                        className="h-full w-full rounded-[inherit]"
                                        data-radix-scroll-area-viewport=""
                                        style={{
                                            overflow: "hidden scroll",
                                        }}>
                                        <div
                                            style={{
                                                display: "table",
                                                minWidth: "100%",
                                            }}>
                                            <div className="space-y-4 fira-400">
                                                <div className="rounded-xl border text-card-foreground shadow bg-neutral-800/50 border-neutral-700 hover:bg-neutral-700 transition-all duration-300">
                                                    <div className="flex items-center justify-between p-4">
                                                        <div className="flex items-center space-x-4 text-lg ">
                                                            <h3 className=" text-neutral-200">rexo room</h3>
                                                            <p className="text-emerald-400 flex items-center">
                                                                <svg
                                                                    className="lucide lucide-type size-5 mr-2"
                                                                    fill="none"
                                                                    height="24"
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    viewBox="0 0 24 24"
                                                                    width="24"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <polyline points="4 7 4 4 20 4 20 7" />
                                                                    <line x1="9" x2="15" y1="20" y2="20" />
                                                                    <line x1="12" x2="12" y1="4" y2="20" />
                                                                </svg>
                                                                50 words
                                                            </p>
                                                        </div>
                                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r font-semibold transition-all duration-300 h-10 rounded-md px-8 from-violet-500 to-violet-600 hover:from-violet-700 hover:to-violet-800">
                                                            Join
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="rounded-xl border text-card-foreground shadow bg-neutral-800/50 border-neutral-700 hover:bg-neutral-700 transition-all duration-300">
                                                    <div className="flex items-center justify-between p-4">
                                                        <div className="flex items-center space-x-4 text-lg ">
                                                            <h3 className=" text-neutral-200">fasty</h3>
                                                            <p className="text-emerald-400 flex items-center">
                                                                <svg
                                                                    className="lucide lucide-type size-5 mr-2"
                                                                    fill="none"
                                                                    height="24"
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    viewBox="0 0 24 24"
                                                                    width="24"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <polyline points="4 7 4 4 20 4 20 7" />
                                                                    <line x1="9" x2="15" y1="20" y2="20" />
                                                                    <line x1="12" x2="12" y1="4" y2="20" />
                                                                </svg>
                                                                50 words
                                                            </p>
                                                        </div>
                                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r font-semibold transition-all duration-300 h-10 rounded-md px-8 from-violet-500 to-violet-600 hover:from-violet-700 hover:to-violet-800">
                                                            Join
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="rounded-xl border text-card-foreground shadow bg-neutral-800/50 border-neutral-700 hover:bg-neutral-700 transition-all duration-300">
                                                    <div className="flex items-center justify-between p-4">
                                                        <div className="flex items-center space-x-4 text-lg ">
                                                            <h3 className=" text-neutral-200">Sammer</h3>
                                                            <p className="text-emerald-400 flex items-center">
                                                                <svg
                                                                    className="lucide lucide-type size-5 mr-2"
                                                                    fill="none"
                                                                    height="24"
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    viewBox="0 0 24 24"
                                                                    width="24"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <polyline points="4 7 4 4 20 4 20 7" />
                                                                    <line x1="9" x2="15" y1="20" y2="20" />
                                                                    <line x1="12" x2="12" y1="4" y2="20" />
                                                                </svg>
                                                                50 words
                                                            </p>
                                                        </div>
                                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r font-semibold transition-all duration-300 h-10 rounded-md px-8 from-violet-500 to-violet-600 hover:from-violet-700 hover:to-violet-800">
                                                            Join
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="rounded-xl border text-card-foreground shadow bg-neutral-800/50 border-neutral-700 hover:bg-neutral-700 transition-all duration-300">
                                                    <div className="flex items-center justify-between p-4">
                                                        <div className="flex items-center space-x-4 text-lg ">
                                                            <h3 className=" text-neutral-200">
                                                                Typing ki patshala
                                                            </h3>
                                                            <p className="text-emerald-400 flex items-center">
                                                                <svg
                                                                    className="lucide lucide-type size-5 mr-2"
                                                                    fill="none"
                                                                    height="24"
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    viewBox="0 0 24 24"
                                                                    width="24"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <polyline points="4 7 4 4 20 4 20 7" />
                                                                    <line x1="9" x2="15" y1="20" y2="20" />
                                                                    <line x1="12" x2="12" y1="4" y2="20" />
                                                                </svg>
                                                                50 words
                                                            </p>
                                                        </div>
                                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r font-semibold transition-all duration-300 h-10 rounded-md px-8 from-violet-500 to-violet-600 hover:from-violet-700 hover:to-violet-800">
                                                            Join
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="rounded-xl border text-card-foreground shadow bg-neutral-800/50 border-neutral-700 hover:bg-neutral-700 transition-all duration-300">
                                                    <div className="flex items-center justify-between p-4">
                                                        <div className="flex items-center space-x-4 text-lg ">
                                                            <h3 className=" text-neutral-200">asdf</h3>
                                                            <p className="text-emerald-400 flex items-center">
                                                                <svg
                                                                    className="lucide lucide-type size-5 mr-2"
                                                                    fill="none"
                                                                    height="24"
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    viewBox="0 0 24 24"
                                                                    width="24"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <polyline points="4 7 4 4 20 4 20 7" />
                                                                    <line x1="9" x2="15" y1="20" y2="20" />
                                                                    <line x1="12" x2="12" y1="4" y2="20" />
                                                                </svg>
                                                                10 words
                                                            </p>
                                                        </div>
                                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r font-semibold transition-all duration-300 h-10 rounded-md px-8 from-violet-500 to-violet-600 hover:from-violet-700 hover:to-violet-800">
                                                            Join
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="rounded-xl border text-card-foreground shadow bg-neutral-800/50 border-neutral-700 hover:bg-neutral-700 transition-all duration-300">
                                                    <div className="flex items-center justify-between p-4">
                                                        <div className="flex items-center space-x-4 text-lg ">
                                                            <h3 className=" text-neutral-200">mmppp</h3>
                                                            <p className="text-emerald-400 flex items-center">
                                                                <svg
                                                                    className="lucide lucide-type size-5 mr-2"
                                                                    fill="none"
                                                                    height="24"
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    viewBox="0 0 24 24"
                                                                    width="24"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <polyline points="4 7 4 4 20 4 20 7" />
                                                                    <line x1="9" x2="15" y1="20" y2="20" />
                                                                    <line x1="12" x2="12" y1="4" y2="20" />
                                                                </svg>
                                                                10 words
                                                            </p>
                                                        </div>
                                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r font-semibold transition-all duration-300 h-10 rounded-md px-8 from-violet-500 to-violet-600 hover:from-violet-700 hover:to-violet-800">
                                                            Join
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="rounded-xl border text-card-foreground shadow bg-neutral-800/50 border-neutral-700 hover:bg-neutral-700 transition-all duration-300">
                                                    <div className="flex items-center justify-between p-4">
                                                        <div className="flex items-center space-x-4 text-lg ">
                                                            <h3 className=" text-neutral-200">Jri</h3>
                                                            <p className="text-emerald-400 flex items-center">
                                                                <svg
                                                                    className="lucide lucide-type size-5 mr-2"
                                                                    fill="none"
                                                                    height="24"
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    viewBox="0 0 24 24"
                                                                    width="24"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <polyline points="4 7 4 4 20 4 20 7" />
                                                                    <line x1="9" x2="15" y1="20" y2="20" />
                                                                    <line x1="12" x2="12" y1="4" y2="20" />
                                                                </svg>
                                                                25 words
                                                            </p>
                                                        </div>
                                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r font-semibold transition-all duration-300 h-10 rounded-md px-8 from-violet-500 to-violet-600 hover:from-violet-700 hover:to-violet-800">
                                                            Join
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="rounded-xl border text-card-foreground shadow bg-neutral-800/50 border-neutral-700 hover:bg-neutral-700 transition-all duration-300">
                                                    <div className="flex items-center justify-between p-4">
                                                        <div className="flex items-center space-x-4 text-lg ">
                                                            <h3 className=" text-neutral-200">john doe</h3>
                                                            <p className="text-emerald-400 flex items-center">
                                                                <svg
                                                                    className="lucide lucide-type size-5 mr-2"
                                                                    fill="none"
                                                                    height="24"
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    viewBox="0 0 24 24"
                                                                    width="24"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <polyline points="4 7 4 4 20 4 20 7" />
                                                                    <line x1="9" x2="15" y1="20" y2="20" />
                                                                    <line x1="12" x2="12" y1="4" y2="20" />
                                                                </svg>
                                                                10 words
                                                            </p>
                                                        </div>
                                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r font-semibold transition-all duration-300 h-10 rounded-md px-8 from-violet-500 to-violet-600 hover:from-violet-700 hover:to-violet-800">
                                                            Join
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Multiplayer
