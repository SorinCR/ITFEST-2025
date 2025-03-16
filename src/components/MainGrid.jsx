import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';

export default function MainGrid({ userData, events }) {
    // Define date range: last 30 days (including today)
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    // Filter events from the last 30 days only
    const eventsLast30 = events.filter(event => {
        const eventDate = new Date(event.eventDate);
        return eventDate >= thirtyDaysAgo && eventDate <= now;
    });

    // Total number of events in last 30 days
    const totalEvents = eventsLast30.length;

    // Helper: Generate an array of last 30 days labels (e.g. "Apr 5")
    const getLast30DaysLabels = () => {
        const labels = [];
        for (let i = 29; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }
        return labels;
    };

    const labels = getLast30DaysLabels();

    // Compute daily counts for all events (for the "Number of events" card)
    const dailyEventCounts = labels.map(label =>
        eventsLast30.filter(event => {
            const d = new Date(event.eventDate);
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === label;
        }).length
    );

    // Determine the most frequent event location & venue type combination (in uppercase)
    const locationVenueCounts = eventsLast30.reduce((acc, event) => {
        const key = `${event.eventLocation} ${event.venueType}`.toUpperCase();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    const mostFrequentLocationVenue = Object.keys(locationVenueCounts).reduce(
        (a, b) => (locationVenueCounts[a] > locationVenueCounts[b] ? a : b),
        'N/A'
    );

    // Compute daily counts for events matching the most frequent city & venue combination
    const dailyLocationVenueCounts = labels.map(label =>
        eventsLast30.filter(event => {
            const d = new Date(event.eventDate);
            const key = `${event.eventLocation} ${event.venueType}`.toUpperCase();
            return (
                d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === label &&
                key === mostFrequentLocationVenue
            );
        }).length
    );

    // Compute daily average sustainability factor (for the trend card)
    const dailySustainabilityTrend = labels.map(label => {
        const eventsOnDay = eventsLast30.filter(event => {
            const d = new Date(event.eventDate);
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === label;
        });
        console.log(eventsLast30)
        if (eventsOnDay.length === 0) return null;
        const total = eventsOnDay.reduce((sum, event) => sum + event.sustainabilityFactor, 0);
        return Number((total / eventsOnDay.length).toFixed(1));

    });

    // Compute overall average sustainability factor for the period
    const sustainabilityValue =
        eventsLast30.length > 0
            ? Number(
                (
                    eventsLast30.reduce((sum, event) => sum + event.sustainabilityFactor, 0) /
                    eventsLast30.length
                ).toFixed(1)
            )
            : '-';

    // Prepare data for each StatCard
    const statCardsData = [
        {
            title: 'Number of events',
            value: totalEvents,
            interval: 'Last 30 days',
            trend: 'up',
            data: dailyEventCounts,
        },
        {
            title: 'Most frequent event location',
            value: mostFrequentLocationVenue,
            interval: 'Last 30 days',
            trend: 'down',
            data: dailyLocationVenueCounts,
        },
        {
            title: 'Trend regarding sustainability factor',
            value: sustainabilityValue,
            interval: 'Last 30 days',
            trend: 'neutral',
            data: dailySustainabilityTrend,
        },
    ];

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, textAlign: 'left' }}>
            {/* Overview cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Overview
            </Typography>
            <Grid container spacing={2} columns={12} sx={{ mb: theme => theme.spacing(2) }}>
                {statCardsData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
                        <StatCard {...card} />
                    </Grid>
                ))}
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <HighlightedCard userData={userData} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    {/* Pass the filtered events to the SessionsChart component */}
                    <SessionsChart events={eventsLast30} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <PageViewsBarChart />
                </Grid>
            </Grid>

            {/* Details section */}
            <Grid container spacing={2} columns={12} sx={{ justifyContent: 'flex-start' }}>
                <Grid size={{ xs: 12, lg: 9 }}>
                    <CustomizedDataGrid />
                </Grid>
                <Grid size={{ xs: 12, lg: 3 }}>
                    <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
                        <CustomizedTreeView />
                        <ChartUserByCountry />
                    </Stack>
                </Grid>
            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}
