import React, { useState } from "react";
import '../../Font.css';

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
  const [selectedMode, setSelectedMode] = useState("");

  return (
    <div className="flex p-3 flex-col items-center justify-center h-screen bg-neutral-900 text-neutral-200">
      <h1 className="text-4xl font-bold my-11 fira-500 mb-9">Multiplayer Arena</h1>

      {/* Username Input */}
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-[70%] fira-100 p-3 mb-6 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-neutral-800 text-neutral-200"
      />

      {/* Create Room Section */}
      <div className="w-full max-w-md">
        <h2 className="text-xl fira-400 font-semibold mb-2">Create Room</h2>
        <select
          value={selectedMode}
          onChange={(e) => setSelectedMode(e.target.value)} // Update selected mode
          className="w-full fira-100 p-3 mb-2 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-neutral-800 text-neutral-200"
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          onClick={() => onCreateGame(selectedMode)}
          className="w-full bg-indigo-500 inline-flex justify-center items-center fira-200 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
        >
          <svg viewBox="0 0 24 24" height={24} width={24} fill="none" className="mr-2" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M6 12H18M12 6V18"
                stroke="#ffffff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
            </g>
          </svg>

          Create Room
        </button>
      </div>

      {/* Join Room Section */}
      <div className="w-full max-w-md mt-6">
        <h2 className="text-xl fira-400 font-semibold mb-2">Join Room</h2>
        <input
          type="text"
          placeholder="Enter Game ID"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          className="w-full fira-100 p-3 mb-2 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-neutral-800 text-neutral-200"
        />
        <button
          onClick={onJoinGame}
          className="w-full fira-200 bg-indigo-500 text-white inline-flex justify-center py-3 rounded-lg hover:bg-indigo-600 transition duration-200"
        >
          <svg viewBox="0 0 24 24" height={24} width={24} fill="none" className="mr-3" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g clipPath="url(#clip0_429_11126)">
                {" "}
                <path
                  d="M9 4.00018H19V18.0002C19 19.1048 18.1046 20.0002 17 20.0002H9"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
                <path
                  d="M12 15.0002L15 12.0002M15 12.0002L12 9.00018M15 12.0002H5"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
              </g>{" "}
              <defs>
                {" "}
                <clipPath id="clip0_429_11126">
                  {" "}
                  <rect width={24} height={24} fill="white" />{" "}
                </clipPath>{" "}
              </defs>{" "}
            </g>
          </svg>

          Join Room
        </button>
      </div>

      {/* Players List */}
      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl fira-400 font-semibold mb-2">Players:</h2>
        <ul className="list-disc pl-6">
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>

      {/* Start Game Button (Visible only to the creator) */}
      {isCreator && (
        <button
          onClick={onStartGame}
          className="mt-6 w-[70%] py-2 my-11 bg-green-500 fira-400 text-white rounded-lg hover:bg-green-600 transition duration-200"
        >
          Start Game
        </button>
      )}
    </div>
  );
}