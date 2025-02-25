import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Other/Animation.css"; // Import the CSS file for animations
import ScoreSound from "../../score.mp3"
import WrongSound from "../../wrong.mp3"
import WinSound from "../../win.mp3"

const HardLevel = ({ duration = 25 }) => {
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [gameTime, setGameTime] = useState(duration);
  const [gameStarted, setGameStarted] = useState(false);
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
    const randomX = Math.random() * (containerWidth - 40);
    const isRed = Math.random() < 0.6; // 60% chance red, 40% chance green
    setDots((prevDots) => [
      ...prevDots,
      { id: Date.now(), x: randomX, y: 0, color: isRed ? "red" : "green", className: "dot-pop-in dot-pulse" }, // Add animations
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
          navigate("/result", {
            state: {
              score,
              penalty,
              level: "Hard",
              targetEfficiency: parseFloat(((score / (score + penalty)) * 100 || 0).toFixed(2)),
              efficiencyPerSecond,
            },
          });
          return 0;
        }
        const newTime = prevTime - 1;
        const elapsed = duration - newTime;
        const totalClicks = score + penalty;
        const currentEfficiency = totalClicks > 0 ? (score / totalClicks) * 100 : 0;
        setEfficiencyPerSecond((prev) => [...prev, { second: elapsed, efficiency: currentEfficiency }]);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, score, penalty, navigate, duration, efficiencyPerSecond]);

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
          .filter((dot) => dot.y < 400) // Remove dots when they fall out of bounds
      );
    }, 200);

    return () => clearInterval(moveInterval);
  }, [gameStarted]);

  // Handle dot click
  const handleClick = (id, color) => {
    setDots((prevDots) => prevDots.filter((dot) => dot.id !== id));
    if (color === "red") {
      setScore((prev) => prev + 1); // Increment score for red dots

      // Play score sound effect
      scoreSound.currentTime = 0; // Reset the sound to the beginning
      scoreSound.play();
    } else {
      setPenalty((prev) => prev + 1); // Increment penalty for green dots

      // Play penalty sound effect
      wrongSound.currentTime = 0; // Reset the sound to the beginning
      wrongSound.play();
    }
  };

  // Handle global click (penalty logic)
  const handleGlobalClick = (e) => {
    if (!gameStarted) return;

    // Check if the click happened inside the game container
    const container = gameContainerRef.current;
    if (!container.contains(e.target)) return;

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
      setPenalty((prev) => prev + 1); // Increment penalty for clicks outside any dots

      // Play penalty sound effect
      wrongSound.currentTime = 0; // Reset the sound to the beginning
      wrongSound.play();
    }
  };

  // Attach and detach global click event listener
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
        <p>
          Score: {score} | Time Left: {gameTime}s | Penalty: {penalty}
        </p>
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
            id={dot.id} // Assign an ID to each dot to get its bounding box
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering global click handler
              handleClick(dot.id, dot.color);
            }}
            className={`absolute rounded-full cursor-pointer ${dot.className}`}
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
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering global click handler
            setGameStarted(true);
          }}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md text-xl"
        >
          Start Game
        </button>
      )}
    </div>
  );
};

export default HardLevel;