import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import ScoreSound from "../../score.mp3";
import WrongSound from "../../wrong.mp3";
import WinSound from "../../win.mp3";
import "../Other/Animation.css"; // Import the CSS file for animations

const socket = io("http://127.0.0.1:5000");

export default function MultiplayerLowLevel({ mode, gameId, setResults, username }) {
  const [dots, setDots] = useState([]);
  const [clickedDots, setClickedDots] = useState(0);
  const [totalDots, setTotalDots] = useState(0);
  const [gameTime, setGameTime] = useState(15);
  const [isGameOver, setIsGameOver] = useState(false);
  const [penaltyClicks, setPenaltyClicks] = useState(0);
  const [hits, setHits] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(5); // Countdown timer
  const gameContainerRef = useRef(null);

  // Preload sound effects
  const scoreSound = new Audio(ScoreSound);
  const wrongSound = new Audio(WrongSound);
  const winSound = new Audio(WinSound);

  // Generate a random dot
  const generateDot = () => {
    const container = gameContainerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const randomX = Math.floor(Math.random() * (containerWidth - 40));
    const randomY = Math.floor(Math.random() * (containerHeight - 40));
    return {
      x: randomX,
      y: randomY,
      id: Date.now() + Math.random(),
      className: "dot-pop-in dot-pulse", // Add animations here
    };
  };

  // Handle dot click
  const handleDotClick = (event, index) => {
    event.stopPropagation();
    setDots((prev) => prev.filter((_, i) => i !== index));
    setClickedDots((prev) => prev + 1);
    setHits((prev) => prev + 1);

    // Play score sound effect
    scoreSound.currentTime = 0; // Reset the sound to the beginning
    scoreSound.play();
  };

  // Handle global click (penalty logic)
  const handleGlobalClick = (event) => {
    if (!gameStarted) return;

    const clickedInsideDot = dots.some((dot) => {
      const dotLeft = dot.x;
      const dotRight = dot.x + 40;
      const dotTop = dot.y;
      const dotBottom = dot.y + 40;
      return (
        event.clientX >= dotLeft &&
        event.clientX <= dotRight &&
        event.clientY >= dotTop &&
        event.clientY <= dotBottom
      );
    });

    if (!clickedInsideDot) {
      setPenaltyClicks((prev) => prev + 1);

      // Play penalty sound effect
      wrongSound.currentTime = 0; // Reset the sound to the beginning
      wrongSound.play();
    }
  };

  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setGameTime(15);
    setClickedDots(0);
    setTotalDots(0);
    setPenaltyClicks(0);
    setHits(0);
    setIsGameOver(false);
  };

  // Countdown logic
  useEffect(() => {
    if (!gameStarted && countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }

    if (countdown === 0) {
      startGame(); // Automatically start the game when countdown reaches 0
    }
  }, [countdown, gameStarted]);

  // WebSocket event listeners
  useEffect(() => {
    socket.on("game_over", ({ results }) => {
      console.log("Game over! Results:", results);
      setIsGameOver(true); // Update game state
      setResults(results); // Store results for display
    });

    return () => {
      socket.off("game_over");
    };
  }, []);

  useEffect(() => {
    socket.on("game_started_for_all", ({ start_time }) => {
      setGameStarted(true);
      setGameTime(15);
    });

    socket.on("update_leaderboard", (stats) => {
      console.log("Leaderboard updated:", stats);
    });

    socket.on("game_over", ({ results }) => {
      setIsGameOver(true);
      console.log("Game over! Results:", results);
    });

    return () => {
      socket.off("game_started_for_all");
      socket.off("update_leaderboard");
      socket.off("game_over");
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (!gameStarted || gameTime <= 0) return;

    const intervalId = setInterval(() => {
      if (gameTime > 0) {
        const newDot = generateDot();
        setDots((prev) => [...prev, newDot]);
        setTotalDots((prev) => prev + 1);

        setTimeout(() => {
          setDots((prev) => prev.filter((dot) => dot.id !== newDot.id));
        }, 2000);
      }
    }, 1000);

    const timerId = setInterval(() => setGameTime((prev) => prev - 1), 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(timerId);
    };
  }, [gameStarted, gameTime]);

  // Game over logic
  useEffect(() => {
    if (gameTime <= 0) {
      setIsGameOver(true);
      const gameAccuracy = totalDots > 0 ? ((clickedDots / totalDots) * 100).toFixed(2) : 0;

      // Play win sound effect
      winSound.currentTime = 0; // Reset the sound to the beginning
      winSound.play();

      // Submit results to the server
      socket.emit("submit_result", {
        game_id: gameId,
        username: username, // Replace with actual username
        targetEfficiency: parseFloat(gameAccuracy),
        score: hits,
        penalty: penaltyClicks,
      });
    }
  }, [gameTime, totalDots, hits, penaltyClicks]);

  // Attach global click listener
  useEffect(() => {
    if (gameStarted) {
      document.addEventListener("click", handleGlobalClick);
    } else {
      document.removeEventListener("click", handleGlobalClick);
    }

    return () => document.removeEventListener("click", handleGlobalClick);
  }, [gameStarted]);

  return (
    <div className="flex flex-col items-center">
      {/* Countdown Display */}
      {!gameStarted && (
        <div className="text-3xl font-bold text-white mb-4">
          {countdown > 0 ? `Game will start in ${countdown}` : "Start!"}
        </div>
      )}

      {/* Timer & Score */}
      <div className="fira-500 text-white text-lg mb-4">
        <p>Score: {hits} | Time Left: {gameTime}s | Penalty: {penaltyClicks}</p>
      </div>

      {/* Game Container */}
      <div
        style={{ width: "80vw", height: "70vh", backgroundColor: "#222" }}
        ref={gameContainerRef}
        className="relative border-4 border-neutral-400 rounded-lg overflow-hidden"
      >
        {/* Dots */}
        {dots.map((dot, index) => (
          <div
            key={dot.id}
            onClick={(event) => handleDotClick(event, index)}
            className={`absolute bg-red-500 rounded-full cursor-pointer ${dot.className}`}
            style={{
              left: `${dot.x}px`,
              top: `${dot.y}px`,
              width: "40px",
              height: "40px",
            }}
          />
        ))}
      </div>
    </div>
  );
}