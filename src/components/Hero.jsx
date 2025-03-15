import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";

// Wrap MUI components with motion for animations
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const Hero = () => (
    <Box
        sx={{
            py: 12,
            background: "linear-gradient(to bottom, #F0FFF4, #F9FAFB)",
            textAlign: "center",
        }}
    >
        <Container maxWidth="md">
            <MotionTypography
                variant="h2"
                component="h1"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                sx={{
                    fontWeight: 800,
                    color: "#212121",
                    mb: 3,
                }}
            >
                Plan Sustainable Events with Confidence
            </MotionTypography>
            <MotionTypography
                variant="h6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                sx={{ color: "#616161", mb: 4 }}
            >
                Organize impactful events while reducing environmental impact.
                Track, measure, and optimize your event’s sustainability in real time.
            </MotionTypography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Link to="/create-event" style={{ textDecoration: "none" }}>
                    <MotionButton
                        whileHover={{ scale: 1.1 }}
                        variant="contained"
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: "1rem",
                            backgroundColor: "#4caf50",
                            "&:hover": { backgroundColor: "#43a047" },
                        }}
                    >
                        Start Planning
                    </MotionButton>
                </Link>
                <MotionButton
                    whileHover={{ scale: 1.1 }}
                    variant="outlined"
                    sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: "1rem",
                        borderColor: "#4caf50",
                        color: "#4caf50",
                        "&:hover": { backgroundColor: "#e8f5e9" },
                    }}
                >
                    Learn More
                </MotionButton>
            </Box>
        </Container>
    </Box>
);

export default Hero;
