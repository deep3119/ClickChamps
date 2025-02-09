import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup"; // Install via npm: npm install react-countup
import VisibilitySensor from "react-visibility-sensor"; // Install via npm: npm install react-visibility-sensor

function Numbers({ apiUrl }) {
  const [data, setData] = useState({
    registeredUsers: 0,
    racesCompleted: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to track whether the counters have been triggered
  const [hasAnimated, setHasAnimated] = useState(false);

  // Fetch data from the API
  useEffect(() => {
    axios
      .get(`${apiUrl}/game/user_stats`) // Replace `/stats` with your actual API endpoint
      .then((response) => {
        console.log(response.data); // Debugging
        setData({
          registeredUsers: response.data.total_users || 0,
          racesCompleted: response.data.total_tests_completed || 0,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
        setError("Failed to load stats.");
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="text-center text-neutral-400">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Title */}
        <h2 className="fira-700 text-3xl sm:text-4xl md:text-5xl font-bold text-center text-neutral-200 mb-12 animate-fade-in-up">
          ClickChamps by
          <span className="underline underline-offset-8 ml-5 decoration-red-400">Numbers</span>
        </h2>

        {/* Stats */}
        <div className="flex justify-center pt-9 gap-8">
          {/* Registered Users */}
          <div className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800 w-full max-w-xs">
            <div className="p-5 text-center space-y-2">
              <div className="text-neutral-400 fira-400 text-base">Clickers Registered</div>
              <VisibilitySensor
                partialVisibility
                offset={{ bottom: 200 }}
                onChange={(isVisible) => {
                  if (isVisible && !hasAnimated) {
                    setHasAnimated(true); // Trigger the animation only once
                  }
                }}
              >
                {({ isVisible }) => (
                  <div className="fira-600 font-semibold tracking-tight text-red-400 text-4xl">
                    {hasAnimated ? (
                      <CountUp end={data.registeredUsers} duration={2} separator="," />
                    ) : (
                      "0"
                    )}
                  </div>
                )}
              </VisibilitySensor>
            </div>
          </div>

          {/* Races Completed */}
          <div className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800 w-full max-w-xs">
            <div className="p-5 text-center space-y-2">
              <div className="text-neutral-400 fira-400 text-base">Races Completed</div>
              <VisibilitySensor
                partialVisibility
                offset={{ bottom: 200 }}
                onChange={(isVisible) => {
                  if (isVisible && !hasAnimated) {
                    setHasAnimated(true); // Trigger the animation only once
                  }
                }}
              >
                {({ isVisible }) => (
                  <div className="fira-600 font-semibold tracking-tight text-red-400 text-4xl">
                    {hasAnimated ? (
                      <CountUp end={data.racesCompleted} duration={2} separator="," />
                    ) : (
                      "0"
                    )}
                  </div>
                )}
              </VisibilitySensor>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Numbers;