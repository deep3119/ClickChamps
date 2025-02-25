import React from "react";
import MultiplayerLowLevel from "./MultiplayerLowLevel";
import MultiplayerMediumLevel from "./MultiplayerMediumLevel";
import MultiplayerHardLevel from "./MultiplayerHardLevel";

export default function Game({ mode, isCreator, players, username, gameId,setResults, socket }) {
  return (
    <div>
      {mode === "easy" && <MultiplayerLowLevel mode={mode} gameId={gameId} socket={socket} username={username} setResults={setResults} />}
      {mode === "medium" && <MultiplayerMediumLevel mode={mode} gameId={gameId} socket={socket} setResults={setResults} username={username} />}
      {mode === "hard" && <MultiplayerHardLevel mode={mode} gameId={gameId} socket={socket} setResults={setResults} username={username} />}
    </div>
  );
}