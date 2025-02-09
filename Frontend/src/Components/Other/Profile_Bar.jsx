import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../Font.css";

const Profile_Bar = ({ access_token, apiUrl }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data with axios
    axios
      .get(`${apiUrl}/profile/score_over_time`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${access_token}`, // Use Bearer token authentication
        },
      })
      .then((response) => {
        const rawData = response.data.data.daily_stats;

        // Format the data for the chart
        const formattedData = Object.keys(rawData).map((date) => ({
          date,
          average_score: rawData[date].average_score,
          hard_level_score: rawData[date].by_level.Hard.average_score,
          medium_level_score: rawData[date].by_level.Medium.average_score,
          easy_level_score: rawData[date].by_level.easy.average_score,
          total_efficiency: rawData[date].total_efficiency,
        }));

        console.log("Formatted Data:", formattedData); // Debugging
        setData(formattedData); // Set the formatted data
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
        setLoading(false);
      });
  }, [apiUrl, access_token]);

  // If loading, display a loading message or spinner
  if (loading) return <p className="text-center text-neutral-400">Loading data...</p>;

  // If there's an error, display an error message
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-center text-2xl font-bold text-neutral-200 mb-6">
        Daily Performance Chart
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: "#888" }} />
          <YAxis tick={{ fill: "#888" }} />
          <Tooltip />
          <Legend />

          <Bar dataKey="average_score" fill="#21c45d" name="Average Score" />

          <Bar dataKey="hard_level_score" fill="#ff4d4f" name="Hard Level Score" />

          <Bar dataKey="medium_level_score" fill="#faad14" name="Medium Level Score" />

          <Bar dataKey="easy_level_score" fill="#1890ff" name="Easy Level Score" />

          <Bar dataKey="total_efficiency" fill="#722ed1" name="Total Efficiency" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Profile_Bar;