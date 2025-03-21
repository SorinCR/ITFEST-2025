import * as React from 'react';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../components/AppNavbar';
import Header from '../components/Header';
import MainGrid from '../components/MainGrid';
import SideMenu from '../components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import EventCard from '../components/EventCard';
import Grid from '@mui/material/Grid';
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from '../components/themes/customizations';

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

import { useParams } from "react-router"

export default function Dashboard(props) {

    const { eventId } = useParams();

    const [userData, setUserData] = React.useState({});
    const [page, setPage] = React.useState("Home");
    const [events, setEvents] = React.useState([]);
    const [selectedEvent, selectEvent] = React.useState({});

    React.useEffect(() => {
        if(!localStorage.getItem("token")) {
            return window.location.href = "/login";
        }

        if(eventId) {
            setPage("Event")
            console.log(eventId)
            fetch("http://194.102.62.226:5000/get_event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    eventId: eventId
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.event);
                    selectEvent(data.event);
                })
                .catch((error) => console.error);
        }

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
                if (!data.success) {
                    return window.location.href = "/login";
                }
                setUserData(data.user);
                console.log(data);
            })
            .catch((error) => console.error(error))
    }, []);

    React.useEffect(() => {
        fetch("http://194.102.62.226:5000/get_events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: localStorage.getItem("email")
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.events);
                setEvents(data.events);
            })
            .catch((error) => console.error);
    }, [])

    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu userData={userData} setPage={setPage} page={page}/>
                <AppNavbar />
                
                {/* Main content */}
                {page == "Home" ? <><Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        backgroundColor: "rgba(200, 230, 201, 0.2)", // Even more faded green
                        overflow: 'auto',
                    }}
                >

                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Header />
                        <MainGrid userData={userData} events={events}/>
                    </Stack>
                </Box></>: <></>}
                {page == "Past events" ? <><Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        backgroundColor: "rgba(200, 230, 201, 0.2)", // Even more faded green
                        overflow: 'auto',
                    }}
                >
                    <Header page={page}/>
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Grid container
                            spacing={2}
                            columns={12}
                            sx={{ mb: (theme) => theme.spacing(2) }}
                        >
                            {events.map((event) => (
                                <div style={{'margin-right': '20px', 'margin-bottom': '10px', 'margin-top': '10px'}}><EventCard event={event}/></div>
                            ))}
                        </Grid>
                    </Stack>
                </Box></> : <></>}
                {page == "Event" ? <Box component="main"
                    sx={{
                        flexGrow: 1,
                        backgroundColor: "rgba(200, 230, 201, 0.2)", // Even more faded green
                        overflow: 'auto',
                    }}>
                    <Header page={page}/>
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <img src='https://picsum.photos/200/300' width={"200px"} height={"300px"}></img>
                        <div style={{"width": "100%", "height": "100%", "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column"}}>
                            <h1>{selectedEvent.eventName}</h1>
                            {Object.keys(selectedEvent).map((key) => {
                                if(key != "_id")
                                    return <div>
                                        <h2>{key}</h2>
                                        <p>{selectedEvent[key].toString()}</p>
                                    </div>
                                }
                            )}
                        </div>
                    </Stack>
                </Box>: <></>}
            </Box>
        </AppTheme>
    );
}