import * as React from 'react';
import { Card, Typography, CircularProgress } from '@mui/material';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

const API_KEY = '671fdaa031def78f82865cfb3174d352';
const CITY = 'Timisoara';

export default function Weather() {
    const [weather, setWeather] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error fetching weather data');
                }
                return res.json();
            })
            .then((data) => {
                setWeather(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <CircularProgress size={24} />;
    }

    if (error) {
        return (
            <Typography color="error" variant="caption">
                Error fetching weather: {error.message}
            </Typography>
        );
    }

    return (
        <Card
            sx={{
                width: { xs: '100%', md: '20ch' },
                height: 36,
                display: 'flex',
                alignItems: 'center',
                px: 2,
            }}
        >
            <WbSunnyRoundedIcon sx={{ fontSize: '1.5rem', mr: 1 }} />
            <Typography variant="caption" sx={{ flexGrow: 1, textTransform: 'capitalize' }}>{weather.name}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {Math.round(weather.main.temp)}°C
            </Typography>
        </Card>
    );
}
