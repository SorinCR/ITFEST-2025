import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

export default function CardAlert() {
    const handleUpgradeClick = () => {
        window.location.href = '/pricing';
    };

    return (
        <Card variant="outlined" sx={{ m: 1.5, flexShrink: 0 }}>
            <CardContent>
                <AutoAwesomeRoundedIcon fontSize="small" />
                <Typography gutterBottom sx={{ fontWeight: 600 }}>
                    Need an extra hand?
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                    Use our <span style={{ color: '#4287f5' }}>AI tools</span> to get your event on your user's eyes as fast as possible with the Enterprise Plan
                </Typography>
                <Button variant="contained" size="small" fullWidth onClick={handleUpgradeClick}>
                    Upgrade
                </Button>
            </CardContent>
        </Card>
    );
}
