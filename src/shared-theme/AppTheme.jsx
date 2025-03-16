import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

import { inputsCustomizations } from '../components/customizations/inputs.jsx';
import { dataDisplayCustomizations } from '../components/customizations/dataDisplay';
import { feedbackCustomizations } from '../components/customizations/feedback';
import { navigationCustomizations } from '../components/customizations/navigation';
import { surfacesCustomizations } from '../components/customizations/surfaces';
import { colorSchemes, typography, shadows, shape } from './themePrimitives';

function AppTheme(props) {
    const { children, disableCustomTheme, themeComponents } = props;
    const theme = React.useMemo(() => {
        return disableCustomTheme
            ? {}
            : createTheme({
                // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
                cssVariables: {
                    colorSchemeSelector: 'data-mui-color-scheme',
                    cssVarPrefix: 'template',
                },
                colorSchemes, // For building light & dark mode apps
                typography,
                shadows,
                shape,
                components: {
                    ...inputsCustomizations,
                    ...dataDisplayCustomizations,
                    ...feedbackCustomizations,
                    ...navigationCustomizations,
                    ...surfacesCustomizations,
                    ...themeComponents,
                },
            });
    }, [disableCustomTheme, themeComponents]);

    if (disableCustomTheme) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    return (
        <ThemeProvider theme={theme} disableTransitionOnChange>
            {/* GlobalStyles applies a gradient background based on the current mode */}
            <GlobalStyles
                styles={(theme) => ({
                    body: {
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #101A10 0%, #3A403A 50%, #262B28 100%)'
                            : 'linear-gradient(135deg, #C8E6C9 0%, #81C784 100%)',
                        minHeight: '100vh',
                    },
                })}
            />
            {children}
        </ThemeProvider>
    );
}

AppTheme.propTypes = {
    children: PropTypes.node,
    /**
     * This is for the docs site. You can ignore it or remove it.
     */
    disableCustomTheme: PropTypes.bool,
    themeComponents: PropTypes.object,
};

export default AppTheme;
