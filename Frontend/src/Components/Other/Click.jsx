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
    const [penaltyClicks, setPenaltyClicks] = useState(0);
    const [hits, setHits] = useState(0);
    const [targetEfficiencyPerSecond, setTargetEfficiencyPerSecond] = useState([]); // store target efficiency values

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

    const handleDotClick = (index) => {
        setDots((prev) => prev.filter((_, i) => i !== index));
        setClickedDots((prev) => prev + 1);
        setHits((prev) => prev + 1);
    };

    const handleGlobalClick = (event) => {
        const clickedInsideDot = dots.some(
            (dot) =>
                event.clientX >= dot.x &&
                event.clientX <= dot.x + 40 &&
                event.clientY >= dot.y &&
                event.clientY <= dot.y + 40
        );
        if (clickedInsideDot) setHits((prev) => prev + 1);
        else setPenaltyClicks((prev) => prev + 1);
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
            const targetEfficiency = totalDots > 0 ? ((hits / totalDots) * 100).toFixed(2) : 0;
            const clickAccuracy = clickedDots > 0 ? ((hits / clickedDots) * 100).toFixed(2) : 0;

            setTimeout(() => {
                navigate("/result", {
                    state: {
                        targetEfficiency,
                        clickAccuracy,
                        totalHits: hits,
                        totalClicks: totalDots,
                        clicksPerSecond: targetEfficiencyPerSecond,
                    },
                });
            }, 2000);
        }
    }, [gameTime, clickedDots, totalDots, hits, navigate, targetEfficiencyPerSecond]);

    const startGame = () => {
        setGameStarted(true);
        setGameTime(15);
        setClickedDots(0);
        setTotalDots(0);
        setPenaltyClicks(0);
        setHits(0);
        setIsGameOver(false);
        setTargetEfficiencyPerSecond([]); // reset efficiency data when starting a new game
    };

    useEffect(() => {
        if (gameStarted) document.addEventListener("click", handleGlobalClick);
        else document.removeEventListener("click", handleGlobalClick);
        return () => document.removeEventListener("click", handleGlobalClick);
    }, [gameStarted]);

    // Update target efficiency every second
    useEffect(() => {
        if (!gameStarted) return;
        const intervalId = setInterval(() => {
            const efficiency = totalDots > 0 ? ((hits / totalDots) * 100).toFixed(2) : 0;
            setTargetEfficiencyPerSecond((prev) => [
                ...prev,
                { time: 15 - gameTime, efficiency },
            ]);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [gameStarted, gameTime, hits, totalDots]);

    return (
        <div className="antialiased min-h-screen bg-gradient-to-b from-neutral-900 to-black text-neutral-400">
            <Navbar isAuthenticated={isAuthenticated} />
            <main className="grid place-content-center mt-20" style={{ width: "100%" }}>
                <div className="absolute geist-mono-latin-400 mt-4 top-10 left-1/2 transform -translate-x-1/2 z-10 p-4 text-center text-white text-xl">
                    <p>Time left: {gameTime}s</p>
                    <p>Click the red dots!</p>
                </div>
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
                    ref={gameContainerRef}
                    className="w-full h-screen relative bg-neutral-900/50 border-2 border-neutral-800 rounded-xl"
                >
                    <style>
                        {`
                            @keyframes grow-shrink {
                                0% { transform: scale(0); opacity: 0; }
                                50% { transform: scale(1.2); opacity: 1; }
                                100% { transform: scale(0); opacity: 0; }
                            }
                            .dot { animation: grow-shrink 2s ease-in-out forwards; }
                        `}
                    </style>
                    {dots.map((dot, index) => (
                        <div
                            key={dot.id}
                            onClick={() => handleDotClick(index)}
                            className="absolute bg-red-500 rounded-full cursor-pointer dot"
                            style={{ left: dot.x, top: dot.y, width: "40px", height: "40px" }}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ClickGame;
