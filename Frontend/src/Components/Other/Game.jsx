import React, { useState, useEffect, useRef } from "react";

export default function Game({ sentence, isCreator, stats, results, username, gameId, socket }) {
  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (sentence) {
      setStartTime(Date.now());
    }
  }, [sentence]);

  const calculateStats = () => {
    const elapsedTime = (Date.now() - startTime) / 1000 / 60; // in minutes
    const wordsTyped = typedText.trim().split(/\s+/).length;
    const wpm = Math.round(wordsTyped / elapsedTime);
    const correctChars = typedText.split("").filter((char, i) => char === sentence[i]).length;
    const accuracy = ((correctChars / sentence.length) * 100).toFixed(2);
    setWpm(wpm);
    setAccuracy(accuracy);

    // Emit stats to the backend
    if (username && gameId && socket) {
      socket.emit("update_stats", { game_id: gameId, username, wpm, accuracy });
    }
  };

  const handleInput = (e) => {
    setTypedText(e.target.value);
    calculateStats();

    // Check if the user has completed typing
    if (e.target.value.trim() === sentence.trim()) {
      handleSubmitResult();
    }
  };

  const handleSubmitResult = () => {
    if (username && gameId && socket) {
      socket.emit("submit_result", { game_id: gameId, username, wpm, accuracy });
    }
  };

  useEffect(() => { 
    const noSelectElements =
      document.querySelectorAll(".no-select");
    noSelectElements.forEach((element) => {
      element.style.webkitUserSelect = "none";
      element.style.mozUserSelect = "none";
      element.style.msUserSelect = "none";
      element.style.userSelect = "none";
    });
  }, []);

  return (
    <>
      <div className="relative text-white geist-mono-latin-400 text-2xl leading-relaxed tracking-wide mt-8">
        <div className="whitespace-pre-wrap text-neutral-400 no-select ">{sentence}</div>
        <textarea
          ref={inputRef}
          value={typedText}
          onChange={handleInput}
          className="bg-transparent outline-none w-full absolute top-0 pb-10 inset-0"
          style={{ resize: "none", overflow: "hidden" }}
        />
      </div>

      <div className="mt-8 text-center geist-mono-latin-400 text-xl">
        WPM: {wpm} | Accuracy: {accuracy}%
      </div>

      {/* Real-Time Competitor Progress */}
      <div className="flex justify-between mt-8">

        <div className="mt-4 geist-mono-latin-400">
          <h2 className="font-bold">Competitors' Progress:</h2>
          <ul>
            {Object.entries(stats).map(([player, { wpm, accuracy }], index) => (
              <li key={index}>
                {player}: WPM - {wpm}, Accuracy - {accuracy}%
              </li>
            ))}
          </ul>
        </div>

        {/* Final Results */}
        {Object.keys(results).length > 0 && (
          <div className="mt-4 geist-mono-latin-400">
            <h2 className="font-bold">Game Over!</h2>
            <ul>
              {Object.entries(results).map(([player, { wpm, accuracy }], index) => (
                <li key={index}>
                  {player}: WPM - {wpm}, Accuracy - {accuracy}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}