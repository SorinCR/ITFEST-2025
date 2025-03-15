import React, { useState } from 'react';
import { Container, Box, Paper, Typography, TextField, Button, Link } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Implement your login logic here.
        console.log('Logging in', { email, password });
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 8, borderRadius: 2, boxShadow: 3 }}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontWeight: 'bold', color: '#4caf50', mb: 2 }}
                >
                    Log in to EcoEvent
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: '#4caf50',
                            '&:hover': { backgroundColor: '#43a047' },
                            textTransform: 'none',
                            fontWeight: 'bold',
                        }}
                    >
                        Log In
                    </Button>
                    <Typography align="center">
                        Don't have an account?{' '}
                        <Link href="/signup" underline="hover" sx={{ color: '#4caf50' }}>
                            Sign Up
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
