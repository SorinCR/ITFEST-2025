import React, { useState } from "react";
import { Calendar, Leaf, ClipboardList, PlusCircle } from "lucide-react";
import CreateEventDialog from "../components/CalculateSustainabilityScoreDialog.jsx";
import EventAIDescriptionDialog from "../components/EventAIDescriptionDialog";
import {
    Container,
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

const CreateEventDashboard = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);

    const handleAIExtract = (extractedData) => {
        console.log("Extracted Data:", extractedData);
        // Here you can prefill the event creation form with extractedData
    };

    return (
        <Container maxWidth="lg" sx={{ minHeight: "100vh", py: 6, backgroundColor: "grey.50" }}>
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Create Event Dashboard
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Leaf style={{ width: 20, height: 20 }} />}
                        onClick={() => setIsAIDialogOpen(true)}
                    >
                        AI Generate Event
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<PlusCircle style={{ width: 20, height: 20 }} />}
                        onClick={() => setIsDialogOpen(true)}
                    >
                        New Event
                    </Button>
                </Box>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="h6">Total Events</Typography>
                        <Typography variant="h4" fontWeight="bold">12</Typography>
                        <Typography variant="body2" color="text.secondary">
                            +2 from last month
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="h6">Carbon Saved</Typography>
                        <Typography variant="h4" fontWeight="bold">2.4 tons</Typography>
                        <Typography variant="body2" color="text.secondary">
                            +0.8 tons from last month
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="h6">Waste Diverted</Typography>
                        <Typography variant="h4" fontWeight="bold">85%</Typography>
                        <Typography variant="body2" color="text.secondary">
                            +5% from last month
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Paper sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="h6">Sustainability Score</Typography>
                        <Typography variant="h4" fontWeight="bold">8.7/10</Typography>
                        <Typography variant="body2" color="text.secondary">
                            +0.3 from last month
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Upcoming Tasks */}
            <Grid container spacing={4}>
                <Grid item xs={12} lg={6}>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h6" mb={2}>
                            Upcoming Tasks
                        </Typography>
                        <List>
                            <ListItem alignItems="flex-start">
                                <ListItemIcon>
                                    <Calendar style={{ width: 20, height: 20, color: "#757575" }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Confirm venue sustainability credentials"
                                    secondary="Tech Conference - Due in 2 days"
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemIcon>
                                    <ClipboardList style={{ width: 20, height: 20, color: "#FBC02D" }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Complete waste management plan"
                                    secondary="Community Festival - Due tomorrow"
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemIcon>
                                    <Leaf style={{ width: 20, height: 20, color: "#4CAF50" }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Book energy-efficient equipment"
                                    secondary="Corporate Retreat - Due in 5 days"
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            {/* Dialogs */}
            <CreateEventDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
            <EventAIDescriptionDialog
                isOpen={isAIDialogOpen}
                onClose={() => setIsAIDialogOpen(false)}
                onExtract={handleAIExtract}
            />
        </Container>
    );
};

export default CreateEventDashboard;
