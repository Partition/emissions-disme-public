import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
} from '@mui/material';

const IndicatorCard = ({ title, value, unit, description }) => (
    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
        <Typography variant="subtitle2" color="primary.main" gutterBottom>
            {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
            <Typography variant="h4" component="span" sx={{ mr: 1 }}>
                {typeof value === 'number' ? value.toFixed(2) : '-'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {unit}
            </Typography>
        </Box>
        {description && (
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                {description}
            </Typography>
        )}
    </Paper>
);

const ClimateIndicators = ({
    eCO2totalEmissions = 0,
    eCO2transportEmissions = 0,
    population = 0,
    buildingArea = 0,
    passengers = 0,
    baseYearEmissions = 0,
    absorptions = 0,
}) => {
    // Calculate net emissions eCO2 (total - absorptions)
    const netEmissions = Math.max(0, eCO2totalEmissions - absorptions);

    // Calculate indicators
    const indicator1 = population > 0 ? netEmissions / population : 0;
    const indicator2 = buildingArea > 0 ? eCO2totalEmissions / buildingArea : 0;
    const indicator3 = passengers > 0 ? eCO2transportEmissions / passengers : 0;
    const indicator4_2025 = baseYearEmissions > 0 ? ((eCO2totalEmissions - baseYearEmissions*0.9) / (baseYearEmissions*0.9)) * 100 : '--';
    const indicator5_2030 = baseYearEmissions > 0 ? ((eCO2totalEmissions - baseYearEmissions*0.7) / (baseYearEmissions*0.7)) * 100 : '--';
    const indicator6 = population > 0 ? absorptions / population : 0;

    const getGoalDescription = (indicator) => {
        if (typeof indicator !== 'number') {
            return "Απαιτούνται εκπομπές έτους βάσης για τον υπολογισμό.";
        }
        if (indicator > 0) {
            return `Μη επίτευξη στόχου. Οι εκπομπές είναι ${indicator.toFixed(2)}% πάνω από τον στόχο.`;
        }
        if (indicator < 0) {
            return `Επιτεύχθηκε ο στόχος! Οι εκπομπές είναι ${Math.abs(indicator).toFixed(2)}% κάτω από τον στόχο.`;
        }
        return "Ο στόχος επιτεύχθηκε ακριβώς.";
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.text' }}>
                Δείκτες Κλιματικής Απόδοσης (ΔΚΑ)
            </Typography>
            
            {/* First row - 3 cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                    <IndicatorCard
                        title="Δείκτης 1: Συνολική Κλιματική Επίδοση"
                        value={indicator1}
                        unit="tn CO2e/κάτοικος"
                        description="Συνολικές εκπομπές ανά κάτοικο"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <IndicatorCard
                        title="Δείκτης 2: Ανθρακικό Αποτύπωμα Κτιρίων"
                        value={indicator2}
                        unit="tn CO2e/m²"
                        description="Εκπομπές κτιρίων ανά τετραγωνικό μέτρο"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <IndicatorCard
                        title="Δείκτης 3: Μεταφορές ανά Επιβάτη"
                        value={indicator3}
                        unit="tn CO2e/επιβάτης"
                        description="Εκπομπές μεταφορών ανά επιβάτη"
                    />
                </Grid>
            </Grid>

            {/* Second row - 2 centered cards */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <IndicatorCard
                        title="Δείκτης 4: Eπίτευξη κλιματικού στόχου 2025"
                        value={indicator4_2025}
                        unit="%"
                        description={getGoalDescription(indicator4_2025)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <IndicatorCard
                        title="Δείκτης 5: Eπίτευξη κλιματικού στόχου 2030"
                        value={indicator5_2030}
                        unit="%"
                        description={getGoalDescription(indicator5_2030)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <IndicatorCard
                        title="Δείκτης 6: Απορροφήσεις CO2 ανά Κάτοικο"
                        value={indicator6}
                        unit="tn CO2e/κάτοικος"
                        description="Απορροφήσεις CO2 ανά κάτοικο"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default React.memo(ClimateIndicators); 