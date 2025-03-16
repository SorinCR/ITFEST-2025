import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// Import your logo image (adjust the path as needed)
import logo from '../../src/assets/logo.png';

const LogoImage = styled('img')(({ theme }) => ({
    width: 80, // Reduced default width
    height: 'auto',
    [theme.breakpoints.up('sm')]: {
        width: 160, // Reduced width for larger screens
    },
}));

export default function LogoComponent() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 1,
            }}
        >
            <LogoImage src={logo} alt="Logo" />
        </Box>
    );
}
