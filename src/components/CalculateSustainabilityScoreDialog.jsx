import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    InputAdornment,
    Stepper,
    Step,
    StepLabel,
    Box,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Typography,
    IconButton,
    Popover,
    Slider,
    Switch,
    FormControlLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    RadioGroup,
    FormControlLabel as RadioFormControlLabel,
    Radio,
    Autocomplete,
} from "@mui/material";
import { Calendar, MapPin, Info, ChevronDown } from "lucide-react";

// Steps for the multi‐step form.
const steps = [
    "Basic Information",
    "Event Details",
    "Sustainability Practices",
    "Review & Calculate",
];

// Predefined clusters for built‑in metrics.
const metricClusters = {
    energyConsumption: [
        { label: "Low (<300 kWh)", value: "low", bonus: 5 },
        { label: "Medium (300-700 kWh)", value: "medium", bonus: 3 },
        { label: "High (>700 kWh)", value: "high", bonus: 1 },
    ],
    renewableEnergyUsage: [
        { label: "High (>70%)", value: "high", bonus: 5 },
        { label: "Medium (40-70%)", value: "medium", bonus: 3 },
        { label: "Low (<40%)", value: "low", bonus: 1 },
    ],
    waterConsumption: [
        { label: "Low (<3000 liters)", value: "low", bonus: 5 },
        { label: "Medium (3000-7000 liters)", value: "medium", bonus: 3 },
        { label: "High (>7000 liters)", value: "high", bonus: 1 },
    ],
    wasteDiversion: [
        { label: "High (>80%)", value: "high", bonus: 5 },
        { label: "Medium (50-80%)", value: "medium", bonus: 3 },
        { label: "Low (<50%)", value: "low", bonus: 1 },
    ],
    recyclingRate: [
        { label: "High (>80%)", value: "high", bonus: 5 },
        { label: "Medium (50-80%)", value: "medium", bonus: 3 },
        { label: "Low (<50%)", value: "low", bonus: 1 },
    ],
    foodWaste: [
        { label: "Low (<50 kg)", value: "low", bonus: 5 },
        { label: "Medium (50-150 kg)", value: "medium", bonus: 3 },
        { label: "High (>150 kg)", value: "high", bonus: 1 },
    ],
    transportationEmissions: [
        { label: "Low (<100 kg CO₂)", value: "low", bonus: 5 },
        { label: "Medium (100-300 kg CO₂)", value: "medium", bonus: 3 },
        { label: "High (>300 kg CO₂)", value: "high", bonus: 1 },
    ],
    carbonOffsetting: [
        { label: "High (>50%)", value: "high", bonus: 5 },
        { label: "Medium (20-50%)", value: "medium", bonus: 3 },
        { label: "Low (<20%)", value: "low", bonus: 1 },
    ],
    localSourcing: [
        { label: "High (>70%)", value: "high", bonus: 5 },
        { label: "Medium (40-70%)", value: "medium", bonus: 3 },
        { label: "Low (<40%)", value: "low", bonus: 1 },
    ],
    greenProcurement: [
        { label: "Excellent (9-10)", value: "excellent", bonus: 5 },
        { label: "Good (6-8)", value: "good", bonus: 3 },
        { label: "Poor (0-5)", value: "poor", bonus: 1 },
    ],
};

// InfoPopover component: clickable info icon.
const InfoPopover = ({ infoText }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    return (
        <>
            <IconButton size="small" onClick={handleClick}>
                <Info style={{ width: 16, height: 16 }} />
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
                <Box sx={{ p: 2, maxWidth: 300 }}>
                    <Typography variant="body2">{infoText}</Typography>
                </Box>
            </Popover>
        </>
    );
};

// LabeledField component.
const LabeledField = ({ label, infoText }) => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle1" sx={{ mr: 0.5 }}>
            {label}
        </Typography>
        <InfoPopover infoText={infoText} />
    </Box>
);

// Reusable MetricInput component for built-in metrics.
const MetricInput = ({
                         metricKey,
                         label,
                         infoText,
                         sliderMin,
                         sliderMax,
                         metricState,
                         onMetricChange,
                         clusters,
                     }) => {
    const handleModeChange = (e) => {
        onMetricChange(metricKey, { ...metricState, mode: e.target.value });
    };

    const handleCustomChange = (e, value) => {
        onMetricChange(metricKey, { ...metricState, custom: value });
    };

    const handleClusterChange = (e) => {
        onMetricChange(metricKey, { ...metricState, cluster: e.target.value });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <LabeledField
                label={label}
                infoText={infoText}
            />
            <RadioGroup
                row
                value={metricState.mode}
                onChange={handleModeChange}
                sx={{ mb: 1 }}
            >
                <RadioFormControlLabel
                    value="custom"
                    control={<Radio />}
                    label="Custom"
                />
                <RadioFormControlLabel
                    value="cluster"
                    control={<Radio />}
                    label="Group"
                />
            </RadioGroup>
            {/* Friendly description about each mode */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="caption">
                    Choose Numeric if you can provide a measurable value; choose Group to select a predefined range.
                </Typography>
            </Box>
            {metricState.mode === "custom" ? (
                <Slider
                    value={metricState.custom}
                    onChange={handleCustomChange}
                    min={sliderMin}
                    max={sliderMax}
                    valueLabelDisplay="auto"
                />
            ) : (
                <FormControl fullWidth>
                    <InputLabel>Group</InputLabel>
                    <Select value={metricState.cluster} onChange={handleClusterChange}>
                        {clusters.map((option, idx) => (
                            <MenuItem key={idx} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </Box>
    );
};

// Reusable CustomMetricInput component for extra metrics.
const CustomMetricInput = ({ metric, onChange }) => {
    const handleTypeChange = (e) => {
        onChange({ ...metric, type: e.target.value });
    };

    const handleNumericChange = (e, value) => {
        onChange({ ...metric, numericValue: value });
    };

    const handleTextChange = (e) => {
        onChange({ ...metric, textValue: e.target.value });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <TextField
                label="Metric Label"
                variant="outlined"
                fullWidth
                margin="normal"
                value={metric.label}
                onChange={(e) => onChange({ ...metric, label: e.target.value })}
            />
            <RadioGroup
                row
                value={metric.type}
                onChange={handleTypeChange}
                sx={{ mb: 1 }}
            >
                <RadioFormControlLabel
                    value="numeric"
                    control={<Radio />}
                    label="Numeric"
                />
                <RadioFormControlLabel
                    value="text"
                    control={<Radio />}
                    label="Text"
                />
            </RadioGroup>
            {/* Friendly tooltip for custom metric types */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="caption">
                    Numeric: Provide a measurable number (e.g., 75). Text: Describe your sustainable strategy (e.g., "We use local suppliers and renewable energy").
                </Typography>
            </Box>
            {metric.type === "numeric" ? (
                <Slider
                    value={metric.numericValue}
                    onChange={handleNumericChange}
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                />
            ) : (
                <TextField
                    label="Describe Sustainable Strategy"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={metric.textValue}
                    onChange={handleTextChange}
                />
            )}
        </Box>
    );
};

const CalculateSustainabilityScoreDialog = ({ isOpen, onClose }) => {
    // Basic info state.
    const [formData, setFormData] = useState({
        eventName: "My Event",
        eventDate: "",
        eventLocation: "",
        estimatedAttendees: 100,
        venueType: "",
        sustainableCatering: true,
        digitalIntegration: true,
    });

    // Built-in metric inputs state.
    const [metricInputs, setMetricInputs] = useState({
        energyConsumption: { mode: "custom", custom: 500, cluster: "" },
        renewableEnergyUsage: { mode: "custom", custom: 50, cluster: "" },
        waterConsumption: { mode: "custom", custom: 5000, cluster: "" },
        wasteDiversion: { mode: "custom", custom: 50, cluster: "" },
        recyclingRate: { mode: "custom", custom: 50, cluster: "" },
        foodWaste: { mode: "custom", custom: 100, cluster: "" },
        transportationEmissions: { mode: "custom", custom: 250, cluster: "" },
        carbonOffsetting: { mode: "custom", custom: 0, cluster: "" },
        localSourcing: { mode: "custom", custom: 0, cluster: "" },
        greenProcurement: { mode: "custom", custom: 5, cluster: "" },
    });

    // Custom metrics state.
    const [customMetrics, setCustomMetrics] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [calculatedScore, setCalculatedScore] = useState(null);

    // For location autocomplete, we simulate fetching suggestions.
    const [locationOptions, setLocationOptions] = useState([]);
    const [locationInput, setLocationInput] = useState("");

    // Dummy effect: In a real app, replace with API call.
    useEffect(() => {
        const dummyLocations = [
            "New York, NY",
            "Los Angeles, CA",
            "Chicago, IL",
            "Houston, TX",
            "Phoenix, AZ",
            "Philadelphia, PA",
        ];
        const filtered = dummyLocations.filter((loc) =>
            loc.toLowerCase().includes(locationInput.toLowerCase())
        );
        setLocationOptions(filtered);
    }, [locationInput]);

    // Update basic info.
    const handleFormChange = (name, value) =>
        setFormData((prev) => ({ ...prev, [name]: value }));

    // Update built-in metric state.
    const handleMetricChange = (metricKey, newValue) => {
        setMetricInputs((prev) => ({ ...prev, [metricKey]: newValue }));
    };

    // Add a new custom metric.
    const addCustomMetric = () => {
        setCustomMetrics([
            ...customMetrics,
            {
                id: Date.now(),
                label: "Custom Metric",
                type: "numeric", // default type
                numericValue: 50,
                textValue: "",
            },
        ]);
    };

    // Compute score for a built-in metric.
    // reverse=true means lower is better.
    const getMetricScore = (metricKey, maxValue, reverse = true) => {
        const metric = metricInputs[metricKey];
        if (metric.mode === "custom") {
            return reverse
                ? ((maxValue - metric.custom) / maxValue) * 5
                : (metric.custom / maxValue) * 5;
        } else {
            const clustersForMetric = metricClusters[metricKey] || [];
            const selected = clustersForMetric.find(
                (opt) => opt.value === metric.cluster
            );
            return selected ? selected.bonus : 0;
        }
    };

    // Calculate overall sustainability score.
    const calculateScore = () => {
        const maxValues = {
            energyConsumption: 1000,
            renewableEnergyUsage: 100,
            waterConsumption: 10000,
            wasteDiversion: 100,
            recyclingRate: 100,
            foodWaste: 200,
            transportationEmissions: 500,
            carbonOffsetting: 100,
            localSourcing: 100,
            greenProcurement: 10,
        };

        const energyScore = getMetricScore("energyConsumption", maxValues.energyConsumption, true);
        const renewableScore = getMetricScore("renewableEnergyUsage", maxValues.renewableEnergyUsage, false);
        const waterScore = getMetricScore("waterConsumption", maxValues.waterConsumption, true);
        const wasteScore = getMetricScore("wasteDiversion", maxValues.wasteDiversion, false);
        const recyclingScore = getMetricScore("recyclingRate", maxValues.recyclingRate, false);
        const foodWasteScore = getMetricScore("foodWaste", maxValues.foodWaste, true);
        const transportScore = getMetricScore("transportationEmissions", maxValues.transportationEmissions, true);
        const carbonScore = getMetricScore("carbonOffsetting", maxValues.carbonOffsetting, false);
        const localScore = getMetricScore("localSourcing", maxValues.localSourcing, false);
        const procurementScore = getMetricScore("greenProcurement", maxValues.greenProcurement, false);

        const fixedScore =
            energyScore +
            renewableScore +
            waterScore +
            wasteScore +
            recyclingScore +
            foodWasteScore +
            transportScore +
            carbonScore +
            localScore +
            procurementScore;

        // For extra custom metrics: if type numeric, use normalized value; if text, add fixed bonus of 2 if non-empty.
        const customMetricsScore = customMetrics.reduce((acc, metric) => {
            if (metric.type === "numeric") {
                return acc + ((parseFloat(metric.numericValue) / 100) * 5);
            } else {
                return acc + (metric.textValue.trim() !== "" ? 2 : 0);
            }
        }, 0);

        // Fixed metrics maximum: 10 metrics * 5 = 50.
        const maxPoints = 50 + customMetrics.length * 5;
        const totalScore = ((fixedScore + customMetricsScore) / maxPoints) * 10;
        return Math.min(Math.max(totalScore, 0), 10).toFixed(1);
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            const score = calculateScore();
            setCalculatedScore(score);
        } else {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    // Render step content.
    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box component="form" sx={{ mt: 2 }} noValidate autoComplete="off">
                        <TextField
                            label="Event Name"
                            name="eventName"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.eventName}
                            onChange={(e) => handleFormChange("eventName", e.target.value)}
                        />
                        <TextField
                            label="Event Date"
                            name="eventDate"
                            type="date"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            value={formData.eventDate}
                            onChange={(e) => handleFormChange("eventDate", e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Calendar style={{ color: "#757575" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Autocomplete
                            freeSolo
                            options={locationOptions}
                            inputValue={locationInput}
                            onInputChange={(e, newInputValue) => setLocationInput(newInputValue)}
                            onChange={(e, newValue) =>
                                handleFormChange("eventLocation", newValue || "")
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Event Location"
                                    variant="outlined"
                                    margin="normal"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MapPin style={{ color: "#757575" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Box>
                );
            case 1:
                return (
                    <Box component="form" sx={{ mt: 2 }} noValidate autoComplete="off">
                        <Typography gutterBottom>Estimated Attendees</Typography>
                        <Slider
                            value={formData.estimatedAttendees}
                            onChange={(e, val) => handleFormChange("estimatedAttendees", val)}
                            min={1}
                            max={1000}
                            valueLabelDisplay="auto"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="venue-type-label">Venue Type</InputLabel>
                            <Select
                                labelId="venue-type-label"
                                label="Venue Type"
                                name="venueType"
                                value={formData.venueType}
                                onChange={(e) => handleFormChange("venueType", e.target.value)}
                            >
                                <MenuItem value="Indoor">Indoor</MenuItem>
                                <MenuItem value="Outdoor">Outdoor</MenuItem>
                                <MenuItem value="Virtual">Virtual</MenuItem>
                                <MenuItem value="Hybrid">Hybrid</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                );
            case 2:
                return (
                    <Box sx={{ mt: 2 }}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ChevronDown />}>
                                <Typography variant="subtitle1">Resource Usage</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <MetricInput
                                    metricKey="energyConsumption"
                                    label="Energy Consumption (kWh)"
                                    infoText="Estimate energy usage from equipment and duration using past bills or venue estimates."
                                    sliderMin={0}
                                    sliderMax={1000}
                                    metricState={metricInputs.energyConsumption}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.energyConsumption}
                                />
                                <MetricInput
                                    metricKey="renewableEnergyUsage"
                                    label="Renewable Energy Usage (%)"
                                    infoText="Percentage of energy from renewables. Check your provider’s breakdown."
                                    sliderMin={0}
                                    sliderMax={100}
                                    metricState={metricInputs.renewableEnergyUsage}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.renewableEnergyUsage}
                                />
                                <MetricInput
                                    metricKey="waterConsumption"
                                    label="Water Consumption (liters)"
                                    infoText="Estimate water usage from catering and operations using vendor estimates."
                                    sliderMin={0}
                                    sliderMax={10000}
                                    metricState={metricInputs.waterConsumption}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.waterConsumption}
                                />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ChevronDown />}>
                                <Typography variant="subtitle1">Waste Management</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <MetricInput
                                    metricKey="wasteDiversion"
                                    label="Waste Diversion (%)"
                                    infoText="Percentage of waste diverted from landfills."
                                    sliderMin={0}
                                    sliderMax={100}
                                    metricState={metricInputs.wasteDiversion}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.wasteDiversion}
                                />
                                <MetricInput
                                    metricKey="recyclingRate"
                                    label="Recycling Rate (%)"
                                    infoText="Percentage of waste recycled."
                                    sliderMin={0}
                                    sliderMax={100}
                                    metricState={metricInputs.recyclingRate}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.recyclingRate}
                                />
                                <MetricInput
                                    metricKey="foodWaste"
                                    label="Food Waste (kg)"
                                    infoText="Total food waste from catering."
                                    sliderMin={0}
                                    sliderMax={200}
                                    metricState={metricInputs.foodWaste}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.foodWaste}
                                />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ChevronDown />}>
                                <Typography variant="subtitle1">
                                    Transport & Offsetting
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <MetricInput
                                    metricKey="transportationEmissions"
                                    label="Transportation Emissions (kg CO₂)"
                                    infoText="Estimate emissions from travel."
                                    sliderMin={0}
                                    sliderMax={500}
                                    metricState={metricInputs.transportationEmissions}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.transportationEmissions}
                                />
                                <MetricInput
                                    metricKey="carbonOffsetting"
                                    label="Carbon Offsetting (%)"
                                    infoText="Percentage of budget for carbon offsetting."
                                    sliderMin={0}
                                    sliderMax={100}
                                    metricState={metricInputs.carbonOffsetting}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.carbonOffsetting}
                                />
                                <MetricInput
                                    metricKey="localSourcing"
                                    label="Local Sourcing (%)"
                                    infoText="Percentage of goods/services sourced locally."
                                    sliderMin={0}
                                    sliderMax={100}
                                    metricState={metricInputs.localSourcing}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.localSourcing}
                                />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ChevronDown />}>
                                <Typography variant="subtitle1">Operational Practices</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.sustainableCatering}
                                            onChange={(e) =>
                                                handleFormChange("sustainableCatering", e.target.checked)
                                            }
                                        />
                                    }
                                    label={
                                        <LabeledField
                                            label="Sustainable Catering"
                                            infoText="Toggle if catering follows sustainable practices."
                                        />
                                    }
                                />
                                <MetricInput
                                    metricKey="greenProcurement"
                                    label="Green Procurement (0-10)"
                                    infoText="Rate procurement on sustainability (0=poor, 10=excellent)."
                                    sliderMin={0}
                                    sliderMax={10}
                                    metricState={metricInputs.greenProcurement}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.greenProcurement}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.digitalIntegration}
                                            onChange={(e) =>
                                                handleFormChange("digitalIntegration", e.target.checked)
                                            }
                                        />
                                    }
                                    label={
                                        <LabeledField
                                            label="Digital Integration"
                                            infoText="Toggle if digital tools minimize paper usage."
                                        />
                                    }
                                />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ChevronDown />}>
                                <Typography variant="subtitle1">Custom Metrics</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {customMetrics.map((metric, index) => (
                                    <CustomMetricInput
                                        key={metric.id}
                                        metric={metric}
                                        onChange={(newMetric) => {
                                            const newMetrics = [...customMetrics];
                                            newMetrics[index] = newMetric;
                                            setCustomMetrics(newMetrics);
                                        }}
                                    />
                                ))}
                                <Button variant="outlined" onClick={addCustomMetric}>
                                    Add Custom Metric
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                );
            case 3:
                return (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Review Your Event Details
                        </Typography>
                        <Typography variant="body1">
                            <strong>Event Name:</strong> {formData.eventName}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Date:</strong> {formData.eventDate}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Location:</strong> {formData.eventLocation}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Estimated Attendees:</strong> {formData.estimatedAttendees}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Venue Type:</strong> {formData.venueType}
                        </Typography>
                        {Object.entries(metricInputs).map(([key, value]) => (
                            <Typography key={key} variant="body1">
                                <strong>{key}:</strong>{" "}
                                {value.mode === "custom"
                                    ? `${value.custom}`
                                    : `Group: ${value.cluster}`}
                            </Typography>
                        ))}
                        <Typography variant="body1">
                            <strong>Sustainable Catering:</strong>{" "}
                            {formData.sustainableCatering ? "Yes" : "No"}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Digital Integration:</strong>{" "}
                            {formData.digitalIntegration ? "Yes" : "No"}
                        </Typography>
                        {customMetrics.length > 0 && (
                            <>
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Custom Metrics
                                </Typography>
                                {customMetrics.map((metric) => (
                                    <Box key={metric.id} sx={{ mb: 1 }}>
                                        <Typography variant="body1">
                                            <strong>{metric.label}:</strong>{" "}
                                            {metric.type === "numeric"
                                                ? `${metric.numericValue}`
                                                : metric.textValue}
                                        </Typography>
                                    </Box>
                                ))}
                            </>
                        )}
                        {calculatedScore && (
                            <Typography variant="h6" sx={{ mt: 2, color: "green" }}>
                                Sustainability Score: {calculatedScore} / 10
                            </Typography>
                        )}
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Calculate Sustainability Score</DialogTitle>
            <DialogContent dividers>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {renderStepContent(activeStep)}
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                </Button>
                <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Calculate Score" : "Next"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CalculateSustainabilityScoreDialog;
