import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const LowLevel = () => {
  const [dots, setDots] = useState([]);
  const [clickedDots, setClickedDots] = useState(0);
  const [totalDots, setTotalDots] = useState(0);
  const [gameTime, setGameTime] = useState(15);
  const [isGameOver, setIsGameOver] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [penaltyClicks, setPenaltyClicks] = useState(0);
  const [hits, setHits] = useState(0);
  const [targetEfficiencyPerSecond, setTargetEfficiencyPerSecond] = useState([]);

  const gameContainerRef = useRef(null);
  const navigate = useNavigate();

  const generateDot = () => {
    const container = gameContainerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const randomX = Math.floor(Math.random() * (containerWidth - 40));
    const randomY = Math.floor(Math.random() * (containerHeight - 40));
    return { x: randomX, y: randomY, id: Date.now() + Math.random() };
  };

  const handleDotClick = (event, index) => {
    event.stopPropagation(); // Prevent the global click event from firing
    setDots((prev) => prev.filter((_, i) => i !== index));
    setClickedDots((prev) => prev + 1);
    setHits((prev) => prev + 1);
  };

  const handleGlobalClick = (event) => {
    // Only count penalties if the game has started
    if (!gameStarted) return;

    // Check if the click happened inside any dot
    const clickedInsideDot = dots.some(dot => {
      const dotLeft = dot.x;
      const dotRight = dot.x + 40;
      const dotTop = dot.y;
      const dotBottom = dot.y + 40;
      return event.clientX >= dotLeft && event.clientX <= dotRight && event.clientY >= dotTop && event.clientY <= dotBottom;
    });

    // If the click is outside any dot, count the penalty
    if (!clickedInsideDot) {
      setPenaltyClicks((prev) => prev + 1);
    }
};


  useEffect(() => {
    if (gameTime <= 0 || !gameStarted) return;
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

    return () => clearInterval(intervalId);
  }, [gameTime, gameStarted]);

  useEffect(() => {
    if (gameTime <= 0 || !gameStarted) return;
    const timerId = setInterval(() => setGameTime((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [gameTime, gameStarted]);

  useEffect(() => {
    if (gameTime <= 0) {
      setIsGameOver(true);
      const gameAccuracy = totalDots > 0 ? ((clickedDots / totalDots) * 100).toFixed(2) : 0;
      setAccuracy(gameAccuracy);

      setTimeout(() => {
        navigate("/result", {
          state: {
            score: hits,
            penalty: penaltyClicks,
            level: "easy",
            targetEfficiency: parseFloat(gameAccuracy),
            efficiencyPerSecond: targetEfficiencyPerSecond,
          },
        });
      }, 2000);
    }
  }, [gameTime, totalDots, hits, penaltyClicks, navigate, targetEfficiencyPerSecond]);

  useEffect(() => {
    if (!gameStarted || gameTime <= 0) return;
    const elapsed = 15 - gameTime; // Since initial time is 15s
    const currentEfficiency = totalDots > 0 ? (hits / totalDots) * 100 : 0;
    setTargetEfficiencyPerSecond(prev => [...prev, { second: elapsed, efficiency: currentEfficiency }]);
  }, [gameTime, gameStarted, hits, totalDots]);

  const startGame = () => {
    setGameStarted(true);
    setGameTime(15);
    setClickedDots(0);
    setTotalDots(0);
    setPenaltyClicks(-1); // Ensure penaltyClicks are reset when the game starts
    setHits(0);
    setIsGameOver(false);
    setTargetEfficiencyPerSecond([]);
};

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
      {/* Timer & Score */}
      <div className="fira-500 text-white text-lg mb-4">
        <p>Score: {hits} | Time Left: {gameTime}s | Penalty: {penaltyClicks}</p> 
      </div>

      {/* Game Container */}
      <div
        style={{ width: "80vw", height: "70vh",backgroundColor: "#222" }}
        ref={gameContainerRef}
        className="relative border-4 border-neutral-400 rounded-lg overflow-hidden"
      >
        {/* Dots */}
        {dots.map((dot, index) => (
          <div
            key={dot.id}
            onClick={(event) => handleDotClick(event, index)} // Handle click on each dot
            className="absolute bg-red-500 rounded-full cursor-pointer"
            style={{
              left: `${dot.x}px`,
              top: `${dot.y}px`,
              width: "40px",
              height: "40px",
            }}
          />
        ))}
      </div>

      {/* Start Button */}
      {!gameStarted && (
        <div className="mt-4">
          <button
            onClick={startGame}
            className="bg-red-500 text-white px-4 py-2 rounded-md text-xl"
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default LowLevel;