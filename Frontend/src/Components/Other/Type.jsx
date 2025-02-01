import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Common/Navbar";
import "../../Font.css";

const ClickGame = ({ isAuthenticated }) => {
    const [dots, setDots] = useState([]);
    const [clickedDots, setClickedDots] = useState(0);
    const [totalDots, setTotalDots] = useState(0);
    const [gameTime, setGameTime] = useState(15);
    const [isGameOver, setIsGameOver] = useState(false);
    const [accuracy, setAccuracy] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [penaltyClicks, setPenaltyClicks] = useState(0); // Track penalty clicks
    const [cps, setCps] = useState(0); // Store calculated CPS

    const gameContainerRef = useRef(null);
    const navigate = useNavigate();

    const generateDot = () => {
        const container = gameContainerRef.current;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        // Random X and Y positions within the container bounds
        const randomX = Math.floor(Math.random() * (containerWidth - 40));
        const randomY = Math.floor(Math.random() * (containerHeight - 40));

        return { x: randomX, y: randomY, id: Date.now() + Math.random() };
    };

    // Handle the dot click event
    const handleDotClick = (index) => {
        setDots((prev) => prev.filter((_, i) => i !== index));
        setClickedDots((prev) => prev + 1);
    };

    // Penalize clicks outside the red dots
    const handleGlobalClick = (event) => {
        const clickedInsideDot = dots.some(
            (dot) =>
                event.clientX >= dot.x &&
                event.clientX <= dot.x + 40 &&
                event.clientY >= dot.y &&
                event.clientY <= dot.y + 40
        );

        if (!clickedInsideDot) {
            setPenaltyClicks((prev) => prev + 1);
        }
    };

    // Generate dot and add it to the screen with timeout to remove after 2 seconds
    useEffect(() => {
        if (gameTime <= 0 || !gameStarted) return; // Don't run if game has not started

        const intervalId = setInterval(() => {
            if (gameTime > 0) {
                const newDot = generateDot();
                setDots((prev) => [...prev, newDot]);
                setTotalDots((prev) => prev + 1);

                // Remove the dot after 2 seconds (1 second for growth + 1 second hold time)
                setTimeout(() => {
                    setDots((prev) => prev.filter((dot) => dot.id !== newDot.id));
                }, 2000);
            }
        }, 1000); // Add a new dot every second

        return () => clearInterval(intervalId);
    }, [gameTime, gameStarted]);

    // Timer for game time countdown
    useEffect(() => {
        if (gameTime <= 0) return;
        if (!gameStarted) return; // Only count down when the game has started

        const timerId = setInterval(() => {
            setGameTime((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [gameTime, gameStarted]);

    // Check if the game is over and navigate to the result page if it is
    useEffect(() => {
        if (gameTime <= 0) {
            setIsGameOver(true);

            // Calculate Accuracy
            const gameAccuracy = ((clickedDots / totalDots) * 100).toFixed(2);
            setAccuracy(gameAccuracy);

            // Calculate CPS: Use elapsed time (15 - gameTime)
            const elapsedTime = 15 - gameTime;  // This is the total time spent playing (in seconds)

            // Penalize CPS based on invalid clicks (penaltyClicks)
            const rawCPS = elapsedTime > 0
                ? (clickedDots - penaltyClicks) / elapsedTime
                : 0;  // Calculate raw CPS

            // Normalize CPS to range 1 to 100
            const normalizedCPS = Math.min(100, Math.max(1, Math.round(rawCPS * 100))); // Scale to range 1-100

            // Update CPS state
            setCps(normalizedCPS);

            // After a slight delay, navigate to the result page
            setTimeout(() => {
                navigate("/result", {
                    state: {
                        cps: normalizedCPS,  // Pass normalized CPS
                        accuracy: gameAccuracy,
                        timeElapsed: elapsedTime,  // Pass elapsed time
                    },
                });
            }, 2000);
        }
    }, [gameTime, clickedDots, totalDots, penaltyClicks, navigate]);

    // Start the game when the button is clicked
    const startGame = () => {
        setGameStarted(true);
        setGameTime(15); // Reset game time
        setClickedDots(0); // Reset clicked dots
        setTotalDots(0); // Reset total dots
        setPenaltyClicks(0); // Reset penalty clicks
        setIsGameOver(false); // Reset game over state
    };

    useEffect(() => {
        // Add the global click listener when the game starts
        if (gameStarted) {
            document.addEventListener("click", handleGlobalClick);
        } else {
            document.removeEventListener("click", handleGlobalClick);
        }

        return () => {
            document.removeEventListener("click", handleGlobalClick);
        };
    }, [gameStarted]);

    return (
        <div className="antialiased min-h-screen bg-gradient-to-b from-neutral-900 to-black text-neutral-400">
            <Navbar isAuthenticated={isAuthenticated} />
            <main className="grid place-content-center mt-20" style={{ width: "100%" }}>
                {/* This is the div outside the generated dot container for time and instructions */}
                <div className="absolute geist-mono-latin-400 mt-4 top-10 left-1/2 transform -translate-x-1/2 z-10 p-4 text-center text-white text-xl">
                    <p>Time left: {gameTime}s</p>
                    <p>Click the red dots!</p>
                </div>

                {/* Start Game Button */}
                {!gameStarted && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <button
                            onClick={startGame}
                            className="bg-red-500 geist-mono-latin-500 text-white py-2 px-4 rounded-lg text-xl"
                        >
                            Start Game
                        </button>
                    </div>
                )}

                <div
                    style={{ width: "90vw", height: "70vh" }}
                    ref={gameContainerRef} // Attach the ref here
                    className="w-full h-screen relative bg-neutral-900/50 border-2 border-neutral-800 rounded-xl"
                >
                    {/* Inject the CSS styles for animation */}
                    <style>
                        {`
                            @keyframes grow-shrink {
                                0% {
                                    transform: scale(0); /* Start small */
                                    opacity: 0;
                                }
                                50% {
                                    transform: scale(1.2); /* Grow slightly larger */
                                    opacity: 1;
                                }
                                100% {
                                    transform: scale(0); /* Shrink and disappear */
                                    opacity: 0;
                                }
                            }

                            .dot {
                                animation: grow-shrink 2s ease-in-out forwards;
                            }
                        `}
                    </style>

                    {/* Render the red dots */}
                    {dots.map((dot, index) => (
                        <div
                            key={dot.id} // Unique key based on id
                            onClick={() => handleDotClick(index)}
                            className="absolute bg-red-500 rounded-full cursor-pointer dot"
                            style={{
                                left: dot.x,
                                top: dot.y,
                                width: "40px",
                                height: "40px",
                            }}
                        />
                    ))}

                    {isGameOver && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-3xl">
                            Game Over!
                            <p>Accuracy: {accuracy}%</p>
                            <p>CPS: {cps}</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ClickGame;
