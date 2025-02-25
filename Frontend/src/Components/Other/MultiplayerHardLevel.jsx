import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import ScoreSound from "../../score.mp3";
import WrongSound from "../../wrong.mp3";
import WinSound from "../../win.mp3";
import "../Other/Animation.css"; // Import the CSS file for animations

const socket = io("http://127.0.0.1:5000");

export default function MultiplayerHardLevel({ mode, gameId, setResults, username }) {
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [gameTime, setGameTime] = useState(25);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const gameContainerRef = useRef(null);

  // Preload sound effects
  const scoreSound = new Audio(ScoreSound);
  const wrongSound = new Audio(WrongSound);
  const winSound = new Audio(WinSound);

  // Generate a random dot at the top of the container
  const generateDot = () => {
    const container = gameContainerRef.current;
    if (!container) return;
    const containerWidth = container.offsetWidth;
    const randomX = Math.random() * (containerWidth - 40);
    const isRed = Math.random() < 0.6;
    return {
      id: Date.now(),
      x: randomX,
      y: 0,
      color: isRed ? "red" : "green",
      className: "dot-pop-in dot-pulse", // Add animations here
    };
  };

  // Handle container click
  const handleContainerClick = (e) => {
    if (!gameStarted || isGameOver) return;

    const target = e.target;
    const isDot = target.dataset.dot === "true";

    if (isDot) {
      const color = target.dataset.color;
      const id = parseInt(target.dataset.id);
      setDots((prev) => prev.filter((dot) => dot.id !== id));

      if (color === "red") {
        setScore((prev) => prev + 1);
        scoreSound.currentTime = 0;
        scoreSound.play();
      } else {
        setPenalty((prev) => prev + 1);
        wrongSound.currentTime = 0; // Reset the sound to the beginning
        wrongSound.play();
      }
    } else {
      setPenalty((prev) => prev + 1);
      wrongSound.currentTime = 0; // Reset the sound to the beginning
      wrongSound.play();
    }
  };

  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setGameTime(25);
    setScore(0);
    setPenalty(0);
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

    if (countdown === 0) startGame();
  }, [countdown, gameStarted]);

  // Dot spawn logic
  useEffect(() => {
    if (!gameStarted || gameTime <= 0) return;

    const spawnInterval = setInterval(() => {
      const newDot = generateDot();
      setDots((prev) => [...prev, newDot]);
    }, 1000);

    return () => clearInterval(spawnInterval);
  }, [gameStarted, gameTime]);

  // Dot movement logic
  useEffect(() => {
    if (!gameStarted) return;

    const moveInterval = setInterval(() => {
      const container = gameContainerRef.current;
      if (!container) return;

      const containerHeight = container.offsetHeight;
      setDots((prevDots) =>
        prevDots
          .map((dot) => ({ ...dot, y: dot.y + 10 }))
          .filter((dot) => dot.y <= containerHeight - 40)
      );
    }, 200);

    return () => clearInterval(moveInterval);
  }, [gameStarted]);

  // Timer logic
  useEffect(() => {
    if (!gameStarted || gameTime <= 0) return;

    const timerId = setInterval(() => setGameTime((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [gameStarted, gameTime]);

  // WebSocket event listeners
  useEffect(() => {
    socket.on("game_started_for_all", ({ start_time }) => {
      setGameStarted(true);
      setGameTime(25);
    });

    socket.on("update_leaderboard", (stats) => {
      console.log("Leaderboard updated:", stats);
    });

    socket.on("game_over", ({ results }) => {
      setIsGameOver(true);
      setResults(results);
    });

    return () => {
      socket.off("game_started_for_all");
      socket.off("update_leaderboard");
      socket.off("game_over");
    };
  }, []);

  // Game over logic
  useEffect(() => {
    if (gameTime <= 0) {
      setIsGameOver(true);
      const totalClicks = score + penalty;
      const targetEfficiency = totalClicks > 0 ? ((score / totalClicks) * 100).toFixed(2) : 0;

      // Play win sound effect
      winSound.currentTime = 0; // Reset the sound to the beginning
      winSound.play();

      socket.emit("submit_result", {
        game_id: gameId,
        username: username,
        targetEfficiency: parseFloat(targetEfficiency),
        score: score,
        penalty: penalty,
      });
    }
  }, [gameTime, score, penalty]);

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
        <p>Score: {score} | Time Left: {gameTime}s | Penalty: {penalty}</p>
      </div>

      {/* Game Container */}
      <div
        ref={gameContainerRef}
        onClick={handleContainerClick}
        className="relative border-4 border-neutral-400 rounded-lg overflow-hidden"
        style={{ width: "80vw", height: "70vh", backgroundColor: "#222" }}
      >
        {/* Dots */}
        {dots.map((dot) => (
          <div
            key={dot.id}
            data-dot="true"
            data-id={dot.id}
            data-color={dot.color}
            className={`absolute rounded-full cursor-pointer ${dot.className}`} // Apply animations here
            style={{
              left: `${dot.x}px`,
              top: `${dot.y}px`,
              width: "40px",
              height: "40px",
              backgroundColor: dot.color,
            }}
          />
        ))}
      </div>
    </div>
  );
}