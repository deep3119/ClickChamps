import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../../Font.css";

const Profile_Bar = ({access_token,apiUrl}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Fetch data with axios
  //   axios.get(`${apiUrl}/profile/wpm-over-time`, {
  //     withCredentials: true, // If you are using cookies
  //     headers: {
  //       'Authorization': `Bearer ${access_token}` // Or wherever you store the token
  //     }
  //   })
  //   .then(response => {
  //     // Format the data to be used by the chart
  //     const formattedData = Object.keys(response.data).map(date => ({
  //       date,
  //       wpm: response.data[date]
  //     }));
  //     setData(formattedData); // Store the formatted data
  //     setLoading(false); // Set loading to false when data is fetched
  //   })
  //   .catch(err => {
  //     console.error("Error fetching data:", err);
  //     setError("Failed to load data.");
  //     setLoading(false);
  //   });
  // }, [apiUrl]);

  // // If loading, display a loading message or spinner
  // if (loading) return <p>Loading data...</p>;

  // // If there's an error, display an error message
  // if (error) return <p>{error}</p>;

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="wpm" fill="#21c45d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Profile_Bar;
