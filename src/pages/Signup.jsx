import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../components/CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: theme.spacing(2),
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100vh',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    ...theme.applyStyles('dark', {
        backgroundImage:
            'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
}));

export default function SignUp(props) {
    const [firstNameError, setFirstNameError] = React.useState(false);
    const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState(false);
    const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [passwordConfirmError, setPasswordConfirmError] = React.useState(false);
    const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = React.useState('');
    const [isCompany, setIsCompany] = React.useState(false);

    const validateInputs = () => {
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const passwordConfirm = document.getElementById('passwordConfirm');

        let isValid = true;

        if (!firstName.value || firstName.value.trim() === '') {
            setFirstNameError(true);
            setFirstNameErrorMessage('First name is required.');
            isValid = false;
        } else {
            setFirstNameError(false);
            setFirstNameErrorMessage('');
        }

        if (!lastName.value || lastName.value.trim() === '') {
            setLastNameError(true);
            setLastNameErrorMessage('Last name is required.');
            isValid = false;
        } else {
            setLastNameError(false);
            setLastNameErrorMessage('');
        }

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (passwordConfirm.value !== password.value) {
            setPasswordConfirmError(true);
            setPasswordConfirmErrorMessage('Passwords do not match.');
            isValid = false;
        } else {
            setPasswordConfirmError(false);
            setPasswordConfirmErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateInputs()) {
            return;
        }
        const data = new FormData(event.currentTarget);

        fetch("http://194.102.62.226:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fname: data.get('firstName'),
                lname: data.get('lastName'),
                email: data.get('email'),
                password: data.get('password'),
                userType: isCompany ? "company" : "individual",
                company: isCompany ? data.get('company') : "",
            }),
        }).then((response) => response.json())
            .then((d) => {
                console.log(d);
                if (d.success) {
                    localStorage.setItem("token", d.accessToken);
                    localStorage.setItem("email", data.get('email'));
                    // setTimeout(() => {
                    //     window.location.href = "/create-event";
                    // },1000)
                    window.location.href = "/create-event";
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => console.error(error));

        // console.log({
        //     firstName: data.get('firstName'),
        //     lastName: data.get('lastName'),
        //     email: data.get('email'),
        //     password: data.get('password'),
        //     passwordConfirm: data.get('passwordConfirm'),
        //     company: isCompany ? data.get('company') : "",
        // });
    };

    React.useEffect(() => {
                if(localStorage.getItem("token")) {
                    fetch("http://194.102.62.226:5000/tokenLogin", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            accessToken: localStorage.getItem("token"),
                            email: localStorage.getItem("email")
                        }),
                    }
                        ).then((response) => response.json())
                        .then((data) => {
                            if (data.success) {
                                return window.location.href = "/create-event";
                            }
                        })
                        .catch((error) => console.error(error))
                }
            }, []);

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <SignUpContainer>
                <Card variant="outlined">
                    <SitemarkIcon />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="firstName">First Name</FormLabel>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                placeholder="Jon"
                                error={firstNameError}
                                helperText={firstNameErrorMessage}
                                color={firstNameError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="lastName">Last Name</FormLabel>
                            <TextField
                                autoComplete="family-name"
                                name="lastName"
                                required
                                fullWidth
                                id="lastName"
                                placeholder="Snow"
                                error={lastNameError}
                                helperText={lastNameErrorMessage}
                                color={lastNameError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                placeholder="your@email.com"
                                name="email"
                                autoComplete="email"
                                variant="outlined"
                                error={emailError}
                                helperText={emailErrorMessage}
                                color={emailError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                variant="outlined"
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="passwordConfirm"
                                placeholder="••••••"
                                type="password"
                                id="passwordConfirm"
                                autoComplete="new-password"
                                variant="outlined"
                                error={passwordConfirmError}
                                helperText={passwordConfirmErrorMessage}
                                color={passwordConfirmError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive updates via email."
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isCompany}
                                    onChange={(event) => setIsCompany(event.target.checked)}
                                    color="primary"
                                />
                            }
                            label="I represent a company"
                        />
                        {isCompany && (
                            <FormControl>
                                <FormLabel htmlFor="company">Company Name</FormLabel>
                                <TextField
                                    autoComplete="organization"
                                    name="company"
                                    fullWidth
                                    id="company"
                                    placeholder="Your Company"
                                />
                            </FormControl>
                        )}
                        <Button type="submit" fullWidth variant="contained">
                            Sign up
                        </Button>
                    </Box>
                    <Divider>
                        <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                    </Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign up with Google')}
                            startIcon={<GoogleIcon />}
                        >
                            Sign up with Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign up with Facebook')}
                            startIcon={<FacebookIcon />}
                        >
                            Sign up with Facebook
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignUpContainer>
        </AppTheme>
    );
}
