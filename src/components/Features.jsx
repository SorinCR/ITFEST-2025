import React from "react";
import { Leaf, Users, Calendar, BarChart3, MapPin, Music } from "lucide-react";
import { motion } from "framer-motion";
import { Box, Card, Typography, Grid } from "@mui/material";

// Wrap MUI Card with Framer Motion
const MotionCard = motion(Card);

const FeatureCard = ({ icon: Icon, title, description }) => (
    <MotionCard
        whileHover={{ scale: 1.05 }}
        sx={{
            p: 3,
            border: "1px solid",
            borderColor: "grey.300",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 2,
            boxShadow: 3,
            borderRadius: 2,
            transition: "transform 0.3s",
            backgroundColor: "common.white",
        }}
    >
        <Icon style={{ height: 48, width: 48, color: "#4caf50" }} />
        <Typography variant="h6" component="h3" sx={{ fontWeight: "bold", color: "grey.900" }}>
            {title}
        </Typography>
        <Typography variant="body1" sx={{ color: "grey.600" }}>
            {description}
        </Typography>
    </MotionCard>
);

const Features = () => (
    <Box
        id="features"
        sx={{
            py: 8,
            px: 3,
            background: "linear-gradient(to bottom, #F5F5F5, #FFFFFF)",
        }}
    >
        <Box textAlign="center" mb={4}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", color: "grey.900" }}>
                    Key Features
                </Typography>
            </motion.div>
        </Box>
        <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
                <FeatureCard
                    icon={Calendar}
                    title="Event Planning"
                    description="Manage scheduling, budgeting, and all aspects of your event."
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <FeatureCard
                    icon={MapPin}
                    title="Venue Booking"
                    description="Find and book eco-certified venues with sustainability ratings."
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <FeatureCard
                    icon={Music}
                    title="Equipment Management"
                    description="Book energy-efficient sound and projection systems to minimize waste."
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <FeatureCard
                    icon={Users}
                    title="Audience Engagement"
                    description="Enable interactive digital tools to foster paperless participation."
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <FeatureCard
                    icon={BarChart3}
                    title="Impact Tracking"
                    description="Monitor carbon footprint, waste, and energy consumption in real time."
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <FeatureCard
                    icon={Leaf}
                    title="Sustainability Checklist"
                    description="Follow best practices to ensure your event meets environmental standards."
                />
            </Grid>
        </Grid>
    </Box>
);

export default Features;
