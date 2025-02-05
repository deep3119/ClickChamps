import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MediumLevel = ({ duration = 20 }) => {
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(duration);
  const [gameStarted, setGameStarted] = useState(false);
  const [penalty, setPenalty] = useState(0); // Add a penalty state
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
              level: "Medium",
              targetEfficiency: `${((score / duration) * 100).toFixed(2)}%`,
              efficiencyPerSecond,
            },
          });
          return 0;
        }
        const newTime = prevTime - 1;
        const elapsed = duration - newTime;
        const currentEfficiency = (score / elapsed) * 100 || 0;
        setEfficiencyPerSecond((prev) => [
          ...prev,
          { second: elapsed, efficiency: currentEfficiency },
        ]);
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
          .filter((dot) => dot.y < 400) // Removes dots when they reach the bottom
      );
    }, 200);

    return () => clearInterval(moveInterval);
  }, [gameStarted]);

  const addDot = () => {
    const container = gameContainerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const randomX = Math.random() * (containerWidth - 40); // Ensures dots stay inside the border
    setDots((prevDots) => [...prevDots, { id: Date.now(), x: randomX, y: 0 }]);
  };

  const handleDotClick = (e, id) => {
    // Stop event propagation to prevent triggering the container click handler
    e.stopPropagation();

    // Increase score when a dot is clicked
    setDots((prevDots) => prevDots.filter((dot) => dot.id !== id));
    setScore((prev) => prev + 1);
  };

  const handleContainerClick = (e) => {
    // Check if the user clicked outside of any dots (penalty logic)
    const clickedInsideDot = dots.some((dot) => {
      const dotElement = document.getElementById(dot.id);
      if (!dotElement) return false;

      const dotRect = dotElement.getBoundingClientRect();
      const clickX = e.clientX;
      const clickY = e.clientY;

      // Check if the click is inside the bounds of the dot
      return (
        clickX >= dotRect.left &&
        clickX <= dotRect.right &&
        clickY >= dotRect.top &&
        clickY <= dotRect.bottom
      );
    });

    if (!clickedInsideDot) {
      // If clicked outside any dots, apply a penalty
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
        onClick={handleContainerClick} // Handle click on the container (background)
      >
        {/* Dots */}
        {dots.map((dot) => (
          <div
            key={dot.id}
            id={dot.id} // Assign an ID to each dot to get its bounding box
            onClick={(e) => handleDotClick(e, dot.id)} // Handle click on each dot
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

export default MediumLevel;
