import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateEventDashboard from "./pages/CreateEventDashboard";
import Leaderboard from "./pages/Leaderboard";
import LoginPage from "./pages/SigninSide.jsx";
import SignupPage from "./pages/Signup.jsx";
import Checkout from "./pages/Checkout.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-event" element={<CreateEventDashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/pricing" element={<Checkout />} />
            <Route path="/events/:eventId" element={<CreateEventDashboard />} />
        </Routes>
    );
};

export default App;
