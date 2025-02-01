import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import "../../Font.css";


const PerformanceChart = ({ wpmPerMinute }) => {
  // Limit the data to the last 50 points for performance
  const limitedData = wpmPerMinute.slice(-50);

  // Optional: Thin out the data by picking every nth data point (e.g., every 2nd point)
  const thinnedData = limitedData.filter((_, index) => index % 2 === 0);

  return (
    <div className="geist-mono-latin-400" style={{ padding: "20px", borderRadius: "8px" }}>
      <LineChart
        width={800}
        height={400}
        data={thinnedData} // Pass the filtered/thinned data
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="time" tick={{ fill: "#aaa" }} />
        <YAxis tick={{ fill: "#aaa" }} />
        <Tooltip
          contentStyle={{ backgroundColor: "#222" , borderRadius:"15px" }}
          itemStyle={{ color: "#fff" }}
        />
        <Line type="monotone" dataKey="wpm" stroke="#00ff00" strokeWidth={2} />
        <ReferenceLine y={37} label="Avg: 37 WPM" stroke="#ffcc00" strokeDasharray="3 3" />
      </LineChart>
    </div>
  );
};

export default PerformanceChart;
