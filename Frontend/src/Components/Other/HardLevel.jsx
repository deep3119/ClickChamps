import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const HardLevel = ({ duration = 25 }) => {
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [gameTime, setGameTime] = useState(duration);
  const [gameStarted, setGameStarted] = useState(false);
  const gameContainerRef = useRef(null);
  const navigate = useNavigate();

// Add a new state variable
const [efficiencyPerSecond, setEfficiencyPerSecond] = useState([]);

// Update the timer useEffect
useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
        setGameTime((prevTime) => {
            if (prevTime <= 1) {
                clearInterval(timer);
                setGameStarted(false);
                navigate("/result", {
                    state: {
                        score,
                        penalty,
                        level: "Hard",
                        targetEfficiency: `${((score / (score + penalty)) * 100 || 0).toFixed(2)}%`,
                        efficiencyPerSecond,
                    },
                });
                return 0;
            }
            const newTime = prevTime - 1;
            const elapsed = duration - newTime;
            const totalClicks = score + penalty;
            const currentEfficiency = totalClicks > 0 ? (score / totalClicks) * 100 : 0;
            setEfficiencyPerSecond(prev => [...prev, { second: elapsed, efficiency: currentEfficiency }]);
            return newTime;
        });
    }, 1000);

    return () => clearInterval(timer);
}, [gameStarted, score, penalty, navigate, duration, efficiencyPerSecond]);
  useEffect(() => {
    if (!gameStarted) return;

    const spawnDots = setInterval(() => {
      addDot();
    }, 1000);

    return () => clearInterval(spawnDots);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;

    const moveInterval = setInterval(() => {
      setDots((prevDots) =>
        prevDots
          .map((dot) => ({ ...dot, y: dot.y + 10 }))
          .filter((dot) => dot.y < 400) // Remove dots when they fall out of bounds
      );
    }, 200);

    return () => clearInterval(moveInterval);
  }, [gameStarted]);

  const addDot = () => {
    const container = gameContainerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const randomX = Math.random() * (containerWidth - 40);
    const isRed = Math.random() < 0.6; // 60% chance red, 40% chance green

    setDots((prevDots) => [
      ...prevDots,
      { id: Date.now(), x: randomX, y: 0, color: isRed ? "red" : "green" },
    ]);
  };

  const handleClick = (id, color) => {
    setDots((prevDots) => prevDots.filter((dot) => dot.id !== id));

    if (color === "red") {
      setScore((prev) => prev + 1);
    } else {
      setPenalty((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Timer & Score */}
      <div className="geist-mono-latin-500 text-white text-lg mb-4">
        <p>Time Left: {gameTime}s</p>
        <p>Score: {score}</p>
        <p>Penalty: {penalty}</p>
      </div>

      {/* Game Container */}
      <div
        ref={gameContainerRef}
        className="relative border-4 border-neutral-400 rounded-lg overflow-hidden"
        style={{ width: "80vw", height: "70vh", backgroundColor: "#222" }}
      >
        {/* Dots */}
        {dots.map((dot) => (
          <div
            key={dot.id}
            onClick={() => handleClick(dot.id, dot.color)}
            className="absolute rounded-full cursor-pointer"
            style={{
              left: `${dot.x}px`,
              top: `${dot.y}px`,
              width: "40px",
              height: "40px",
              backgroundColor: dot.color === "red" ? "red" : "green",
            }}
          />
        ))}
      </div>

      {/* Start Button */}
      {!gameStarted && (
        <button
          onClick={() => setGameStarted(true)}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md text-xl"
        >
          Start Game
        </button>
      )}
    </div>
  );
};

export default HardLevel;
