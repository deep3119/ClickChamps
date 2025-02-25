import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Lobby from "./Lobby";
import Game from "./Game";
import MultiplayerResult from "./MultiplayerResult"; // Import the result component
import Navbar from "../Common/Navbar";
import "../../Font.css";

const socket = io("http://127.0.0.1:5000");

export default function Multiplayer({ isAuthenticated }) {
  const [username, setUsername] = useState("");
  const [gameId, setGameId] = useState("");
  const [mode, setMode] = useState(""); // Store the selected game mode (easy, medium, hard)
  const [players, setPlayers] = useState([]);
  const [isCreator, setIsCreator] = useState(false);
  const [isInGame, setIsInGame] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false); // Track game over state
  const [results, setResults] = useState(null); // Store game results

  // Handle creating a new game
  const handleCreateGame = (selectedMode) => {
    if (!username || !selectedMode) {
      alert("Please enter a username and select a mode.");
      return;
    }
    socket.emit("create_game", username, selectedMode);
    setMode(selectedMode);
    setIsCreator(true);
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

    socket.on("game_started_for_all", ({ mode }) => {
      setMode(mode);
      setIsInGame(true);
    });

    socket.on("game_over", ({ results }) => {
      setIsGameOver(true); // Set game over state
      setResults(results); // Store the results
    });

    socket.on("error", ({ message }) => {
      alert(message);
    });

    return () => {
      socket.off("game_created");
      socket.off("player_joined");
      socket.off("update_players");
      socket.off("game_started_for_all");
      socket.off("game_over");
      socket.off("error");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black text-neutral-400 antialiased">
      {/* Navbar */}
      <Navbar isAuthenticated={isAuthenticated} />

      {/* Main Content */}
      <div className="rounded-xl border shadow bg-neutral-900/50 border-neutral-800 text-neutral-200 mx-20 mt-8 p-8">
        {!isInGame ? (
          <Lobby
            username={username}
            setUsername={setUsername}
            gameId={gameId}
            setGameId={setGameId}
            onCreateGame={handleCreateGame}
            onJoinGame={handleJoinGame}
            onStartGame={handleStartGame}
            isCreator={isCreator}
            players={players}
            />
          ) : isGameOver ? (
            <MultiplayerResult results={results} />
          ) : (
            <Game
            mode={mode}
            isCreator={isCreator}
            players={players}
            username={username}
            gameId={gameId}
            socket={socket}
            setResults={setResults}
          />
        )}
      </div>
    </div>
  );
}