import React from "react";
import { Leaf, Monitor, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";

// Wrap MUI Paper with Framer Motion
const MotionPaper = motion(Paper);

const BenefitCard = ({ icon: Icon, title, description }) => (
    <MotionPaper
        whileHover={{ scale: 1.05 }}
        sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            border: 1,
            borderColor: "divider",
            boxShadow: 3,
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: "background.paper",
            transition: "transform 0.3s",
        }}
    >
        <Box
            sx={{
                p: 2,
                backgroundColor: "success.light",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Icon style={{ width: 40, height: 40, color: "#4caf50" }} />
        </Box>
        <Typography variant="h5" component="h3" sx={{ fontWeight: "bold", color: "text.primary" }}>
            {title}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {description}
        </Typography>
    </MotionPaper>
);

const Benefits = () => (
    <Box
        id="benefits"
        sx={{
            py: { xs: 8, md: 16 },
            background: "linear-gradient(to bottom, #e8f5e9, #f5f5f5)",
        }}
    >
        <Container maxWidth="lg">
            <Box textAlign="center" mb={4}>
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", color: "text.primary" }}>
                        Why Choose EcoEvent?
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mt: 2,
                            maxWidth: "900px",
                            mx: "auto",
                            color: "text.secondary",
                        }}
                    >
                        Make a positive impact while creating memorable experiences. We help you plan, track, and optimize event sustainability with ease.
                    </Typography>
                </motion.div>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} lg={4}>
                    <BenefitCard
                        icon={Leaf}
                        title="Reduce Environmental Impact"
                        description="Minimize carbon footprint, waste, and resource consumption with real-time tracking."
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <BenefitCard
                        icon={Monitor}
                        title="All-in-One Platform"
                        description="Manage everything from venue booking to impact assessment in a single intuitive dashboard."
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <BenefitCard
                        icon={Users}
                        title="Enhanced Attendee Experience"
                        description="Use digital collaboration tools to create engaging, paperless experiences for participants."
                    />
                </Grid>
            </Grid>
        </Container>
    </Box>
);

export default Benefits;
