import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

function AreaGradient({ color, id }) {
    return (
        <defs>
            <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
        </defs>
    );
}

AreaGradient.propTypes = {
    color: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default function SessionsChart({ events }) {
    const theme = useTheme();
    // console.log(events);
    // Create an array of last 30 days labels (e.g., "Mar 16")
    const getLast30DaysLabels = () => {
        const labels = [];
        const now = new Date();
        for (let i = 29; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(now.getDate() - i);
            labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }
        return labels;
    };

    const labels = getLast30DaysLabels();

    // Define time range (last 30 days)
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    // Filter events for the last 30 days
    const eventsLast30 = events.filter(event => {
        const eventDate = new Date(event.eventDate);
        return eventDate >= thirtyDaysAgo && eventDate <= now;
    });


    // Mapping string values to numbers for the metrics
    const energyMapping = { low: 1, medium: 2, high: 3 };
    const carbonMapping = { no: 0, low: 1, medium: 2, high: 3 };
    const transportMapping = { low: 1, medium: 2, high: 3 };

    // Compute daily averages for a given metric (using the provided mapping)
    const computeDailySeries = (mapping, key) =>
        labels.map(label => {
            const eventsOnDay = eventsLast30.filter(event => {
                const d = new Date(event.eventDate);
                return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === label;
            });

            if (eventsOnDay.length === 0) return null;
            const total = eventsOnDay.reduce((sum, event) => sum + (mapping[event[key]] || 0), 0);
            return eventsOnDay.length === 0 ? null : Number((total / eventsOnDay.length).toFixed(2));
        });

    let dailyEnergy = computeDailySeries(energyMapping, 'energyConsumption').map(value => value === null ? 0 : value);
    let dailyCarbon = computeDailySeries(carbonMapping, 'carbonOffsetting').map(value => value === null ? 0 : value);
    let dailyTransport = computeDailySeries(transportMapping, 'transportationEmissions').map(value => value === null ? 0 : value);

    

    // console.log(dailyCarbon, dailyEnergy, dailyTransport);

    // Compute the most frequent city and venue type combination (displayed in the header)
    const locationVenueCounts = eventsLast30.reduce((acc, event) => {
        const key = `${event.eventLocation} (${event.venueType})`.toUpperCase();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    const mostFrequentLocationVenue =
        Object.keys(locationVenueCounts).reduce(
            (a, b) => (locationVenueCounts[a] > locationVenueCounts[b] ? a : b),
            'N/A'
        );

    const colorPalette = [
        theme.palette.primary.light,
        theme.palette.primary.main,
        theme.palette.primary.dark,
    ];

    // console.log(dailyCarbon, dailyEnergy, dailyTransport);

    return (
        <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    Sessions
                </Typography>
                <Stack sx={{ justifyContent: 'space-between', mb: 2 }}>
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
                        <Typography variant="h4" component="p">
                            {mostFrequentLocationVenue}
                        </Typography>
                        <Chip size="small" color="success" label="Last 30 days" />
                    </Stack>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Energy Consumption, Carbon Offsetting &amp; Transportation Emissions
                    </Typography>
                </Stack>
                <LineChart
                    colors={colorPalette}
                    xAxis={[
                        {
                            scaleType: 'point',
                            data: labels,
                            tickInterval: (index, i) => (i + 1) % 5 === 0,
                        },
                    ]}
                    series={[
                        {
                            id: 'energy',
                            label: 'Energy Consumption',
                            showMark: false,
                            curve: 'linear',
                            area: true,
                            stack: 'total',
                            stackOrder: 'ascending',
                            data: dailyEnergy,
                        },
                        {
                            id: 'carbon',
                            label: 'Carbon Offsetting',
                            showMark: false,
                            curve: 'linear',
                            area: true,
                            stack: 'total',
                            stackOrder: 'ascending',
                            data: dailyCarbon,
                        },
                        {
                            id: 'transport',
                            label: 'Transportation Emissions',
                            showMark: false,
                            curve: 'linear',
                            area: true,
                            stack: 'total',
                            stackOrder: 'ascending',
                            data: dailyTransport,
                        },
                    ]}
                    height={250}
                    margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
                    grid={{ horizontal: true }}
                    sx={{
                        '& .MuiAreaElement-series-energy': { fill: "url('#energy')" },
                        '& .MuiAreaElement-series-carbon': { fill: "url('#carbon')" },
                        '& .MuiAreaElement-series-transport': { fill: "url('#transport')" },
                    }}
                    slotProps={{ legend: { hidden: true } }}
                >
                    <AreaGradient color={theme.palette.primary.dark} id="energy" />
                    <AreaGradient color={theme.palette.primary.main} id="carbon" />
                    <AreaGradient color={theme.palette.primary.light} id="transport" />
                </LineChart>
            </CardContent>
        </Card>
    );
}

SessionsChart.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            eventDate: PropTypes.string.isRequired,
            eventLocation: PropTypes.string.isRequired,
            venueType: PropTypes.string.isRequired,
            energyConsumption: PropTypes.string.isRequired,
            carbonOffsetting: PropTypes.string.isRequired,
            transportationEmissions: PropTypes.string.isRequired,
        })
    ),
};
