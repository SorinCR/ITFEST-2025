import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import CalculateSustainabilityScoreDialog from './CalculateSustainabilityScoreDialog';
import EventAIDescriptionDialog from './EventAIDescriptionDialog';
import EventAIURLDialog from './EventAIURLDialog';

export default function ButtonsContainer({userData}) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [openScoreDialog, setOpenScoreDialog] = useState(false);
    const [openAIDialog, setOpenAIDialog] = useState(false);
    const [openAIurlDialog, setOpenAIurlDialog] = useState(false);
    const [extractedData, setExtractedData] = useState({});

    const handleExtract = (extractedData) => {
        // console.log('Extracted Data:', extractedData);
        const updatedData = Object.fromEntries(
            Object.entries(extractedData).map(([key, value]) => [key, value === 'Not specified' ? null : value])
        );
        setExtractedData(updatedData);
        setOpenScoreDialog(true);
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
                            height: '53.33333333333333px', // Updated height for the first button
                            textTransform: 'none',
                            fontSize: '1.25rem'
                        }}
                    >
                        <span role="img" aria-label="chart" style={{ marginRight: '8px' }}>
                            ♻
                        </span>
                        Calculate Sustainability Score
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {userData.plan == 1 ? <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => setOpenAIDialog(true)}
                        sx={{
                            height: '53.33333333333333px', // Updated height for the second button
                            textTransform: 'none',
                            fontSize: '1.25rem'
                        }}
                    >
                        <span role="img" aria-label="robot" style={{ marginRight: '8px' }}>
                            ✨
                        </span>
                        AI Event Description Parser
                    </Button>: <Button
                        variant="outlined"
                        color="primary"
                        disabled
                        fullWidth
                        sx={{
                            height: '53.33333333333333px', // Updated height for the second button
                            textTransform: 'none',
                            fontSize: '1.25rem'
                        }}
                    >
                        <span role="img" aria-label="robot" style={{ marginRight: '8px' }}>
                            ✨
                        </span>
                        AI Event Description Parser
                    </Button>}
                </Grid>
                <Grid item xs={12}>
                    {userData.plan == 1 ? <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => setOpenAIurlDialog(true)}
                        sx={{
                            height: '53.33333333333333px', // Updated height for the second button
                            textTransform: 'none',
                            fontSize: '1.25rem'
                        }}
                    >
                        <span role="img" aria-label="robot" style={{ marginRight: '8px' }}>
                            🔗
                        </span>
                        AI URL Parser
                    </Button> : <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        disabled
                        title="Upgrade to Enterprise Plan to use this feature"
                        sx={{
                            height: '53.33333333333333px', // Updated height for the second button
                            textTransform: 'none',
                            fontSize: '1.25rem'
                        }}
                    >
                        <span role="img" aria-label="robot" style={{ marginRight: '8px' }}>
                            🔗
                        </span>
                        AI URL Parser
                    </Button>}
                </Grid>
            </Grid>

            <CalculateSustainabilityScoreDialog
                isOpen={openScoreDialog}
                extractedData={extractedData}
                onClose={() => setOpenScoreDialog(false)}
            />
            <EventAIDescriptionDialog
                isOpen={openAIDialog}
                onClose={() => setOpenAIDialog(false)}
                onExtract={handleExtract}
            />
            <EventAIURLDialog
                isOpen={openAIurlDialog}
                onClose={() => setOpenAIDialog(false)}
                onExtract={handleExtract}
            />
            
        </Box>
    );
}
