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

export default function Dashboard(props) {

    const [userData, setUserData] = React.useState({});
    const [page, setPage] = React.useState("home");

    React.useEffect(() => {
        if(!localStorage.getItem("token")) {
            return window.location.href = "/login";
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

    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu userData={userData} setPage={setPage}/>
                <AppNavbar />
                
                {/* Main content */}
                {page == "home" ? <><Box
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
                        <MainGrid userData={userData}/>
                    </Stack>
                </Box></>: <></>}
                {page == "events" ? <><Box
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
                        {/* <Header /> */}
                        {/* <MainGrid userData={userData}/> */}
                    </Stack>
                </Box></> : <></>}
            </Box>
        </AppTheme>
    );
}