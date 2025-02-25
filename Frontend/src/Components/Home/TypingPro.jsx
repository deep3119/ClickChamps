import React from "react";
import { ReactTyped } from "react-typed";

function TypingPro() {
  return (
    <section className="container mx-auto px-4 py-20 text-center relative">
      <div className="space-y-8 relative z-10">
        {/* Heading with React Typed */}
        <h2 className="text-3xl fira-700 sm:text-4xl md:text-5xl font-bold text-neutral-200 tracking-tight" style={{ transform: "translateY(20px)" }}>
          Ready to Become a{" "}
          <span className="underline underline-offset-8 decoration-red-400">
            <ReactTyped
              strings={[
                "Clicking Pro",
                "Speed Demon",
                "Accuracy Master",
                "Game Champion",
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
          </span>
          ?
        </h2>

        {/* Subheading */}
        <p
          className="text-xl hover:text-white fira-400 text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          style={{ transform: "translateY(20px)" }}
        >
          Join thousands of users who have improved their clicking speed and accuracy with ClickChamps.
        </p>

        {/* Call-to-Action Button */}
        <div style={{ transform: "translateY(20px)" }}>
          <a
            className="inline-flex items-center justify-center gap-2 fira-600 text-white whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r from-red-500 to-red-600 hover:from-red-700 hover:to-red-800 font-semibold transition-all duration-300 h-10 rounded-md px-8"
            href="/click"
          >
            Get Started for Free
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
  );
}

export default TypingPro;