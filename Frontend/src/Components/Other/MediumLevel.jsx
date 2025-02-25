import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Other/Animation.css"; // Import the CSS file for animations
import ScoreSound from "../../score.mp3";
import WrongSound from "../../wrong.mp3";
import WinSound from "../../win.mp3";

const MediumLevel = ({ duration = 20 }) => {
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(duration);
  const [gameStarted, setGameStarted] = useState(false);
  const [penalty, setPenalty] = useState(0); // Penalty state
  const [totalClicks, setTotalClicks] = useState(0); // Track total clicks
  const gameContainerRef = useRef(null);
  const navigate = useNavigate();
  const [efficiencyPerSecond, setEfficiencyPerSecond] = useState([]);

  // Preload sound effects
  const scoreSound = new Audio(ScoreSound);
  const wrongSound = new Audio(WrongSound);
  const winSound = new Audio(WinSound);

  // Generate a random dot
  const addDot = () => {
    const container = gameContainerRef.current;
    if (!container) return;
    const containerWidth = container.offsetWidth;
    const randomX = Math.random() * (containerWidth - 40); // Ensures dots stay inside the border
    setDots((prevDots) => [
      ...prevDots,
      { id: Date.now(), x: randomX, y: 0, className: "dot-pulse" }, // Apply pulsating animation
    ]);
  };

  // Timer logic
  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setGameTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameStarted(false);
          // Play win sound effect
          winSound.currentTime = 0; // Reset the sound to the beginning
          winSound.play();

          // Navigate to results page
          navigate("/result", {
            state: {
              score,
              penalty,
              level: "Medium",
              targetEfficiency: parseFloat(((score / totalClicks) * 100).toFixed(2)) || 0, // Ensure efficiency is capped at 100%
              efficiencyPerSecond,
            },
          });
          return 0;
        }

        const newTime = prevTime - 1;
        const elapsed = duration - newTime;
        const currentEfficiency =
          totalClicks > 0 ? ((score / totalClicks) * 100).toFixed(2) : 0; // Calculate efficiency

        setEfficiencyPerSecond((prev) => [
          ...prev,
          { second: elapsed, efficiency: currentEfficiency },
        ]);

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, score, penalty, navigate, duration, efficiencyPerSecond, totalClicks]);

  // Dot spawn logic
  useEffect(() => {
    if (!gameStarted) return;

    const spawnDots = setInterval(() => {
      addDot();
    }, 1000);

    return () => clearInterval(spawnDots);
  }, [gameStarted]);

  // Dot movement logic
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

  // Handle dot click
  const handleDotClick = (e, id) => {
    e.stopPropagation(); // Prevent the global click event from firing
    setDots((prevDots) => prevDots.filter((dot) => dot.id !== id));
    setScore((prev) => prev + 1);
    setTotalClicks((prev) => prev + 1); // Increment total clicks
    scoreSound.currentTime = 0; // Reset the sound to the beginning
    scoreSound.play();
  };

  // Handle container click (penalty logic)
  const handleContainerClick = (e) => {
    if (!gameStarted) return;

    const clickedInsideDot = dots.some((dot) => {
      const dotElement = document.getElementById(dot.id);
      if (!dotElement) return false;
      const dotRect = dotElement.getBoundingClientRect();
      const clickX = e.clientX;
      const clickY = e.clientY;
      return (
        clickX >= dotRect.left &&
        clickX <= dotRect.right &&
        clickY >= dotRect.top &&
        clickY <= dotRect.bottom
      );
    });

    if (!clickedInsideDot) {
      setPenalty((prev) => prev + 1);
      setTotalClicks((prev) => prev + 1); // Increment total clicks
      // Play penalty sound effect
      wrongSound.currentTime = 0; // Reset the sound to the beginning
      wrongSound.play();
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Timer & Score */}
      <div className="fira-500 text-white text-lg mb-4">
        <p>
          Score: {score} | Time Left: {gameTime}s | Penalty: {penalty}
        </p>
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