import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Box,
    CircularProgress,
} from "@mui/material";
import { Sparkles } from "lucide-react";

const EventAIDescriptionDialog = ({ isOpen, onClose, onExtract }) => {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleExtract = async () => {
        setLoading(true);
        // Simulate AI extraction delay
        setTimeout(() => {
            const extractedData = {
                eventName: "GreenTech Conference 2025",
                date: "2025-06-15",
                location: "San Francisco Convention Center",
                sustainabilityMeasures: ["Zero waste policy", "Renewable energy usage"],
            };
            setLoading(false);
            onExtract(extractedData);
            onClose();
        }, 2000);
    };

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Sparkles style={{ color: "#4caf50" }} />
                    <Typography variant="h6">AI Event Description Parser</Typography>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Enter a brief description of the event, and AI will extract key details.
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    placeholder="Describe your event..."
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleExtract}
                    disabled={loading}
                    startIcon={
                        loading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            <Sparkles style={{ color: "inherit" }} />
                        )
                    }
                >
                    Extract Info
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EventAIDescriptionDialog;
