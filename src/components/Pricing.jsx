import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

// Pricing tiers illustrate the freemium model and premium upsell strategy.
// Each tier supports a part of our sustainability tool's value proposition.
const tiers = [
    {
        title: 'Free',
        price: '0',
        description: [
            'Questionaire to measure the sustainability factor',
            'Help center access',
            'Email support',
        ],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
        buttonColor: 'primary',
        // The free tier is designed to drive initial adoption,
        // allowing event organizers to test the basic sustainability scoring tool.
    },
    {
        title: 'Professional',
        subheader: 'Recommended',
        price: '15',
        description: [
            'Automaticc AI questionaire filling',
            'Help center access',
            'Priority email support',
            'Dedicated team',
            'Best deals',
        ],
        buttonText: 'Start now',
        buttonVariant: 'contained',
        buttonColor: 'secondary',
        // The Professional tier targets organizations that require enhanced features
        // such as AI automation and detailed reporting to comply with EU ESG standards.
        // It is positioned as the recommended option for growing sustainability needs.
    },
    {
        title: 'Enterprise',
        price: '30',
        description: [
            'Automaticc AI questionaire filling',
            'Automatic detection and analysing of events post on company web page',
            'Help center access',
            'Phone & email support',
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
        buttonColor: 'primary',
        // The Enterprise tier caters to large organizations with robust requirements,
        // offering comprehensive support and higher resource allocation.
    },
];

export default function Pricing() {
    return (
        <Container
            id="pricing"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
            }}
        >
            <Box
                sx={{
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                }}
            >
                <Typography
                    component="h2"
                    variant="h4"
                    gutterBottom
                    sx={{ color: 'text.primary' }}
                >
                    Pricing
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Quickly build an effective pricing table for your potential customers with
                    this layout. <br />
                    It&apos;s built with default Material UI components with little
                    customization.
                </Typography>
            </Box>
            <Grid
                container
                spacing={3}
                sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
            >
                {tiers.map((tier) => (
                    <Grid
                        size={{ xs: 12, sm: tier.title === 'Enterprise' ? 12 : 6, md: 4 }}
                        key={tier.title}
                    >
                        <Card
                            sx={[
                                (theme) => ({
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4,
                                    background: theme.palette.mode === 'dark'
                                        ? '#252927'
                                        : 'linear-gradient(135deg, #C8E6C9 0%, #81C784 100%)',
                                }),
                                tier.title === 'Professional' &&
                                ((theme) => ({
                                    border: 'none',
                                    boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
                                    ...theme.applyStyles('dark', {
                                        background: '#252927',
                                        boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
                                    }),
                                })),
                            ]}
                        >
                            <CardContent>
                                <Box
                                    sx={[
                                        {
                                            mb: 1,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: 2,
                                        },
                                        tier.title === 'Professional'
                                            ? { color: 'grey.100' }
                                            : {},
                                    ]}
                                >
                                    <Typography component="h3" variant="h6">
                                        {tier.title}
                                    </Typography>
                                    {tier.title === 'Professional' && (
                                        <Chip icon={<AutoAwesomeIcon />} label={tier.subheader} />
                                    )}
                                </Box>
                                <Box
                                    sx={[
                                        {
                                            display: 'flex',
                                            alignItems: 'baseline',
                                        },
                                        tier.title === 'Professional'
                                            ? { color: 'grey.50' }
                                            : {},
                                    ]}
                                >
                                    <Typography component="h3" variant="h2">
                                        ${tier.price}
                                    </Typography>
                                    <Typography component="h3" variant="h6">
                                        &nbsp; per month
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                                {tier.description.map((line) => (
                                    <Box
                                        key={line}
                                        sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}
                                    >
                                        <CheckCircleRoundedIcon
                                            sx={[
                                                {
                                                    width: 20,
                                                },
                                                tier.title === 'Professional'
                                                    ? { color: 'primary.light' }
                                                    : { color: 'primary.main' },
                                            ]}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            component="span"
                                            sx={[
                                                tier.title === 'Professional'
                                                    ? { color: 'grey.50' }
                                                    : {},
                                            ]}
                                        >
                                            {line}
                                        </Typography>
                                    </Box>
                                ))}
                            </CardContent>
                            <CardActions>
                                <Button
                                    fullWidth
                                    variant={tier.buttonVariant}
                                    color={tier.buttonColor}
                                >
                                    {tier.buttonText}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
