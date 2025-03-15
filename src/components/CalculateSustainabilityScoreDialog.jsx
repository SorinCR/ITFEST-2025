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
    Checkbox,
    Autocomplete,
} from "@mui/material";
import { Calendar, MapPin, Info, ChevronDown } from "lucide-react";

// Updated steps.
const steps = [
    "Event Overview",
    "Sustainability & Environmental Impact",
    "Governance, Digital & Data Collection",
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
            <LabeledField label={label} infoText={infoText} />
            <RadioGroup
                row
                value={metricState.mode}
                onChange={handleModeChange}
                sx={{ mb: 1 }}
            >
                <RadioFormControlLabel value="custom" control={<Radio />} label="Custom" />
                <RadioFormControlLabel value="cluster" control={<Radio />} label="Group" />
            </RadioGroup>
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
            <RadioGroup row value={metric.type} onChange={handleTypeChange} sx={{ mb: 1 }}>
                <RadioFormControlLabel value="numeric" control={<Radio />} label="Numeric" />
                <RadioFormControlLabel value="text" control={<Radio />} label="Text" />
            </RadioGroup>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="caption">
                    Numeric: Provide a measurable number (e.g., 75). Text: Describe your sustainable strategy.
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
    // Updated form data state to include new questionnaire fields (Section 1).
    const [formData, setFormData] = useState({
        eventName: "My Event",
        eventDate: "",
        eventLocation: "",
        // New fields from Section 1:
        approximateAttendees: "",
        eventDuration: "",
        eventLocationType: "",
        eventTiming: "",
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

    // New state for Environmental Impact questionnaire (Section 2).
    const [envImpact, setEnvImpact] = useState({
        energySource: "",
        energyEfficientPractices: [],
        transportationMode: "",
        transportationMeasures: [],
        wasteManagementPractices: [],
        waterManagement: "",
        sustainableMaterials: "",
    });

    // New state for Governance & Digital Data (Sections 3 & 4).
    const [governanceData, setGovernanceData] = useState({
        sustainabilityPolicy: "",
        sustainabilityReporting: "",
        vendorEvaluation: "",
        independentAudit: "",
        digitalPractices: "",
        dataCollection: "",
        performanceReviewFrequency: "",
    });

    const [activeStep, setActiveStep] = useState(0);
    const [calculatedScore, setCalculatedScore] = useState(null);

    // For location autocomplete, we simulate fetching suggestions.
    const [locationOptions, setLocationOptions] = useState([]);
    const [locationInput, setLocationInput] = useState("");

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

    // Update basic form data.
    const handleFormChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Update built-in metric state.
    const handleMetricChange = (metricKey, newValue) => {
        setMetricInputs((prev) => ({ ...prev, [metricKey]: newValue }));
    };

    // Update Environmental Impact state.
    const handleEnvImpactChange = (name, value) => {
        setEnvImpact((prev) => ({ ...prev, [name]: value }));
    };

    // For checkboxes in envImpact (multi select)
    const handleEnvImpactCheckboxChange = (name, option) => {
        setEnvImpact((prev) => {
            const current = prev[name] || [];
            if (current.includes(option)) {
                return { ...prev, [name]: current.filter((item) => item !== option) };
            } else {
                return { ...prev, [name]: [...current, option] };
            }
        });
    };

    // Update Governance Data state.
    const handleGovernanceChange = (name, value) => {
        setGovernanceData((prev) => ({ ...prev, [name]: value }));
    };

    // Add a new custom metric.
    const addCustomMetric = () => {
        setCustomMetrics([
            ...customMetrics,
            {
                id: Date.now(),
                label: "Custom Metric",
                type: "numeric",
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
            const selected = clustersForMetric.find((opt) => opt.value === metric.cluster);
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

    // Render content for each step.
    const renderStepContent = (step) => {
        switch (step) {
            // Step 0: Event Overview (Basic info + Section 1 Questionnaire)
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
                            onChange={(e, newValue) => handleFormChange("eventLocation", newValue || "")}
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
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1">Approximate Number of Attendees</Typography>
                            <RadioGroup
                                value={formData.approximateAttendees}
                                onChange={(e) =>
                                    handleFormChange("approximateAttendees", e.target.value)
                                }
                            >
                                <RadioFormControlLabel
                                    value="lessThan50"
                                    control={<Radio />}
                                    label="Less than 50"
                                />
                                <RadioFormControlLabel
                                    value="50-200"
                                    control={<Radio />}
                                    label="50 – 200"
                                />
                                <RadioFormControlLabel
                                    value="200-1000"
                                    control={<Radio />}
                                    label="200 – 1,000"
                                />
                                <RadioFormControlLabel
                                    value="moreThan1000"
                                    control={<Radio />}
                                    label="More than 1,000"
                                />
                            </RadioGroup>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1">Event Duration</Typography>
                            <RadioGroup
                                value={formData.eventDuration}
                                onChange={(e) => handleFormChange("eventDuration", e.target.value)}
                            >
                                <RadioFormControlLabel
                                    value="fewHours"
                                    control={<Radio />}
                                    label="A few hours"
                                />
                                <RadioFormControlLabel
                                    value="oneDay"
                                    control={<Radio />}
                                    label="One full day"
                                />
                                <RadioFormControlLabel
                                    value="multipleDays"
                                    control={<Radio />}
                                    label="Multiple days"
                                />
                                <RadioFormControlLabel
                                    value="overAWeek"
                                    control={<Radio />}
                                    label="Over a week"
                                />
                            </RadioGroup>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1">Where is the event held?</Typography>
                            <RadioGroup
                                value={formData.eventLocationType}
                                onChange={(e) =>
                                    handleFormChange("eventLocationType", e.target.value)
                                }
                            >
                                <RadioFormControlLabel
                                    value="fullyOutdoor"
                                    control={<Radio />}
                                    label="Fully outdoor"
                                />
                                <RadioFormControlLabel
                                    value="fullyIndoor"
                                    control={<Radio />}
                                    label="Fully indoor"
                                />
                                <RadioFormControlLabel
                                    value="mixed"
                                    control={<Radio />}
                                    label="Mixed (indoor/outdoor)"
                                />
                            </RadioGroup>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1">
                                How is the event timed in relation to natural light?
                            </Typography>
                            <RadioGroup
                                value={formData.eventTiming}
                                onChange={(e) => handleFormChange("eventTiming", e.target.value)}
                            >
                                <RadioFormControlLabel
                                    value="daylight"
                                    control={<Radio />}
                                    label="During daylight hours"
                                />
                                <RadioFormControlLabel
                                    value="night"
                                    control={<Radio />}
                                    label="At night"
                                />
                                <RadioFormControlLabel
                                    value="mixed"
                                    control={<Radio />}
                                    label="Mixed"
                                />
                            </RadioGroup>
                        </Box>
                        <FormControl fullWidth margin="normal" sx={{ mt: 2 }}>
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
            // Step 1: Sustainability & Environmental Impact (Built‑in metrics + Section 2)
            case 1:
                return (
                    <Box sx={{ mt: 2 }}>
                        {/* Built‑in metrics accordions */}
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
                        {/* Environmental Impact Questionnaire (Section 2) */}
                        <Accordion sx={{ mt: 2 }}>
                            <AccordionSummary expandIcon={<ChevronDown />}>
                                <Typography variant="subtitle1">Environmental Impact</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle1">Energy Use & Efficiency</Typography>
                                    <Typography variant="caption">Primary Source of Energy</Typography>
                                    <RadioGroup
                                        value={envImpact.energySource}
                                        onChange={(e) =>
                                            handleEnvImpactChange("energySource", e.target.value)
                                        }
                                    >
                                        <RadioFormControlLabel
                                            value="100Renewable"
                                            control={<Radio />}
                                            label="100% renewable (e.g., solar, wind, hydro)"
                                        />
                                        <RadioFormControlLabel
                                            value="mostlyRenewable"
                                            control={<Radio />}
                                            label="Mostly renewable with some conventional energy"
                                        />
                                        <RadioFormControlLabel
                                            value="predominantlyConventional"
                                            control={<Radio />}
                                            label="Predominantly conventional (grid electricity)"
                                        />
                                        <RadioFormControlLabel
                                            value="dieselGenerators"
                                            control={<Radio />}
                                            label="Diesel/gas generators"
                                        />
                                    </RadioGroup>
                                    <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                                        Energy-Efficient Practices (Select all that apply)
                                    </Typography>
                                    {[
                                        { value: "LED", label: "LED or energy-efficient lighting" },
                                        { value: "SmartHVAC", label: "Smart HVAC and temperature control" },
                                        { value: "EnergyManagement", label: "Energy management systems" },
                                        { value: "NaturalLighting", label: "Use of natural lighting" },
                                        { value: "None", label: "None of the above" },
                                    ].map((option) => (
                                        <FormControlLabel
                                            key={option.value}
                                            control={
                                                <Checkbox
                                                    checked={
                                                        envImpact.energyEfficientPractices.includes(
                                                            option.value
                                                        )
                                                    }
                                                    onChange={() =>
                                                        handleEnvImpactCheckboxChange(
                                                            "energyEfficientPractices",
                                                            option.value
                                                        )
                                                    }
                                                />
                                            }
                                            label={option.label}
                                        />
                                    ))}
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle1">
                                        Carbon Footprint & Transportation
                                    </Typography>
                                    <Typography variant="caption">How are most attendees traveling?</Typography>
                                    <RadioGroup
                                        value={envImpact.transportationMode}
                                        onChange={(e) =>
                                            handleEnvImpactChange("transportationMode", e.target.value)
                                        }
                                    >
                                        <RadioFormControlLabel
                                            value="walking"
                                            control={<Radio />}
                                            label="Walking or cycling"
                                        />
                                        <RadioFormControlLabel
                                            value="publicTransit"
                                            control={<Radio />}
                                            label="Public transportation"
                                        />
                                        <RadioFormControlLabel
                                            value="carpooling"
                                            control={<Radio />}
                                            label="Carpooling or shared rides"
                                        />
                                        <RadioFormControlLabel
                                            value="individual"
                                            control={<Radio />}
                                            label="Individual cars or flights"
                                        />
                                    </RadioGroup>
                                    <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                                        Measures to reduce transportation-related emissions (Select all that apply)
                                    </Typography>
                                    {[
                                        { value: "SustainableTransport", label: "Incentives for sustainable transport" },
                                        { value: "ShuttleServices", label: "Organizing shuttle services" },
                                        { value: "HybridParticipation", label: "Encouraging remote or hybrid participation" },
                                        { value: "None", label: "No specific measures in place" },
                                    ].map((option) => (
                                        <FormControlLabel
                                            key={option.value}
                                            control={
                                                <Checkbox
                                                    checked={envImpact.transportationMeasures.includes(
                                                        option.value
                                                    )}
                                                    onChange={() =>
                                                        handleEnvImpactCheckboxChange(
                                                            "transportationMeasures",
                                                            option.value
                                                        )
                                                    }
                                                />
                                            }
                                            label={option.label}
                                        />
                                    ))}
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle1">
                                        Waste and Resource Management
                                    </Typography>
                                    <Typography variant="caption">
                                        Waste management practices (Select all that apply)
                                    </Typography>
                                    {[
                                        { value: "ZeroWaste", label: "Zero-waste policy" },
                                        { value: "RecyclingStations", label: "Recycling and composting stations on site" },
                                        { value: "VendorGuidelines", label: "Waste minimization guidelines for vendors" },
                                        { value: "None", label: "No formal waste management practices" },
                                    ].map((option) => (
                                        <FormControlLabel
                                            key={option.value}
                                            control={
                                                <Checkbox
                                                    checked={envImpact.wasteManagementPractices.includes(
                                                        option.value
                                                    )}
                                                    onChange={() =>
                                                        handleEnvImpactCheckboxChange(
                                                            "wasteManagementPractices",
                                                            option.value
                                                        )
                                                    }
                                                />
                                            }
                                            label={option.label}
                                        />
                                    ))}
                                    <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                                        How is water use managed?
                                    </Typography>
                                    <RadioGroup
                                        value={envImpact.waterManagement}
                                        onChange={(e) =>
                                            handleEnvImpactChange("waterManagement", e.target.value)
                                        }
                                    >
                                        <RadioFormControlLabel
                                            value="waterEfficient"
                                            control={<Radio />}
                                            label="Use of water-efficient fixtures and monitoring"
                                        />
                                        <RadioFormControlLabel
                                            value="rainwater"
                                            control={<Radio />}
                                            label="Rainwater harvesting/reuse"
                                        />
                                        <RadioFormControlLabel
                                            value="none"
                                            control={<Radio />}
                                            label="No specific water-saving measures"
                                        />
                                    </RadioGroup>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1">
                                        Materials and Sustainable Procurement
                                    </Typography>
                                    <Typography variant="caption">
                                        Are sustainable materials used for items like signage, décor, and swag?
                                    </Typography>
                                    <RadioGroup
                                        value={envImpact.sustainableMaterials}
                                        onChange={(e) =>
                                            handleEnvImpactChange("sustainableMaterials", e.target.value)
                                        }
                                    >
                                        <RadioFormControlLabel
                                            value="yesExclusively"
                                            control={<Radio />}
                                            label="Yes, exclusively"
                                        />
                                        <RadioFormControlLabel
                                            value="partially"
                                            control={<Radio />}
                                            label="Partially"
                                        />
                                        <RadioFormControlLabel
                                            value="no"
                                            control={<Radio />}
                                            label="No"
                                        />
                                    </RadioGroup>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                );
            // Step 2: Governance, Digital & Data Collection (Sections 3 & 4)
            case 2:
                return (
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1">Sustainability Policy & Reporting</Typography>
                            <Typography variant="caption">Does your organization have a written sustainability policy for events?</Typography>
                            <RadioGroup
                                value={governanceData.sustainabilityPolicy}
                                onChange={(e) => handleGovernanceChange("sustainabilityPolicy", e.target.value)}
                            >
                                <RadioFormControlLabel
                                    value="fullyDocumented"
                                    control={<Radio />}
                                    label="Yes, fully documented and publicly available"
                                />
                                <RadioFormControlLabel
                                    value="informal"
                                    control={<Radio />}
                                    label="Partially (informal guidelines exist)"
                                />
                                <RadioFormControlLabel
                                    value="no"
                                    control={<Radio />}
                                    label="No"
                                />
                            </RadioGroup>
                            <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                                Are sustainability performance data and results communicated in a transparent report?
                            </Typography>
                            <RadioGroup
                                value={governanceData.sustainabilityReporting}
                                onChange={(e) => handleGovernanceChange("sustainabilityReporting", e.target.value)}
                            >
                                <RadioFormControlLabel
                                    value="yesFramework"
                                    control={<Radio />}
                                    label="Yes, using recognized frameworks (e.g., GRI, ISO 20121)"
                                />
                                <RadioFormControlLabel
                                    value="adHoc"
                                    control={<Radio />}
                                    label="Sometimes, on an ad hoc basis"
                                />
                                <RadioFormControlLabel
                                    value="noReporting"
                                    control={<Radio />}
                                    label="No reporting is conducted"
                                />
                            </RadioGroup>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1">Supply Chain and Ethical Governance</Typography>
                            <Typography variant="caption">Are vendors and suppliers evaluated for sustainability credentials before selection?</Typography>
                            <RadioGroup
                                value={governanceData.vendorEvaluation}
                                onChange={(e) => handleGovernanceChange("vendorEvaluation", e.target.value)}
                            >
                                <RadioFormControlLabel
                                    value="formalEvaluation"
                                    control={<Radio />}
                                    label="Yes, a formal evaluation is in place"
                                />
                                <RadioFormControlLabel
                                    value="occasional"
                                    control={<Radio />}
                                    label="Occasionally, based on cost or availability"
                                />
                                <RadioFormControlLabel
                                    value="no"
                                    control={<Radio />}
                                    label="No"
                                />
                            </RadioGroup>
                            <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                                Is there an independent audit or third-party verification of your event’s sustainability practices?
                            </Typography>
                            <RadioGroup
                                value={governanceData.independentAudit}
                                onChange={(e) => handleGovernanceChange("independentAudit", e.target.value)}
                            >
                                <RadioFormControlLabel
                                    value="yesAudit"
                                    control={<Radio />}
                                    label="Yes, annually or per event"
                                />
                                <RadioFormControlLabel
                                    value="planned"
                                    control={<Radio />}
                                    label="Planned but not yet implemented"
                                />
                                <RadioFormControlLabel
                                    value="no"
                                    control={<Radio />}
                                    label="No"
                                />
                            </RadioGroup>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1">Digital Integration & Data Collection</Typography>
                            <Typography variant="caption">
                                To reduce material waste, how is event information and communication managed?
                            </Typography>
                            <RadioGroup
                                value={governanceData.digitalPractices}
                                onChange={(e) => handleGovernanceChange("digitalPractices", e.target.value)}
                            >
                                <RadioFormControlLabel
                                    value="entirelyDigital"
                                    control={<Radio />}
                                    label="Entirely digital (tickets, agendas, maps)"
                                />
                                <RadioFormControlLabel
                                    value="mixed"
                                    control={<Radio />}
                                    label="Mixed approach (digital where possible, minimal paper)"
                                />
                                <RadioFormControlLabel
                                    value="primarilyPaper"
                                    control={<Radio />}
                                    label="Primarily paper-based"
                                />
                            </RadioGroup>
                            <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                                Do you collect data (e.g., energy use, waste, attendee feedback) for sustainability assessment?
                            </Typography>
                            <RadioGroup
                                value={governanceData.dataCollection}
                                onChange={(e) => handleGovernanceChange("dataCollection", e.target.value)}
                            >
                                <RadioFormControlLabel
                                    value="comprehensiveDigital"
                                    control={<Radio />}
                                    label="Yes, comprehensively using digital tools"
                                />
                                <RadioFormControlLabel
                                    value="manualTracking"
                                    control={<Radio />}
                                    label="Partially, with manual tracking"
                                />
                                <RadioFormControlLabel
                                    value="noData"
                                    control={<Radio />}
                                    label="No data collection"
                                />
                            </RadioGroup>
                            <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                                How often is the sustainability performance reviewed for improvement?
                            </Typography>
                            <RadioGroup
                                value={governanceData.performanceReviewFrequency}
                                onChange={(e) => handleGovernanceChange("performanceReviewFrequency", e.target.value)}
                            >
                                <RadioFormControlLabel
                                    value="afterEveryEvent"
                                    control={<Radio />}
                                    label="After every event with formal review sessions"
                                />
                                <RadioFormControlLabel
                                    value="periodically"
                                    control={<Radio />}
                                    label="Periodically, when time permits"
                                />
                                <RadioFormControlLabel
                                    value="rarely"
                                    control={<Radio />}
                                    label="Rarely or never"
                                />
                            </RadioGroup>
                        </Box>
                    </Box>
                );
            // Step 3: Review & Calculate
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
                            <strong>Approximate Attendees:</strong> {formData.approximateAttendees}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Event Duration:</strong> {formData.eventDuration}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Event Location Type:</strong> {formData.eventLocationType}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Event Timing:</strong> {formData.eventTiming}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Venue Type:</strong> {formData.venueType}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6">Built‑in Sustainability Metrics</Typography>
                            {Object.entries(metricInputs).map(([key, value]) => (
                                <Typography key={key} variant="body1">
                                    <strong>{key}:</strong>{" "}
                                    {value.mode === "custom" ? value.custom : `Group: ${value.cluster}`}
                                </Typography>
                            ))}
                        </Box>
                        {customMetrics.length > 0 && (
                            <>
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Custom Metrics
                                </Typography>
                                {customMetrics.map((metric) => (
                                    <Box key={metric.id} sx={{ mb: 1 }}>
                                        <Typography variant="body1">
                                            <strong>{metric.label}:</strong>{" "}
                                            {metric.type === "numeric" ? metric.numericValue : metric.textValue}
                                        </Typography>
                                    </Box>
                                ))}
                            </>
                        )}
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6">Environmental Impact Responses</Typography>
                            <Typography variant="body1">
                                <strong>Primary Energy Source:</strong> {envImpact.energySource}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Energy-Efficient Practices:</strong>{" "}
                                {envImpact.energyEfficientPractices.join(", ")}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Transportation Mode:</strong> {envImpact.transportationMode}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Transportation Measures:</strong>{" "}
                                {envImpact.transportationMeasures.join(", ")}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Waste Management Practices:</strong>{" "}
                                {envImpact.wasteManagementPractices.join(", ")}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Water Management:</strong> {envImpact.waterManagement}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Sustainable Materials:</strong> {envImpact.sustainableMaterials}
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6">Governance & Digital Responses</Typography>
                            <Typography variant="body1">
                                <strong>Sustainability Policy:</strong> {governanceData.sustainabilityPolicy}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Sustainability Reporting:</strong> {governanceData.sustainabilityReporting}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Vendor Evaluation:</strong> {governanceData.vendorEvaluation}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Independent Audit:</strong> {governanceData.independentAudit}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Digital Practices:</strong> {governanceData.digitalPractices}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Data Collection:</strong> {governanceData.dataCollection}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Performance Review Frequency:</strong> {governanceData.performanceReviewFrequency}
                            </Typography>
                        </Box>
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
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
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
