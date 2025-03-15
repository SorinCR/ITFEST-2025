import React, { useState } from 'react';
import { Container, Box, Paper, Typography, TextField, Button, Link } from '@mui/material';

const SignupPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        // Simple password match check.
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        // Implement your sign up logic here.
        console.log('Signing up', { fullName, email, password });
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 8, borderRadius: 2, boxShadow: 3 }}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontWeight: 'bold', color: '#4caf50', mb: 2 }}
                >
                    Sign Up for EcoEvent
                </Typography>
                <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Full Name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
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
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Sign Up
                    </Button>
                    <Typography align="center">
                        Already have an account?{' '}
                        <Link href="/login" underline="hover" sx={{ color: '#4caf50' }}>
                            Log In
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignupPage;
