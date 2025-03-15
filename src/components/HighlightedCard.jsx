import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import CalculateSustainabilityScoreDialog from './CalculateSustainabilityScoreDialog';
import EventAIDescriptionDialog from './EventAIDescriptionDialog';

export default function ButtonsContainer() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [openScoreDialog, setOpenScoreDialog] = useState(false);
    const [openAIDialog, setOpenAIDialog] = useState(false);

    const handleExtract = (extractedData) => {
        console.log('Extracted Data:', extractedData);
        // Handle the extracted data as needed.
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => setOpenScoreDialog(true)}
                        sx={{
                            height: '80px', // Updated height for the first button
                            textTransform: 'none',
                            fontSize: '1.25rem'
                        }}
                    >
                        <span role="img" aria-label="chart" style={{ marginRight: '8px' }}>
                            📊
                        </span>
                        Calculate Sustainability Score
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={() => setOpenAIDialog(true)}
                        sx={{
                            height: '80px', // Updated height for the second button
                            textTransform: 'none',
                            fontSize: '1.25rem'
                        }}
                    >
                        <span role="img" aria-label="robot" style={{ marginRight: '8px' }}>
                            🤖
                        </span>
                        AI Event Description Parser
                    </Button>
                </Grid>
            </Grid>

            <CalculateSustainabilityScoreDialog
                isOpen={openScoreDialog}
                onClose={() => setOpenScoreDialog(false)}
            />
            <EventAIDescriptionDialog
                isOpen={openAIDialog}
                onClose={() => setOpenAIDialog(false)}
                onExtract={handleExtract}
            />
        </Box>
    );
}
