import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateEventDashboard from "./pages/CreateEventDashboard";
import Leaderboard from "./pages/Leaderboard";
import LoginPage from "./pages/SigninSide.jsx";
import SignupPage from "./pages/Signup.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-event" element={<CreateEventDashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
        </Routes>
    );
};

export default App;
