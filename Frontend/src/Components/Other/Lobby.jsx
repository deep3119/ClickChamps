import React, { useState } from "react";

export default function Lobby({
  username,
  setUsername,
  gameId,
  setGameId,
  onCreateGame,
  onJoinGame,
  onStartGame,
  isCreator,
  players,
}) {
  const [mode, setMode] = useState("words");
  const [wordCount, setWordCount] = useState(15);

  const handleCreateGame = () => {
    onCreateGame(mode, mode === "words" ? wordCount : null, null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-16 px-4 sm:px-6 mb-10 lg:px-8">
      {/* Header */}
      <h1 className="text-3xl font-bold geist-mono-latin-700 mb-4 sm:mb-0 text-center">
        Multiplayer Arena
      </h1>

      {/* Username Input */}
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-3 mb-4 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-neutral-800 text-neutral-200"
      />

      {/* Create Room and Join Room Sections */}
      <div className="flex justify-between gap-8">
        {/* Create Room Section */}
        <div className="rounded-xl border shadow bg-neutral-900/50 border-neutral-800 text-neutral-200 w-full max-w-[400px] p-8">
          <div className="font-semibold geist-mono-latin-600 tracking-tight flex items-center space-x-3 text-2xl">
            <h2 className="text-xl font-semibold flex items-center mb-2 text-emerald-400">
              <svg
                className="lucide lucide-plus size-6 mr-2"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Create Room
            </h2>
          </div>
          <select
            value={wordCount}
            onChange={(e) => setWordCount(parseInt(e.target.value))}
            className="w-full p-3 mb-2 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-neutral-800 text-neutral-200"
          >
            <option value={15}>15 Words</option>
            <option value={30}>30 Words</option>
            <option value={45}>45 Words</option>
          </select>
          <button
            onClick={handleCreateGame}
            className="inline-flex geist-mono-latin-400 items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-700 hover:to-emerald-800 font-semibold transition-all duration-300 h-10 rounded-md px-8 w-full"
          >
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
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Create Room
          </button>
        </div>

        {/* Join Room Section */}
        <div className="rounded-xl border shadow bg-neutral-900/50 border-neutral-800 text-neutral-200 w-full max-w-[400px] p-8">
          <h2 className="text-xl font-semibold flex items-center mb-2 text-sky-400">
            <svg
              className="lucide lucide-log-in size-6 mr-2 text-sky-400"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" x2="3" y1="12" y2="12" />
            </svg>
            Join Room
          </h2>
          <input
            type="text"
            placeholder="Enter Game ID"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            className="w-full p-3 mb-2 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-neutral-800 text-neutral-200"
          />
          <button
            onClick={onJoinGame}
            className="inline-flex geist-mono-latin-400 items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-700 hover:to-sky-800 font-semibold transition-all duration-300 h-10 rounded-md px-8 w-full"
          >
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
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" x2="3" y1="12" y2="12" />
            </svg>
            <span>Join Room</span>
          </button>
        </div>
      </div>

      {/* Players List */}
      <div className="mt-6">
        <h2 className="font-bold geist-mono-latin-600 text-emerald-400">Players:</h2>
        <ul className="space-y-1">
          {players.map((player, index) => (
            <li key={index} className="text-neutral-300 geist-mono-latin-400">{player}</li>
          ))}
        </ul>
      </div>

      {/* Start Game Button */}
      {isCreator && (
        <button
          onClick={onStartGame}
          className="mt-4 w-full p-3 bg-indigo-600 geist-mono-latin-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Start Game
        </button>
      )}
    </div>
  );
}