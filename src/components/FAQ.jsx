import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
    const [expanded, setExpanded] = React.useState([]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(
            isExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel),
        );
    };

    return (
        <Container
            id="faq"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
            }}
        >
            <Typography
                component="h2"
                variant="h4"
                sx={{
                    color: 'text.primary',
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                }}
            >
                Frequently Asked Questions
            </Typography>
            <Box sx={{ width: '100%' }}>
                {/* FAQ 1: Contact Support */}
                <Accordion
                    expanded={expanded.includes('panel1')}
                    onChange={handleChange('panel1')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                    >
                        <Typography component="span" variant="subtitle2">
                            How do I contact customer support if I have a question or issue?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                        >
                            You can reach our customer support team by emailing&nbsp;
                            <Link href="mailto:support@email.com">
                                support@email.com
                            </Link>
                            &nbsp;or calling our toll-free number. We’re here to assist you promptly.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/* FAQ 2: Refund/Cancellation Policy */}
                <Accordion
                    expanded={expanded.includes('panel2')}
                    onChange={handleChange('panel2')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2d-content"
                        id="panel2d-header"
                    >
                        <Typography component="span" variant="subtitle2">
                            What is your refund or cancellation policy for the subscription?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                        >
                            We offer a hassle-free cancellation policy. If you’re not completely satisfied with our service, you can cancel your subscription within a specified period for a full refund.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/* FAQ 3: Differentiating Features */}
                <Accordion
                    expanded={expanded.includes('panel3')}
                    onChange={handleChange('panel3')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3d-content"
                        id="panel3d-header"
                    >
                        <Typography component="span" variant="subtitle2">
                            What makes your sustainability tool stand out from others in the market?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                        >
                            Our product is unique because it seamlessly combines a free sustainability scoring tool with advanced premium features such as AI automation and automatic event detection. We also offer digital badges and a public leaderboard, setting the standard for event sustainability validation.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/* FAQ 4: Warranty & Ongoing Support */}
                <Accordion
                    expanded={expanded.includes('panel4')}
                    onChange={handleChange('panel4')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4d-content"
                        id="panel4d-header"
                    >
                        <Typography component="span" variant="subtitle2">
                            Is there a warranty or ongoing support for the tool?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                        >
                            Yes, our tool is backed by continuous updates and comprehensive customer support. We ensure that any issues related to performance or compliance with EU sustainability standards are promptly addressed.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/* FAQ 5: Measuring Sustainability */}
                <Accordion
                    expanded={expanded.includes('panel5')}
                    onChange={handleChange('panel5')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5d-content"
                        id="panel5d-header"
                    >
                        <Typography component="span" variant="subtitle2">
                            How does the app measure event sustainability?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                        >
                            Our app utilizes a combination of a simple user input form and AI-powered analysis to generate an accurate sustainability score. This method ensures transparency and helps organizers meet stringent EU ESG reporting requirements.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/* FAQ 6: Premium Features */}
                <Accordion
                    expanded={expanded.includes('panel6')}
                    onChange={handleChange('panel6')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel6d-content"
                        id="panel6d-header"
                    >
                        <Typography component="span" variant="subtitle2">
                            What are the benefits of upgrading to the premium version?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                        >
                            The premium version offers advanced features such as AI automation for completing sustainability questionnaires, automatic detection of events, enhanced dashboards, and digital badges that validate your event’s sustainability. These features help you meet strict ESG and EU reporting standards while improving overall event performance.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>
    );
}
