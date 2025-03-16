import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import visuallyHidden from '@mui/utils/visuallyHidden';
import { styled } from '@mui/material/styles';

const StyledBox = styled('div')(({ theme }) => ({
    alignSelf: 'center',
    width: '100%',
    height: 400,
    marginTop: theme.spacing(8),
    borderRadius: (theme.vars || theme).shape.borderRadius,
    outline: '6px solid',
    outlineColor: 'hsla(220, 25%, 80%, 0.2)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.grey[200],
    boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
    // backgroundImage: `url('C:\\Users\\Manu21\\Desktop\\ITFEST-2025\\src\\assets\\dash.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(10),
        height: 700,
    },
    ...theme.applyStyles('dark', {
        boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
        // backgroundImage: `url('C:\\Users\\Manu21\\Desktop\\ITFEST-2025\\src\\assets\\dash.jpg')`,
        outlineColor: 'hsla(220, 20%, 42%, 0.1)',
        borderColor: (theme.vars || theme).palette.grey[700],
    }),
}));

export default function Hero() {
    return (
        <Box
            id="hero"
            sx={(theme) => ({
                width: '100%',
                backgroundRepeat: 'no-repeat',
                // backgroundImage:
                //@ts-ignore
                //     `url(C:\Users\Manu21\Desktop\ITFEST-2025\src\assets\dash.jpg)`,
                // ...theme.applyStyles('dark', {
                //     backgroundImage: `url('/img.png')`,
                // }),
            })}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                }}
            >
                <Stack
                    spacing={2}
                    useFlexGap
                    sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            fontSize: 'clamp(3rem, 10vw, 3.5rem)',
                        }}
                    >
                        The&nbsp;vision
                        <Typography
                            component="span"
                            variant="h1"
                            sx={(theme) => ({
                                fontSize: 'inherit',
                                color: 'primary.main',
                                ...theme.applyStyles('dark', {
                                    color: 'primary.light',
                                }),
                            })}
                        >
                            &nbsp;about&nbsp;sustainability
                        </Typography>
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                            width: { sm: '100%', md: '80%' },
                        }}
                    >
                        Explore our cutting-edge dashboard, delivering high-quality solutions
                        tailored to your needs. Elevate your experience with top-tier features
                        and services.
                    </Typography>
                </Stack>
                {/*<StyledBox id="image" />*/}
            </Container>
        </Box>
    );
}
