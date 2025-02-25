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
import { Toaster } from 'react-hot-toast';
import Loader from "./Components/Common/Loader";

const checkAuth = () => {
  // const token = localStorage.getItem("token") || document.cookie.includes("access_token");
  const token =  document.cookie.includes("access_token");
  return !!token;
};

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authStatus = checkAuth();
    setIsAuthenticated(authStatus);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home apiUrl={apiUrl} isAuthenticated={isAuthenticated} />} />
        <Route path="/click" element={<ClickGame isAuthenticated={isAuthenticated} />} />
        <Route path="/result" element={<Result isAuthenticated={isAuthenticated} apiUrl={apiUrl} />} />
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
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
