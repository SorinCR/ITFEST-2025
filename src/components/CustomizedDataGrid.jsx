import * as React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ButtonField(props) {
    const {
        setOpen,
        label,
        id,
        disabled,
        InputProps: { ref } = {},
        inputProps: { 'aria-label': ariaLabel } = {},
    } = props;

    return (
        <Button
            variant="outlined"
            id={id}
            disabled={disabled}
            ref={ref}
            aria-label={ariaLabel}
            size="small"
            onClick={() => setOpen?.((prev) => !prev)}
            startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
            sx={{ minWidth: 'fit-content' }}
        >
            {label ? `${label}` : 'Pick a date'}
        </Button>
    );
}

ButtonField.propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    inputProps: PropTypes.shape({
        'aria-label': PropTypes.string,
    }),
    InputProps: PropTypes.shape({
        endAdornment: PropTypes.node,
        startAdornment: PropTypes.node,
    }),
    label: PropTypes.node,
    setOpen: PropTypes.func,
};

export default function CustomDatePicker() {
    const [value, setValue] = React.useState(dayjs('2023-04-17'));
    const [open, setOpen] = React.useState(false);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                }}
            >
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                    Measuring impact, making events matter...🌱
                </Typography>
            </Box>

        </LocalizationProvider>
    );
}
