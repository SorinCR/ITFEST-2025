import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Box, Container, Button } from "@mui/material";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer";

// Wrap MUI Button with Framer Motion
const MotionButton = motion(Button);

const Home = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                background: "linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)",
            }}
        >
            <Navbar />
            <Container
                component={motion.main}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                sx={{ flexGrow: 1, py: 6 }}
            >
                <Hero />
                <Box
                    component={motion.div}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    sx={{ my: 4 }}
                >
                    <Features />
                </Box>
                <Box
                    component={motion.div}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    sx={{ my: 4 }}
                >
                    <Benefits />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Link to="/create-event" style={{ textDecoration: "none" }}>
                        <MotionButton
                            whileHover={{ scale: 1.1 }}
                            variant="contained"
                            color="success"
                            size="large"
                            sx={{ px: 4, py: 1.5 }}
                        >
                            Start Planning Your Event
                        </MotionButton>
                    </Link>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default Home;
