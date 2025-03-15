import React, { useState } from 'react';
import {
    Container,
    Paper,
    Box,
    Tabs,
    Tab,
    Typography,
    Avatar,
    Card,
    CardContent,
    Divider,
    ListItemAvatar,
} from '@mui/material';
import { motion } from 'framer-motion';

const organizations = [
    { rank: 1, name: "Green Earth Org", score: 95, logo: "https://via.placeholder.com/40?text=GE" },
    { rank: 2, name: "Eco Warriors", score: 92, logo: "https://via.placeholder.com/40?text=EW" },
    { rank: 3, name: "Sustainable Future", score: 90, logo: "https://via.placeholder.com/40?text=SF" },
    { rank: 4, name: "Clean Air Initiative", score: 88, logo: "https://via.placeholder.com/40?text=CA" },
    { rank: 5, name: "Renewable Power", score: 85, logo: "https://via.placeholder.com/40?text=RP" },
];

const individuals = [
    { rank: 1, name: "Alice Johnson", score: 98, avatar: "https://via.placeholder.com/40?text=A" },
    { rank: 2, name: "Bob Smith", score: 96, avatar: "https://via.placeholder.com/40?text=B" },
    { rank: 3, name: "Carol Lee", score: 93, avatar: "https://via.placeholder.com/40?text=C" },
    { rank: 4, name: "David Kim", score: 90, avatar: "https://via.placeholder.com/40?text=D" },
    { rank: 5, name: "Emma Wilson", score: 88, avatar: "https://via.placeholder.com/40?text=E" },
];

const LeaderboardItem = ({ item, type }) => (
    <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
    >
        <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ width: 40, fontWeight: 'bold' }}>
                {item.rank}.
            </Typography>
            <ListItemAvatar>
                <Avatar src={type === 'org' ? item.logo : item.avatar} alt={item.name} />
            </ListItemAvatar>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Score: {item.score}
                </Typography>
            </CardContent>
        </Card>
    </motion.div>
);

const Leaderboard = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Renders a list of leaderboard items.
    const renderList = (data, type) => (
        <Box sx={{ mt: 3 }}>
            {data.map((item) => (
                <LeaderboardItem key={item.rank} item={item} type={type} />
            ))}
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper sx={{ p: 4, mb: 4, textAlign: 'center', background: 'linear-gradient(135deg, #e0f7fa, #e8f5e9)' }} elevation={3}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Sustainability Leaderboard
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Recognizing top organizations and individuals for their sustainable efforts.
                </Typography>
            </Paper>
            <Paper sx={{ p: 3 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    sx={{ mb: 2 }}
                >
                    <Tab label="Organizations" />
                    <Tab label="Individuals" />
                </Tabs>
                <Divider sx={{ mb: 3 }} />
                {tabValue === 0 && renderList(organizations, 'org')}
                {tabValue === 1 && renderList(individuals, 'ind')}
            </Paper>
        </Container>
    );
};

export default Leaderboard;
