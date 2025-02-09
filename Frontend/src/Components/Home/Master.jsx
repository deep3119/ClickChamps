import React from 'react';
import { BackgroundBeamsWithCollision } from "../../Components/ui/background-beams-with-collision";
import '../Home/Animation.css';

function Master() {
  return (
    <BackgroundBeamsWithCollision>
      <section className="mx-auto px-4 py-28 text-center relative">
        <div className="space-y-8">
          {/* Gradient Title */}
          <h1
            className="fira-700 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Gradient Text */}
            <span
              style={{
                background: 'linear-gradient(to right, #d1d5db, #f9fafb, #e5e7eb)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Master Your Clicking Skills <br /> with
            </span>
            {/* Non-Gradient Text */}
            <span className="text-red-400 ml-9 fira-700">ClickChamps</span>
          </h1>

          {/* Subtitle */}
          <p
            className="fira-400 text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Practice clicking, challenge friends, and track improvements with real-time stats in a sleek, minimalist interface.
          </p>

          {/* Call-to-Action Button */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <a
              className="text-white fira-600 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow bg-gradient-to-r from-red-500 to-red-600 hover:from-red-700 hover:to-red-800 font-semibold transition-all duration-300 h-12 rounded-full px-8"
              href="/click"
            >
              Start Clicking Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </BackgroundBeamsWithCollision>
  );
}

export default Master;