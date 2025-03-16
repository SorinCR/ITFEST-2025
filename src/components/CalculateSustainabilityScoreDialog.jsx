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
    Card,
    CardContent,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    IconButton,
    Popover,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    Autocomplete,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Alert,
    List,
    ListItem,
    ListItemText,
    Fade,
} from "@mui/material";
import { Calendar, MapPin, Info, ChevronDown } from "lucide-react";

// Define steps.
const steps = [
    "Event Overview",
    "Sustainability & Environmental Impact",
    "Governance, Digital & Data Collection",
    "Review & Calculate",
];

// Predefined clusters for built‑in metrics.
const metricClusters = {
    energyConsumption: [
        { label: "Low (<300 kWh) – ideal", value: "low", bonus: 5 },
        { label: "Medium (300-700 kWh)", value: "medium", bonus: 3 },
        { label: "High (>700 kWh)", value: "high", bonus: 1 },
    ],
    renewableEnergyUsage: [
        { label: "High (>70%) – excellent", value: "high", bonus: 5 },
        { label: "Medium (40-70%)", value: "medium", bonus: 3 },
        { label: "Low (<40%)", value: "low", bonus: 1 },
    ],
    waterConsumption: [
        { label: "Low (<3000 liters) – efficient", value: "low", bonus: 5 },
        { label: "Medium (3000-7000 liters)", value: "medium", bonus: 3 },
        { label: "High (>7000 liters)", value: "high", bonus: 1 },
    ],
    wasteDiversion: [
        { label: "High (>80%) – strong diversion", value: "high", bonus: 5 },
        { label: "Medium (50-80%)", value: "medium", bonus: 3 },
        { label: "Low (<50%)", value: "low", bonus: 1 },
    ],
    recyclingRate: [
        { label: "High (>80%) – excellent", value: "high", bonus: 5 },
        { label: "Medium (50-80%)", value: "medium", bonus: 3 },
        { label: "Low (<50%)", value: "low", bonus: 1 },
    ],
    foodWaste: [
        { label: "Low (<50 kg) – minimal waste", value: "low", bonus: 5 },
        { label: "Medium (50-150 kg)", value: "medium", bonus: 3 },
        { label: "High (>150 kg)", value: "high", bonus: 1 },
    ],
    transportationEmissions: [
        { label: "Low (<100 kg CO₂) – sustainable travel", value: "low", bonus: 5 },
        { label: "Medium (100-300 kg CO₂)", value: "medium", bonus: 3 },
        { label: "High (>300 kg CO₂)", value: "high", bonus: 1 },
    ],
    carbonOffsetting: [
        { label: "High (>50%) – proactive offsetting", value: "high", bonus: 5 },
        { label: "Medium (20-50%)", value: "medium", bonus: 3 },
        { label: "Low (<20%)", value: "low", bonus: 1 },
    ],
    localSourcing: [
        { label: "High (>70%) – very sustainable", value: "high", bonus: 5 },
        { label: "Medium (40-70%)", value: "medium", bonus: 3 },
        { label: "Low (<40%)", value: "low", bonus: 1 },
    ],
    greenProcurement: [
        { label: "Excellent (9-10)", value: "excellent", bonus: 5 },
        { label: "Good (6-8)", value: "good", bonus: 3 },
        { label: "Poor (0-5)", value: "poor", bonus: 1 },
    ],
};

// Venue Type Options for interactive selection.
const venueTypeOptions = [
    { label: "Indoor", value: "Indoor" },
    { label: "Outdoor", value: "Outdoor" },
    { label: "Virtual", value: "Virtual" },
    { label: "Hybrid", value: "Hybrid" },
];

// A custom interactive dropdown component.
const InteractiveOptionSelect = ({ options, value, onChange, label }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div>
            <Button variant="outlined" onClick={handleClick} fullWidth>
                {selectedOption ? selectedOption.label : label || "Select an Option"}
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
                <List>
                    {options.map((option, index) => (
                        <ListItem
                            button
                            key={index}
                            onClick={() => {
                                onChange(option.value);
                                handleClose();
                            }}
                        >
                            <ListItemText primary={option.label} />
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </div>
    );
};

// InfoPopover component for additional details.
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

// LabeledField displays a label with an info icon.
const LabeledField = ({ label, infoText }) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography variant="subtitle1" sx={{ mr: 0.5 }}>
            {label}
        </Typography>
        <InfoPopover infoText={infoText} />
    </Box>
);

// Updated MetricInput component using InteractiveOptionSelect.
const MetricInput = ({
                         metricKey,
                         label,
                         infoText,
                         metricState,
                         onMetricChange,
                         clusters,
                         updateAnswerJson,
                     }) => {
    const handleOptionChange = (selectedValue) => {
        const newState = { ...metricState, cluster: selectedValue };
        onMetricChange(metricKey, newState);
        const selectedOption = clusters.find((opt) => opt.value === selectedValue);
        const allocatedPoints = selectedOption ? selectedOption.bonus : 0;
        updateAnswerJson(metricKey, allocatedPoints);
    };

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {label}
                </Typography>
                <LabeledField label="Info" infoText={infoText} />
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Please select one of the options.
                </Typography>
                <InteractiveOptionSelect
                    options={clusters}
                    value={metricState.cluster}
                    onChange={handleOptionChange}
                    label="Select an Option"
                />
            </CardContent>
        </Card>
    );
};

let dummyData = {
    "approximateAttendees": "200-1000",
    "carbonOffsetting": "high",
    "dataCollection": "comprehensieDigital",
    "digitalPractices": "entirelyDigital",
    "energyConsumption": "medium",
    "energyEfficientPractices": [
      "None"
    ],
    "energySource": "100Renewable",
    "eventDate": "2022-05-15",
    "eventDuration": "fewHours",
    "eventLocation": "Timi\u0219oara city center",
    "eventName": "Bike to Work day",
    "eventTiming": "daylight",
    "foodWaste": "medium",
    "greenProcurement": "excellent",
    "independentAudit": "no",
    "localSourcing": "high",
    "performanceReviewFrequency": "Not specified",
    "recyclingRate": "high",
    "renewableEnergyUsage": "high",
    "sustainabilityPolicy": "informal",
    "sustainabilityReporting": "adHoc",
    "transportationEmissions": "low",
    "vendorEvaluation": "occasional",
    "venueType": "Hybrid",
    "wasteDiversion": "high",
    "waterConsumption": "medium"
  }
  

const CalculateSustainabilityScoreDialog = ({ isOpen, onClose, extractedData }) => {
    // Main form state.
    console.log(extractedData)
    // const [formData, setFormData] = useState({
    //     eventName: extractedData.eventName || "",
    //     eventDate: extractedData.eventDate || "",
    //     eventLocation: extractedData.eventLocation || "",
    //     approximateAttendees: extractedData.approximateAttendees || "", // Options: lessThan50, 50-200, 200-1000, moreThan1000
    //     eventDuration: extractedData.eventDuration || "", // Options: fewHours, oneDay, multipleDays, overAWeek
    //     venueType: extractedData.venueType || "", // Options: Indoor, Outdoor, Virtual, Hybrid
    //     eventTiming: extractedData.eventTiming || "", // Options: daylight, night, mixed
    // });

    useEffect(() => {
        if (extractedData) {
            setFormData({
                eventName: extractedData.eventName || "",
                eventDate: extractedData.eventDate || "",
                eventLocation: extractedData.eventLocation || "",
                approximateAttendees: extractedData.approximateAttendees || "",
                eventDuration: extractedData.eventDuration || "",
                venueType: extractedData.venueType || "",
                eventTiming: extractedData.eventTiming || "",
            });
            setMetricInputs({
                energyConsumption: { cluster: extractedData.energyConsumption || ""},
                renewableEnergyUsage: { cluster: extractedData.renewableEnergyUsage || ""},
                waterConsumption: { cluster: extractedData.waterConsumption || ""},
                wasteDiversion: { cluster: extractedData.wasteDiversion || ""},
                recyclingRate: { cluster: extractedData.recyclingRate || ""},
                foodWaste: { cluster: extractedData.foodWaste || ""},
                transportationEmissions: { cluster: extractedData.transportationEmissions || ""},
                carbonOffsetting: { cluster: extractedData.carbonOffsetting || ""},
                localSourcing: { cluster: extractedData.localSourcing || ""},
                greenProcurement: { cluster: extractedData.greenProcurement || ""},
            })
            setEnvImpact({
                energySource: extractedData.energySource || "", // Options: 100Renewable, mostlyRenewable, predominantlyConventional, dieselGenerators
                energyEfficientPractices: extractedData.energyEfficientPractices || [], // Options: LED, SmartHVAC, EnergyManagement, NaturalLighting, None
            })
            setGovernanceData({
                sustainabilityPolicy: extractedData.sustainabilityPolicy || "", // Options: fullyDocumented, informal, no
                sustainabilityReporting: extractedData.sustainabilityReporting || "", // Options: yesFramework, adHoc, noReporting
                vendorEvaluation: extractedData.vendorEvaluation || "", // Options: formalEvaluation, occasional, no
                independentAudit: extractedData.independentAudit || "", // Options: yesAudit, planned, no
                digitalPractices: extractedData.digitalPractices || "", // Options: entirelyDigital, mixed, primarilyPaper
                dataCollection: extractedData.dataCollection || "", // Options: comprehensiveDigital, manualTracking, noData
                performanceReviewFrequency: extractedData.performanceReviewFrequency || "", // Options: afterEveryEvent, periodically, rarely
            })
        }
    }, [extractedData]);


    const [formData, setFormData] = useState({
        eventName: "",
        eventDate: "",
        eventLocation: "",
        approximateAttendees: "",
        eventDuration: "", 
        venueType: "",
        eventTiming: "",
    });

    // console.log(extractedData.eventName || "")

    // Built‑in metric inputs state.
    const [metricInputs, setMetricInputs] = useState({
        energyConsumption: { cluster: "" },
        renewableEnergyUsage: { cluster: "" },
        waterConsumption: { cluster: "" },
        wasteDiversion: { cluster: "" },
        recyclingRate: { cluster: "" },
        foodWaste: { cluster: "" },
        transportationEmissions: { cluster: "" },
        carbonOffsetting: { cluster: "" },
        localSourcing: { cluster: "" },
        greenProcurement: { cluster: "" },
    });

    // Environmental Impact state.
    const [envImpact, setEnvImpact] = useState({
        energySource: "", // Options: 100Renewable, mostlyRenewable, predominantlyConventional, dieselGenerators
        energyEfficientPractices: [], // Options: LED, SmartHVAC, EnergyManagement, NaturalLighting, None
    });

    // Governance & Digital state.
    const [governanceData, setGovernanceData] = useState({
        sustainabilityPolicy: "", // Options: fullyDocumented, informal, no
        sustainabilityReporting: "", // Options: yesFramework, adHoc, noReporting
        vendorEvaluation: "", // Options: formalEvaluation, occasional, no
        independentAudit: "", // Options: yesAudit, planned, no
        digitalPractices: "", // Options: entirelyDigital, mixed, primarilyPaper
        dataCollection: "", // Options: comprehensiveDigital, manualTracking, noData
        performanceReviewFrequency: "", // Options: afterEveryEvent, periodically, rarely
    });

    // JSON state for storing only built‑in metrics’ allocated points.
    const [answersJson, setAnswersJson] = useState({ builtIn: {} });

    // Other state.
    const [activeStep, setActiveStep] = useState(0);
    const [calculatedScore, setCalculatedScore] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    // Location autocomplete state.
    const [locationOptions, setLocationOptions] = useState([]);
    const [locationInput, setLocationInput] = useState("");

    useEffect(() => {
        const dummyLocations = [
            "Bucharest",
            "Cluj-Napoca",
            "Timișoara",
            "Iași",
            "Constanța",
            "Brașov",
            "Craiova",
            "Galați",
            "Ploiești",
            "Oradea",
            "Brăila",
            "Arad",
            "Pitești",
            "Sibiu",
            "Bacău",
            "Târgu Mureș",
            "Baia Mare",
            "Buzău",
            "Botoșani",
            "Satu Mare",
            "Râmnicu Vâlcea",
            "Drobeta-Turnu Severin",
            "Suceava",
            "Focșani",
            "Bistrița",
            "Târgoviște",
            "Reșița",
            "Slatina",
            "Călărași",
            "Alba Iulia",
            "Giurgiu",
            "Deva",
            "Hunedoara",
            "Zalău",
            "Sfântu Gheorghe",
            "Bârlad",
            "Vaslui",
            "Roman",
            "Turda",
            "Mediaș",
            "Lugoj",
            "Slobozia",
            "Pașcani",
            "Petroșani",
            "Câmpina",
            "Miercurea Ciuc",
            "Sighetu Marmației",
            "Câmpulung",
            "Rădăuți",
            "Târgu Jiu",
            "Făgăraș",
            "Cernavodă",
            "Caracal",
            "Roșiorii de Vede",
            "Tecuci",
            "Oltenița",
            "Motru",
            "Săcele",
            "Câmpia Turzii",
            "Blaj",
            "Filiași",
            "Mangalia",
            "Curtea de Argeș"
        ];
        
        const filtered = dummyLocations.filter((loc) =>
            loc.toLowerCase().includes(locationInput.toLowerCase())
        );
        setLocationOptions(filtered);
    }, [locationInput]);

    // Update form data.
    const handleFormChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Update built‑in metric state.
    const handleMetricChange = (metricKey, newValue) => {
        setMetricInputs((prev) => ({ ...prev, [metricKey]: newValue }));
    };

    // Update Environmental Impact state.
    const handleEnvImpactChange = (name, value) => {
        setEnvImpact((prev) => ({ ...prev, [name]: value }));
    };

    // Update Governance Data state.
    const handleGovernanceChange = (name, value) => {
        setGovernanceData((prev) => ({ ...prev, [name]: value }));
    };

    // For checkboxes.
    const handleEnvImpactCheckboxChange = (name, option) => {
        setEnvImpact((prev) => {
            const current = prev[name] || [];
            return current.includes(option)
                ? { ...prev, [name]: current.filter((item) => item !== option) }
                : { ...prev, [name]: [...current, option] };
        });
    };

    // Compute allocatedPoints for a built‑in metric.
    const getMetricScore = (metricKey) => {
        const metric = metricInputs[metricKey];
        const clustersForMetric = metricClusters[metricKey] || [];
        const selected = clustersForMetric.find((opt) => opt.value === metric.cluster);
        return selected ? selected.bonus : 0;
    };

    // ===== Additional Scoring Functions =====
    // Section 1: Event Overview
    const calculateOverviewScore = () => {
        let score = 0;
        // Approximate Attendees
        switch (formData.approximateAttendees) {
            case "lessThan50":
                score += 5;
                break;
            case "50-200":
                score += 3;
                break;
            case "200-1000":
                score += 1;
                break;
            case "moreThan1000":
                score += 0;
                break;
            default:
                break;
        }
        // Event Duration
        switch (formData.eventDuration) {
            case "fewHours":
                score += 5;
                break;
            case "oneDay":
                score += 3;
                break;
            case "multipleDays":
                score += 1;
                break;
            case "overAWeek":
                score += 0;
                break;
            default:
                break;
        }
        // Venue Type (scoring based on selection)
        if (formData.venueType === "Outdoor" || formData.venueType === "Virtual") score += 5;
        else if (formData.venueType === "Hybrid") score += 4;
        else if (formData.venueType === "Indoor") score += 3;
        // Event Timing
        switch (formData.eventTiming) {
            case "daylight":
                score += 5;
                break;
            case "mixed":
                score += 4;
                break;
            case "night":
                score += 2;
                break;
            default:
                break;
        }
        return score;
    };

    // Section 2: Environmental Impact (non built‑in)
    const calculateEnvImpactScore = () => {
        let score = 0;
        // Primary Energy Source
        switch (envImpact.energySource) {
            case "100Renewable":
                score += 5;
                break;
            case "mostlyRenewable":
                score += 3;
                break;
            case "predominantlyConventional":
                score += 1;
                break;
            case "dieselGenerators":
                score += 0;
                break;
            default:
                break;
        }
        // Energy‑Efficient Practices: if “None” is selected, no points; otherwise, add 1 per practice.
        if (!envImpact.energyEfficientPractices.includes("None")) {
            score += envImpact.energyEfficientPractices.length;
        }
        return score;
    };

    // Section 3: Governance & Digital
    const calculateGovernanceScore = () => {
        let score = 0;
        // Sustainability Policy
        switch (governanceData.sustainabilityPolicy) {
            case "fullyDocumented":
                score += 5;
                break;
            case "informal":
                score += 3;
                break;
            case "no":
                score += 0;
                break;
            default:
                break;
        }
        // Sustainability Reporting
        switch (governanceData.sustainabilityReporting) {
            case "yesFramework":
                score += 5;
                break;
            case "adHoc":
                score += 3;
                break;
            case "noReporting":
                score += 0;
                break;
            default:
                break;
        }
        // Vendor Evaluation
        switch (governanceData.vendorEvaluation) {
            case "formalEvaluation":
                score += 5;
                break;
            case "occasional":
                score += 3;
                break;
            case "no":
                score += 0;
                break;
            default:
                break;
        }
        // Independent Audit
        switch (governanceData.independentAudit) {
            case "yesAudit":
                score += 5;
                break;
            case "planned":
                score += 3;
                break;
            case "no":
                score += 0;
                break;
            default:
                break;
        }
        // Digital Practices
        switch (governanceData.digitalPractices) {
            case "entirelyDigital":
                score += 5;
                break;
            case "mixed":
                score += 3;
                break;
            case "primarilyPaper":
                score += 0;
                break;
            default:
                break;
        }
        // Data Collection
        switch (governanceData.dataCollection) {
            case "comprehensiveDigital":
                score += 5;
                break;
            case "manualTracking":
                score += 3;
                break;
            case "noData":
                score += 0;
                break;
            default:
                break;
        }
        // Performance Review Frequency
        switch (governanceData.performanceReviewFrequency) {
            case "afterEveryEvent":
                score += 5;
                break;
            case "periodically":
                score += 3;
                break;
            case "rarely":
                score += 0;
                break;
            default:
                break;
        }
        return score;
    };

    // Combine all sections with built‑in metrics.
    const calculateScore = () => {
        const builtInScore =
            getMetricScore("energyConsumption") +
            getMetricScore("renewableEnergyUsage") +
            getMetricScore("waterConsumption") +
            getMetricScore("wasteDiversion") +
            getMetricScore("recyclingRate") +
            getMetricScore("foodWaste") +
            getMetricScore("transportationEmissions") +
            getMetricScore("carbonOffsetting") +
            getMetricScore("localSourcing") +
            getMetricScore("greenProcurement");

        const overviewScore = calculateOverviewScore();
        const envImpactScore = calculateEnvImpactScore();
        const governanceScore = calculateGovernanceScore();

        const totalPoints = builtInScore + overviewScore + envImpactScore + governanceScore;
        // Scale overall score to a 0-10 range (assuming maximum possible is 114 points).
        const sustainabilityFactor = (totalPoints / 114) * 10;
        return { sustainabilityScore: sustainabilityFactor.toFixed(1), totalPoints };
    };

    // Build JSON object with all measured metrics and allocated points (nested structure).
    const evaluateMetrics = () => {
        // Overview scoring details
        const attendeesPoints =
            formData.approximateAttendees === "lessThan50"
                ? 5
                : formData.approximateAttendees === "50-200"
                    ? 3
                    : formData.approximateAttendees === "200-1000"
                        ? 1
                        : 0;
        const durationPoints =
            formData.eventDuration === "fewHours"
                ? 5
                : formData.eventDuration === "oneDay"
                    ? 3
                    : formData.eventDuration === "multipleDays"
                        ? 1
                        : 0;
        const venuePoints =
            formData.venueType === "Outdoor" || formData.venueType === "Virtual"
                ? 5
                : formData.venueType === "Hybrid"
                    ? 4
                    : formData.venueType === "Indoor"
                        ? 3
                        : 0;
        const timingPoints =
            formData.eventTiming === "daylight"
                ? 5
                : formData.eventTiming === "mixed"
                    ? 4
                    : formData.eventTiming === "night"
                        ? 2
                        : 0;

        // Environmental Impact details
        const energySourcePoints =
            envImpact.energySource === "100Renewable"
                ? 5
                : envImpact.energySource === "mostlyRenewable"
                    ? 3
                    : envImpact.energySource === "predominantlyConventional"
                        ? 1
                        : 0;
        const energyEfficientPoints = envImpact.energyEfficientPractices.includes("None")
            ? 0
            : envImpact.energyEfficientPractices.length;

        // Governance details
        const policyPoints =
            governanceData.sustainabilityPolicy === "fullyDocumented"
                ? 5
                : governanceData.sustainabilityPolicy === "informal"
                    ? 3
                    : 0;
        const reportingPoints =
            governanceData.sustainabilityReporting === "yesFramework"
                ? 5
                : governanceData.sustainabilityReporting === "adHoc"
                    ? 3
                    : 0;
        const vendorPoints =
            governanceData.vendorEvaluation === "formalEvaluation"
                ? 5
                : governanceData.vendorEvaluation === "occasional"
                    ? 3
                    : 0;
        const auditPoints =
            governanceData.independentAudit === "yesAudit"
                ? 5
                : governanceData.independentAudit === "planned"
                    ? 3
                    : 0;
        const digitalPoints =
            governanceData.digitalPractices === "entirelyDigital"
                ? 5
                : governanceData.digitalPractices === "mixed"
                    ? 3
                    : 0;
        const dataCollectionPoints =
            governanceData.dataCollection === "comprehensiveDigital"
                ? 5
                : governanceData.dataCollection === "manualTracking"
                    ? 3
                    : 0;
        const reviewPoints =
            governanceData.performanceReviewFrequency === "afterEveryEvent"
                ? 5
                : governanceData.performanceReviewFrequency === "periodically"
                    ? 3
                    : 0;

        return {
            builtIn: { ...answersJson.builtIn },
            overview: {
                approximateAttendees: { points: attendeesPoints },
                eventDuration: { points: durationPoints },
                venueType: { points: venuePoints },
                eventTiming: { points: timingPoints },
            },
            envImpact: {
                energySource: { points: energySourcePoints },
                energyEfficientPractices: { points: energyEfficientPoints },
            },
            governance: {
                sustainabilityPolicy: { points: policyPoints },
                sustainabilityReporting: { points: reportingPoints },
                vendorEvaluation: { points: vendorPoints },
                independentAudit: { points: auditPoints },
                digitalPractices: { points: digitalPoints },
                dataCollection: { points: dataCollectionPoints },
                performanceReviewFrequency: { points: reviewPoints },
            },
        };
    };

    // Build a flat JSON object with only metric names and allocated points.
    const buildFlatMetricsJson = () => {
        const flatMetrics = {};
        const metricsEvaluation = evaluateMetrics();

        // Flatten builtIn metrics.
        Object.keys(metricsEvaluation.builtIn).forEach((key) => {
            flatMetrics[key] = metricsEvaluation.builtIn[key];
        });
        // Flatten overview metrics.
        Object.keys(metricsEvaluation.overview).forEach((key) => {
            flatMetrics[key] = metricsEvaluation.overview[key].points;
        });
        // Flatten Environmental Impact metrics.
        Object.keys(metricsEvaluation.envImpact).forEach((key) => {
            flatMetrics[key] = metricsEvaluation.envImpact[key].points;
        });
        // Flatten Governance metrics.
        Object.keys(metricsEvaluation.governance).forEach((key) => {
            flatMetrics[key] = metricsEvaluation.governance[key].points;
        });
        // Include overall totals.
        const { totalPoints, sustainabilityScore } = calculateScore();
        flatMetrics.totalPoints = totalPoints;
        flatMetrics.sustainabilityFactor = Number(sustainabilityScore);
        return flatMetrics;
    };

    // Update answersJson state for built‑in metrics.
    const updateAnswerJson = (key, allocatedPoints) => {
        setAnswersJson((prev) => ({
            ...prev,
            builtIn: { ...prev.builtIn, [key]: allocatedPoints },
        }));
    };

    // Validate required fields for current step.
    const validateCurrentStep = () => {
        const errors = [];
        if (activeStep === 0) {
            if (!formData.eventName) errors.push("Event Name is required.");
            if (!formData.eventDate) errors.push("Event Date is required.");
            if (!formData.eventLocation) errors.push("Event Location is required.");
            if (!formData.approximateAttendees)
                errors.push("Number of Attendees is required.");
            if (!formData.eventDuration)
                errors.push("Event Duration is required.");
            if (!formData.eventTiming) errors.push("Event Timing is required.");
            if (!formData.venueType) errors.push("Venue Type is required.");
        } else if (activeStep === 1) {
            Object.keys(metricInputs).forEach((key) => {
                if (!metricInputs[key].cluster) {
                    errors.push(`${key} is unanswered.`);
                }
            });
            if (!envImpact.energySource) {
                errors.push("Primary Source of Energy is required.");
            }
        } else if (activeStep === 2) {
            if (!governanceData.sustainabilityPolicy)
                errors.push("Sustainability Policy is required.");
            if (!governanceData.sustainabilityReporting)
                errors.push("Sustainability Reporting is required.");
            if (!governanceData.vendorEvaluation)
                errors.push("Vendor Evaluation is required.");
            if (!governanceData.independentAudit)
                errors.push("Independent Audit is required.");
            if (!governanceData.digitalPractices)
                errors.push("Digital Practices is required.");
            if (!governanceData.dataCollection)
                errors.push("Data Collection is required.");
            if (!governanceData.performanceReviewFrequency)
                errors.push("Performance Review Frequency is required.");
        }
        return errors;
    };

    const handleNext = () => {
        const errors = validateCurrentStep();
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }
        setValidationErrors([]);
        if (activeStep === steps.length - 1) {
            const { sustainabilityScore } = calculateScore();
            setCalculatedScore(sustainabilityScore);
            submitDataToMongo();
        } else {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setValidationErrors([]);
        setActiveStep((prev) => prev - 1);
    };

    // Submit data to backend.
    const submitDataToMongo = async () => {
        // Build the flat metrics JSON.
        const flatMetricsJson = buildFlatMetricsJson();
        // Create final JSON including overview information.
        const finalJson = {
            eventName: formData.eventName,
            eventDate: formData.eventDate,
            eventLocation: formData.eventLocation,
            approximateAttendees: formData.approximateAttendees,
            eventDuration: formData.eventDuration,
            venueType: formData.venueType,
            eventTiming: formData.eventTiming,
            energyConsumption: metricInputs.energyConsumption.cluster,
            renewableEnergyUsage: metricInputs.renewableEnergyUsage.cluster,
            waterConsumption: metricInputs.waterConsumption.cluster,
            wasteDiversion: metricInputs.wasteDiversion.cluster,
            recyclingRate: metricInputs.recyclingRate.cluster,
            foodWaste: metricInputs.foodWaste.cluster,
            transportationEmissions: metricInputs.transportationEmissions.cluster,
            carbonOffsetting: metricInputs.carbonOffsetting.cluster,
            localSourcing: metricInputs.localSourcing.cluster,
            greenProcurement: metricInputs.greenProcurement.cluster,
            energySource: envImpact.energySource,
            energyEfficientPractices: envImpact.energyEfficientPractices,
            sustainabilityPolicy: governanceData.sustainabilityPolicy,
            sustainabilityReporting: governanceData.sustainabilityReporting,
            vendorEvaluation: governanceData.vendorEvaluation,
            independentAudit: governanceData.independentAudit,
            digitalPractices: governanceData.digitalPractices,
            dataCollection: governanceData.dataCollection,
            performanceReviewFrequency: governanceData.performanceReviewFrequency,
            totalPoints: flatMetricsJson.totalPoints,
            sustainabilityFactor: flatMetricsJson.sustainabilityFactor,
            email: localStorage.getItem("email")
        };
        // console.log("Final JSON before submission:", JSON.stringify(finalJson, null, 2));

        try {
            const response = await fetch("http://194.102.62.226:5000/create_event", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalJson),
            });
            if (response.ok) {
                setSubmissionStatus("Data successfully submitted!");
                onClose();
            } else {
                setSubmissionStatus("Submission failed.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setSubmissionStatus("Error submitting data.");
        }
    };

    // Render content for each step.
    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{ mt: 2 }}>
                        {validationErrors.length > 0 && (
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                {validationErrors.map((err, idx) => (
                                    <div key={idx}>{err}</div>
                                ))}
                            </Alert>
                        )}
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
                        {/* Venue Type selection uses interactive dropdown */}
                        <Typography variant="subtitle1" sx={{ mt: 2 }}>
                            Venue Type
                        </Typography>
                        <InteractiveOptionSelect
                            options={venueTypeOptions}
                            value={formData.venueType}
                            onChange={(selectedValue) => handleFormChange("venueType", selectedValue)}
                            label="Select Venue Type"
                        />
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1">Approximate Number of Attendees</Typography>
                            <RadioGroup
                                value={formData.approximateAttendees}
                                onChange={(e) => handleFormChange("approximateAttendees", e.target.value)}
                            >
                                <FormControlLabel
                                    value="lessThan50"
                                    control={<Radio />}
                                    label="Less than 50 (minimal resource use – 5 points)"
                                />
                                <FormControlLabel
                                    value="50-200"
                                    control={<Radio />}
                                    label="50 – 200 (moderate impact – 3 points)"
                                />
                                <FormControlLabel
                                    value="200-1000"
                                    control={<Radio />}
                                    label="200 – 1,000 (higher impact – 1 point)"
                                />
                                <FormControlLabel
                                    value="moreThan1000"
                                    control={<Radio />}
                                    label="More than 1,000 (highest impact – 0 points)"
                                />
                            </RadioGroup>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1">Event Duration</Typography>
                            <RadioGroup
                                value={formData.eventDuration}
                                onChange={(e) => handleFormChange("eventDuration", e.target.value)}
                            >
                                <FormControlLabel value="fewHours" control={<Radio />} label="A few hours (5 points)" />
                                <FormControlLabel value="oneDay" control={<Radio />} label="One full day (3 points)" />
                                <FormControlLabel value="multipleDays" control={<Radio />} label="Multiple days (1 point)" />
                                <FormControlLabel value="overAWeek" control={<Radio />} label="Over a week (0 points)" />
                            </RadioGroup>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1">How is the event timed in relation to natural light?</Typography>
                            <RadioGroup
                                value={formData.eventTiming}
                                onChange={(e) => handleFormChange("eventTiming", e.target.value)}
                            >
                                <FormControlLabel
                                    value="daylight"
                                    control={<Radio />}
                                    label="During daylight hours (optimal – 5 points)"
                                />
                                <FormControlLabel
                                    value="night"
                                    control={<Radio />}
                                    label="At night (requires extra lighting – 2 points)"
                                />
                                <FormControlLabel
                                    value="mixed"
                                    control={<Radio />}
                                    label="Mixed (moderate – 4 points)"
                                />
                            </RadioGroup>
                        </Box>
                    </Box>
                );
            case 1:
                return (
                    <Box sx={{ mt: 2 }}>
                        {validationErrors.length > 0 && (
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                {validationErrors.map((err, idx) => (
                                    <div key={idx}>{err}</div>
                                ))}
                            </Alert>
                        )}
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Sustainability Metrics
                        </Typography>
                        {/* Built‑in Metrics */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ChevronDown />}>
                                <Typography variant="subtitle1">Built‑in Sustainability Metrics</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <MetricInput
                                    metricKey="energyConsumption"
                                    label="Energy Consumption (kWh)"
                                    infoText="Estimate energy usage based on past bills or venue estimates."
                                    metricState={metricInputs.energyConsumption}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.energyConsumption}
                                    updateAnswerJson={updateAnswerJson}
                                />
                                <MetricInput
                                    metricKey="renewableEnergyUsage"
                                    label="Renewable Energy Usage (%)"
                                    infoText="Percentage of energy sourced from renewables."
                                    metricState={metricInputs.renewableEnergyUsage}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.renewableEnergyUsage}
                                    updateAnswerJson={updateAnswerJson}
                                />
                                <MetricInput
                                    metricKey="waterConsumption"
                                    label="Water Consumption (liters)"
                                    infoText="Estimate water usage from operations."
                                    metricState={metricInputs.waterConsumption}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.waterConsumption}
                                    updateAnswerJson={updateAnswerJson}
                                />
                                <MetricInput
                                    metricKey="wasteDiversion"
                                    label="Waste Diversion (%)"
                                    infoText="Percentage of waste diverted from landfills."
                                    metricState={metricInputs.wasteDiversion}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.wasteDiversion}
                                    updateAnswerJson={updateAnswerJson}
                                />
                                <MetricInput
                                    metricKey="recyclingRate"
                                    label="Recycling Rate (%)"
                                    infoText="Percentage of waste recycled."
                                    metricState={metricInputs.recyclingRate}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.recyclingRate}
                                    updateAnswerJson={updateAnswerJson}
                                />
                                <MetricInput
                                    metricKey="foodWaste"
                                    label="Food Waste (kg)"
                                    infoText="Total food waste from catering."
                                    metricState={metricInputs.foodWaste}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.foodWaste}
                                    updateAnswerJson={updateAnswerJson}
                                />
                                <MetricInput
                                    metricKey="transportationEmissions"
                                    label="Transportation Emissions (kg CO₂)"
                                    infoText="Estimate emissions from attendee travel."
                                    metricState={metricInputs.transportationEmissions}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.transportationEmissions}
                                    updateAnswerJson={updateAnswerJson}
                                />
                                <MetricInput
                                    metricKey="carbonOffsetting"
                                    label="Carbon Offsetting (%)"
                                    infoText="Percentage of budget for carbon offsetting."
                                    metricState={metricInputs.carbonOffsetting}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.carbonOffsetting}
                                    updateAnswerJson={updateAnswerJson}
                                />
                                <MetricInput
                                    metricKey="localSourcing"
                                    label="Local Sourcing (%)"
                                    infoText="Percentage of goods/services sourced locally."
                                    metricState={metricInputs.localSourcing}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.localSourcing}
                                    updateAnswerJson={updateAnswerJson}
                                />
                                <MetricInput
                                    metricKey="greenProcurement"
                                    label="Green Procurement (0-10)"
                                    infoText="Rate procurement on sustainability (0=poor, 10=excellent)."
                                    metricState={metricInputs.greenProcurement}
                                    onMetricChange={handleMetricChange}
                                    clusters={metricClusters.greenProcurement}
                                    updateAnswerJson={updateAnswerJson}
                                />
                            </AccordionDetails>
                        </Accordion>
                        {/* Environmental Impact Section */}
                        <Accordion sx={{ mt: 2 }}>
                            <AccordionSummary expandIcon={<ChevronDown />}>
                                <Typography variant="subtitle1">Environmental Impact</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Energy Use & Efficiency
                                    </Typography>
                                    <LabeledField
                                        label="Primary Source of Energy"
                                        infoText="Select the primary source of energy (e.g., 100% renewable, mostly renewable, predominantly conventional, diesel/gas generators)."
                                    />
                                    <RadioGroup
                                        value={envImpact.energySource}
                                        onChange={(e) => handleEnvImpactChange("energySource", e.target.value)}
                                    >
                                        <FormControlLabel
                                            value="100Renewable"
                                            control={<Radio />}
                                            label="100% renewable (5 points) - ideal for sustainability"
                                        />
                                        <FormControlLabel
                                            value="mostlyRenewable"
                                            control={<Radio />}
                                            label="Mostly renewable (3 points)"
                                        />
                                        <FormControlLabel
                                            value="predominantlyConventional"
                                            control={<Radio />}
                                            label="Predominantly conventional (1 point)"
                                        />
                                        <FormControlLabel
                                            value="dieselGenerators"
                                            control={<Radio />}
                                            label="Diesel/gas generators (0 points)"
                                        />
                                    </RadioGroup>
                                    <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                                        Energy‑Efficient Practices (Select all that apply – each gives 1 point)
                                    </Typography>
                                    {[
                                        { value: "LED", label: "LED or energy‑efficient lighting" },
                                        { value: "SmartHVAC", label: "Smart HVAC and temperature control" },
                                        { value: "EnergyManagement", label: "Energy management systems" },
                                        { value: "NaturalLighting", label: "Use of natural lighting" },
                                        { value: "None", label: "None of the above" },
                                    ].map((option) => (
                                        <FormControlLabel
                                            key={option.value}
                                            control={
                                                <Checkbox
                                                    checked={envImpact.energyEfficientPractices.includes(option.value)}
                                                    onChange={() => handleEnvImpactCheckboxChange("energyEfficientPractices", option.value)}
                                                />
                                            }
                                            label={option.label}
                                        />
                                    ))}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                );
            case 2:
                return (
                    <Box sx={{ mt: 2 }}>
                        {validationErrors.length > 0 && (
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                {validationErrors.map((err, idx) => (
                                    <div key={idx}>{err}</div>
                                ))}
                            </Alert>
                        )}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Sustainability Policy & Reporting
                            </Typography>
                            <RadioGroup
                                value={governanceData.sustainabilityPolicy}
                                onChange={(e) => handleGovernanceChange("sustainabilityPolicy", e.target.value)}
                            >
                                <FormControlLabel
                                    value="fullyDocumented"
                                    control={<Radio />}
                                    label="Yes, fully documented and publicly available (5 points)"
                                />
                                <FormControlLabel
                                    value="informal"
                                    control={<Radio />}
                                    label="Partially (informal guidelines exist – 3 points)"
                                />
                                <FormControlLabel value="no" control={<Radio />} label="No (0 points)" />
                            </RadioGroup>
                            <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                                Are sustainability performance data and results communicated in a transparent report?
                            </Typography>
                            <RadioGroup
                                value={governanceData.sustainabilityReporting}
                                onChange={(e) => handleGovernanceChange("sustainabilityReporting", e.target.value)}
                            >
                                <FormControlLabel
                                    value="yesFramework"
                                    control={<Radio />}
                                    label="Yes, using recognized frameworks (e.g., GRI, ISO 20121) (5 points)"
                                />
                                <FormControlLabel
                                    value="adHoc"
                                    control={<Radio />}
                                    label="Sometimes, on an ad hoc basis (3 points)"
                                />
                                <FormControlLabel value="noReporting" control={<Radio />} label="No reporting is conducted (0 points)" />
                            </RadioGroup>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Supply Chain and Ethical Governance
                            </Typography>
                            <RadioGroup
                                value={governanceData.vendorEvaluation}
                                onChange={(e) => handleGovernanceChange("vendorEvaluation", e.target.value)}
                            >
                                <FormControlLabel
                                    value="formalEvaluation"
                                    control={<Radio />}
                                    label="Yes, a formal evaluation is in place (5 points)"
                                />
                                <FormControlLabel
                                    value="occasional"
                                    control={<Radio />}
                                    label="Occasionally, based on cost or availability (3 points)"
                                />
                                <FormControlLabel value="no" control={<Radio />} label="No (0 points)" />
                            </RadioGroup>
                            <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                                Is there an independent audit or third-party verification of your event’s sustainability practices?
                            </Typography>
                            <RadioGroup
                                value={governanceData.independentAudit}
                                onChange={(e) => handleGovernanceChange("independentAudit", e.target.value)}
                            >
                                <FormControlLabel
                                    value="yesAudit"
                                    control={<Radio />}
                                    label="Yes, annually or per event (5 points)"
                                />
                                <FormControlLabel
                                    value="planned"
                                    control={<Radio />}
                                    label="Planned but not yet implemented (3 points)"
                                />
                                <FormControlLabel value="no" control={<Radio />} label="No (0 points)" />
                            </RadioGroup>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Digital Integration & Data Collection
                            </Typography>
                            <RadioGroup
                                value={governanceData.digitalPractices}
                                onChange={(e) => handleGovernanceChange("digitalPractices", e.target.value)}
                            >
                                <FormControlLabel
                                    value="entirelyDigital"
                                    control={<Radio />}
                                    label="Entirely digital (tickets, agendas, maps) (5 points)"
                                />
                                <FormControlLabel
                                    value="mixed"
                                    control={<Radio />}
                                    label="Mixed approach (digital where possible, minimal paper) (3 points)"
                                />
                                <FormControlLabel
                                    value="primarilyPaper"
                                    control={<Radio />}
                                    label="Primarily paper-based (0 points)"
                                />
                            </RadioGroup>
                            <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                                Do you collect data (e.g., energy use, waste, attendee feedback) for sustainability assessment?
                            </Typography>
                            <RadioGroup
                                value={governanceData.dataCollection}
                                onChange={(e) => handleGovernanceChange("dataCollection", e.target.value)}
                            >
                                <FormControlLabel
                                    value="comprehensiveDigital"
                                    control={<Radio />}
                                    label="Yes, comprehensively using digital tools (5 points)"
                                />
                                <FormControlLabel
                                    value="manualTracking"
                                    control={<Radio />}
                                    label="Partially, with manual tracking (3 points)"
                                />
                                <FormControlLabel value="noData" control={<Radio />} label="No data collection (0 points)" />
                            </RadioGroup>
                            <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                                How often is the sustainability performance reviewed for improvement?
                            </Typography>
                            <RadioGroup
                                value={governanceData.performanceReviewFrequency}
                                onChange={(e) => handleGovernanceChange("performanceReviewFrequency", e.target.value)}
                            >
                                <FormControlLabel
                                    value="afterEveryEvent"
                                    control={<Radio />}
                                    label="After every event with formal review sessions (5 points)"
                                />
                                <FormControlLabel
                                    value="periodically"
                                    control={<Radio />}
                                    label="Periodically, when time permits (3 points)"
                                />
                                <FormControlLabel
                                    value="rarely"
                                    control={<Radio />}
                                    label="Rarely or never (0 points)"
                                />
                            </RadioGroup>
                        </Box>
                    </Box>
                );
            case 3:
                // Review step
                const { totalPoints } = calculateScore();
                const metricsOverview = evaluateMetrics();
                return (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Review Your Metrics
                        </Typography>
                        <Card variant="outlined" sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="subtitle1" gutterBottom>
                                    Event Overview Points
                                </Typography>
                                <Typography variant="body1">
                                    Attendees: {metricsOverview.overview.approximateAttendees.points} points
                                </Typography>
                                <Typography variant="body1">
                                    Duration: {metricsOverview.overview.eventDuration.points} points
                                </Typography>
                                <Typography variant="body1">
                                    Venue Type: {metricsOverview.overview.venueType.points} points
                                </Typography>
                                <Typography variant="body1">
                                    Event Timing: {metricsOverview.overview.eventTiming.points} points
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card variant="outlined" sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="subtitle1" gutterBottom>
                                    Environmental Impact Points
                                </Typography>
                                <Typography variant="body1">
                                    Energy Source: {metricsOverview.envImpact.energySource.points} points
                                </Typography>
                                <Typography variant="body1">
                                    Energy-Efficient Practices: {metricsOverview.envImpact.energyEfficientPractices.points} points
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card variant="outlined" sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="subtitle1" gutterBottom>
                                    Governance & Digital Points
                                </Typography>
                                <Typography variant="body1">
                                    Sustainability Policy: {metricsOverview.governance.sustainabilityPolicy.points} points
                                </Typography>
                                <Typography variant="body1">
                                    Reporting: {metricsOverview.governance.sustainabilityReporting.points} points
                                </Typography>
                                <Typography variant="body1">
                                    Vendor Evaluation: {metricsOverview.governance.vendorEvaluation.points} points
                                </Typography>
                                <Typography variant="body1">
                                    Independent Audit: {metricsOverview.governance.independentAudit.points} points
                                </Typography>
                                <Typography variant="body1">
                                    Digital Practices: {metricsOverview.governance.digitalPractices.points} points
                                </Typography>
                                <Typography variant="body1">
                                    Data Collection: {metricsOverview.governance.dataCollection.points} points
                                </Typography>
                                <Typography variant="body1">
                                    Performance Review: {metricsOverview.governance.performanceReviewFrequency.points} points
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card variant="outlined" sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="subtitle1" gutterBottom>
                                    Built‑in Sustainability Metrics
                                </Typography>
                                {Object.entries(metricInputs).map(([key]) => (
                                    <Typography key={key} variant="body1">
                                        <strong>{key}:</strong> {answersJson.builtIn[key] ?? 0} points
                                    </Typography>
                                ))}
                            </CardContent>
                        </Card>
                        <Typography variant="h6" sx={{ color: "green", mb: 2 }}>
                            Sustainability Factor: {calculatedScore} / 10
                        </Typography>
                        <Typography variant="body2">
                            Total Points Achieved: {totalPoints} out of 114 possible.
                        </Typography>
                        {submissionStatus && (
                            <Alert severity="info" sx={{ mt: 2 }}>
                                {submissionStatus}
                            </Alert>
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
                            <StepLabel
                                StepIconProps={{
                                    sx: {
                                        color: "green",
                                        "&.Mui-active": { color: "green" },
                                        "&.Mui-completed": { color: "green" },
                                    },
                                }}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Fade in={true} timeout={{ enter: 500, exit: 500 }} key={activeStep}>
                    <div>{renderStepContent(activeStep)}</div>
                </Fade>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                </Button>
                <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CalculateSustainabilityScoreDialog;
