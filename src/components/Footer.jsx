import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer = () => (
    <Box
        component="footer"
        sx={{
            backgroundColor: "grey.900",
            color: "common.white",
            py: 3,
            mt: 6,
        }}
    >
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
            <Typography variant="body2">
                © 2025 EcoTrace. All rights reserved.
            </Typography>
        </Container>
    </Box>
);

export default Footer;
