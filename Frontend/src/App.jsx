import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import Form from "./Components/Other/Form";
import LeaderBoard from "./Components/Other/LeaderBoard";
import Result from "./Components/Other/Result";
import Profile from "./Components/Other/Profile";
import Multiplayer from "./Components/Other/Multiplayer";
import Logout from "./Components/Common/Logout";
import ClickGame from "./Components/Other/Click";

const checkAuth = () => {
  const token = localStorage.getItem("token") || document.cookie.includes("access_token");
  return !!token;
};

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authStatus = checkAuth();
    setIsAuthenticated(authStatus);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path="/click" element={<ClickGame isAuthenticated={isAuthenticated} />} />
        <Route path="/result" element={<Result isAuthenticated={isAuthenticated} />} />
        <Route path="/leaderboard" element={<LeaderBoard apiUrl={apiUrl} isAuthenticated={isAuthenticated} />} />
        <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />

        <Route
          path="/auth"
          element={isAuthenticated ?<></> : <Form apiUrl={apiUrl} setIsAuthenticated={setIsAuthenticated} />} />
        
        <Route
          path="/multiplayer"
          element={isAuthenticated ? <Multiplayer isAuthenticated={isAuthenticated} /> : <Navigate to="/auth" />}
        />

        <Route
          path="/profile"
          element={isAuthenticated ? <Profile apiUrl={apiUrl} isAuthenticated={isAuthenticated} /> : <Navigate to="/auth" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
