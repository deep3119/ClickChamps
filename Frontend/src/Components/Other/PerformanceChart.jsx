import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import "../../Font.css";

const PerformanceChart = ({ clicksPerSecond }) => {
    return (
        <div className="fira-400" style={{ padding: "20px", borderRadius: "8px" }}>
            <LineChart width={800} height={400} data={clicksPerSecond} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="time" tick={{ fill: "#aaa" }} />
                <YAxis tick={{ fill: "#aaa" }} />
                <Tooltip contentStyle={{ backgroundColor: "#222", borderRadius: "15px" }} itemStyle={{ color: "#fff" }} />
                <Line type="monotone" dataKey="efficiency" stroke="#00ff00" strokeWidth={2} />
            </LineChart>
        </div>
    );
};

export default PerformanceChart;
