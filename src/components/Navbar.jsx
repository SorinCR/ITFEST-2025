import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Wrap MUI components with Framer Motion for animations
const MotionToolbar = motion(Toolbar);
const MotionButton = motion(Button);

const Navbar = () => (
    <AppBar
        position="sticky"
        elevation={4}
        sx={{ backgroundColor: "white", color: "black" }}
    >
        <MotionToolbar
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Left side: Logo and brand name */}
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                <IconButton edge="start" color="inherit" aria-label="logo">
                    <Leaf style={{ height: 32, width: 32, color: "#4caf50" }} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                    EcoEvent
                </Typography>
            </Box>
            {/* Right side: Action buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
                <Link to="/leaderboard" style={{ textDecoration: "none" }}>
                    <MotionButton
                        whileHover={{ scale: 1.1 }}
                        variant="outlined"
                        sx={{ textTransform: "none", fontWeight: 600 }}
                    >
                        Leaderboard
                    </MotionButton>
                </Link>
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <MotionButton
                        whileHover={{ scale: 1.1 }}
                        variant="outlined"
                        sx={{ textTransform: "none", fontWeight: 600 }}
                    >
                        Log in
                    </MotionButton>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                    <MotionButton
                        whileHover={{ scale: 1.1 }}
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            backgroundColor: "#4caf50",
                            "&:hover": { backgroundColor: "#43a047" },
                        }}
                    >
                        Register
                    </MotionButton>
                </Link>
            </Box>
        </MotionToolbar>
    </AppBar>
);

export default Navbar;
