import React, { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    TextField,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    Checkbox,
    Grid,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button
} from '@mui/material';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { calculateCO2e } from '../config/emissionFuncs';
import ClimateIndicators from '../components/ClimateIndicators';
import UncertaintyTable from '../components/UncertaintyTable';
import { updateUncertaintyResults } from '../store/emissionsResultsSlice';
import {
    getPopulationValue,
    getPassengersValue,
    getCO2Absorptions,
    getBuildingEmissions,
    getTransportEmissions,
    getTotalEmissionsExcludingAbsorptions,
    getBuildingArea,
    calculateUncertaintyAnalysis
} from '../utils/emissionsDataUtils';

// Move EmissionsTable outside of ReportPage to prevent infinite re-renders
const EmissionsTable = ({ title, data, readOnly = false, constants, onTotalChange }) => {
    // State to track input values for each scope and gas
    const [emissionsData, setEmissionsData] = useState({
        1: { co2: '', ch4: '', n2o: '' },
        2: { co2: '', ch4: '', n2o: '' },
        "-1": { co2: '', ch4: '', n2o: '' }
    });

    const emissionsResults = useSelector(state => state.emissionsResults);

    // Handle input change
    const handleInputChange = (scope, gas, value) => {
        setEmissionsData(prev => ({
            ...prev,
            [scope]: {
                ...prev[scope],
                [gas]: value
            }
        }));
    };

    // Calculate total for a scope
    const calculateTotal = (scope, values) => {
        const co2 = parseFloat(values.co2) || 0;
        const ch4 = parseFloat(values.ch4) || 0;
        const n2o = parseFloat(values.n2o) || 0;
        return calculateCO2e(co2, ch4, n2o, constants);
    };

    // Calculate column totals
    const calculateColumnTotals = () => {
        let totals = {
            co2e: 0,
            co2: 0,
            ch4: 0,
            n2o: 0
        };

        if (readOnly) {
            // For readonly mode, use emissions results
            [1, 2].forEach(scope => {
                const scopeData = emissionsResults?.totals?.byScope?.[scope] || {};
                totals.co2e += calculateCO2e(
                    scopeData.co2 || 0,
                    scopeData.ch4 || 0,
                    scopeData.n2o || 0,
                    constants
                );
                totals.co2 += parseFloat(scopeData.co2) || 0;
                totals.ch4 += parseFloat(scopeData.ch4) || 0;
                totals.n2o += parseFloat(scopeData.n2o) || 0;
            });

            // Subtract absorptions
            const absorptionsData = emissionsResults?.totals?.byScope?.["-1"] || {};
            const absorptionsTotal = calculateCO2e(
                absorptionsData.co2 || 0,
                absorptionsData.ch4 || 0,
                absorptionsData.n2o || 0,
                constants
            );
            totals.co2e += absorptionsTotal;
            totals.co2 += parseFloat(absorptionsData.co2) || 0;
            totals.ch4 += parseFloat(absorptionsData.ch4) || 0;
            totals.n2o += parseFloat(absorptionsData.n2o) || 0;
        } else {
            // For editable mode, use emissions data
            [1, 2].forEach(scope => {
                const scopeValues = emissionsData[scope];
                totals.co2e += calculateTotal(scope, scopeValues);
                totals.co2 += parseFloat(scopeValues.co2) || 0;
                totals.ch4 += parseFloat(scopeValues.ch4) || 0;
                totals.n2o += parseFloat(scopeValues.n2o) || 0;
            });

            // Subtract absorptions
            const absorptionsValues = emissionsData["-1"];
            totals.co2e += calculateTotal('absorptions', absorptionsValues);
            totals.co2 += parseFloat(absorptionsValues.co2) || 0;
            totals.ch4 += parseFloat(absorptionsValues.ch4) || 0;
            totals.n2o += parseFloat(absorptionsValues.n2o) || 0;
        }

        return totals;
    };

    const renderScopeRow = (scope) => {
        if (readOnly) {
            const scopeData = emissionsResults?.totals?.byScope?.[scope] || {};
            const total = calculateCO2e(
                scopeData.co2 || 0,
                scopeData.ch4 || 0,
                scopeData.n2o || 0,
                constants
            );

            return (
                <>
                    <TableCell>
                        <TextField
                            fullWidth
                            size="small"
                            value={total?.toFixed(2) || '-'}
                            disabled
                            sx={{
                                "& fieldset": { border: 'none' },
                                "& input": { textAlign: 'center' }
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            fullWidth
                            size="small"
                            value={scopeData.co2?.toFixed(2) || '-'}
                            disabled
                            sx={{
                                "& input": { textAlign: 'center' }
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            fullWidth
                            size="small"
                            value={scopeData.ch4?.toFixed(2) || '-'}
                            disabled
                            sx={{
                                "& input": { textAlign: 'center' }
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            fullWidth
                            size="small"
                            value={scopeData.n2o?.toFixed(2) || '-'}
                            disabled
                            sx={{
                                "& input": { textAlign: 'center' }
                            }}
                        />
                    </TableCell>
                </>
            );
        }

        const scopeValues = emissionsData[scope];
        const total = calculateTotal(scope, scopeValues);

        return (
            <>
                <TableCell>
                    <TextField
                        fullWidth
                        size="small"
                        value={total.toFixed(2)}
                        disabled
                        sx={{
                            "& fieldset": { border: 'none' },
                            "& input": { textAlign: 'center' }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        fullWidth
                        size="small"
                        value={scopeValues.co2}
                        onChange={(e) => handleInputChange(scope, 'co2', e.target.value)}
                        sx={{
                            "& input": { textAlign: 'center' }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        fullWidth
                        size="small"
                        value={scopeValues.ch4}
                        onChange={(e) => handleInputChange(scope, 'ch4', e.target.value)}
                        sx={{
                            "& input": { textAlign: 'center' }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        fullWidth
                        size="small"
                        value={scopeValues.n2o}
                        onChange={(e) => handleInputChange(scope, 'n2o', e.target.value)}
                        sx={{
                            "& input": { textAlign: 'center' }
                        }}
                    />
                </TableCell>
            </>
        );
    };

    const totals = calculateColumnTotals();

    useEffect(() => {
        if (onTotalChange && !readOnly) {
            onTotalChange(totals.co2e);
        }
    }, [totals.co2e, onTotalChange, readOnly]);

    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'primary.main' }}>
                        <TableCell align="center" sx={{ 
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                            fontWeight: 'bold'
                        }}>Κατηγορία</TableCell>
                        <TableCell align="center" sx={{ 
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                            fontWeight: 'bold'
                        }}>Σύνολο CO2e (mt)</TableCell>
                        <TableCell align="center" sx={{ 
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                            fontWeight: 'bold'
                        }}>CO2 (mt)</TableCell>
                        <TableCell align="center" sx={{ 
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                            fontWeight: 'bold'
                        }}>CH4 (mt)</TableCell>
                        <TableCell align="center" sx={{ 
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                            fontWeight: 'bold'
                        }}>N2O (mt)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 500 }}>Scope 1</TableCell>
                        {renderScopeRow(1)}
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 500 }}>Scope 2</TableCell>
                        {renderScopeRow(2)}
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 500 }}>Απορροφήσεις CO2</TableCell>
                        {renderScopeRow('-1')}
                    </TableRow>
                    <TableRow sx={{ backgroundColor: 'grey.100', fontWeight: 'bold' }}>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Καθαρό Σύνολο</TableCell>
                        <TableCell>
                            <TextField
                                fullWidth
                                size="small"
                                value={totals.co2e.toFixed(2)}
                                disabled
                                sx={{
                                    "& fieldset": { border: 'none' },
                                    "& input": { 
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                fullWidth
                                size="small"
                                value={totals.co2.toFixed(2)}
                                disabled
                                sx={{
                                    "& fieldset": { border: 'none' },
                                    "& input": { 
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                fullWidth
                                size="small"
                                value={totals.ch4.toFixed(2)}
                                disabled
                                sx={{
                                    "& fieldset": { border: 'none' },
                                    "& input": { 
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                fullWidth
                                size="small"
                                value={totals.n2o.toFixed(2)}
                                disabled
                                sx={{
                                    "& fieldset": { border: 'none' },
                                    "& input": { 
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }
                                }}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const ReportPage = () => {
    const dispatch = useDispatch();
    const constants = useSelector(state => state.constants);
    const emissionsResults = useSelector(state => state.emissionsResults);
    const emissionsState = useSelector(state => state.emissions);
    const store = useStore();
    
    const [entityInfo, setEntityInfo] = useState({
        name: '',
        year: '',
        excludedFacilities: '',
        periodFrom: '',
        periodTo: '',
        approach: '',
    });

    // Indicators state
    const [indicatorsData, setIndicatorsData] = useState({
        buildingArea: '',
        year2019Emissions: '',
    });

    // Reporter's information state
    const [reporterInfo, setReporterInfo] = useState({
        verificationDate: '',
        verifier: '',
        email: '',
        phone: '',
        address: ''
    });

    // Get dynamic values from Redux store
    const populationValue = getPopulationValue(emissionsState);
    const passengersValue = getPassengersValue(emissionsState);
    const buildingArea = getBuildingArea(emissionsState);
    const absorptions = getCO2Absorptions(emissionsResults, constants);
    const buildingEmissions = getBuildingEmissions(emissionsResults, constants);
    const transportEmissions = getTransportEmissions(emissionsResults, constants);
    const totalEmissions = getTotalEmissionsExcludingAbsorptions(emissionsResults, constants);

    // Calculate uncertainty analysis when emissions change
    useEffect(() => {
        if (emissionsResults && Object.keys(emissionsResults.results).length > 0) {
            const uncertaintyAnalysis = calculateUncertaintyAnalysis(emissionsResults, constants);
            
            // Only dispatch if uncertainty data actually changed to prevent infinite loops
            const currentUncertainty = emissionsResults.uncertainty;
            const hasChanged = !currentUncertainty || 
                JSON.stringify(currentUncertainty.byType) !== JSON.stringify(uncertaintyAnalysis.byType) ||
                JSON.stringify(currentUncertainty.cumulated) !== JSON.stringify(uncertaintyAnalysis.cumulated);
            
            if (hasChanged) {
                dispatch(updateUncertaintyResults(uncertaintyAnalysis));
            }
        }
    }, [emissionsResults.results, constants, dispatch]);

    const handleDownload = useCallback(() => {
        const state = store.getState();
        const jsonString = JSON.stringify(state, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'emissions_data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [store]);

    // Base year emissions state
    const [baseYearEmissions, setBaseYearEmissions] = useState({
        year: '',
        policy: '',
        context: '',
        emissions: {
            scope1: { co2: '', ch4: '', n2o: ''},
            scope2: { co2: '', ch4: '', n2o: ''}
        }
    });

    // Optional information state
    const [optionalInfo, setOptionalInfo] = useState({
        legalEntities: [],
        emissionsBySource: {
            scope1: {
                stationary: '',
                mobile: '',
                process: '',
                fugitive: '',
                agricultural: ''
            },
            scope2: {
                electricity: '',
                steam: '',
                heating: '',
                cooling: ''
            }
        },
        facilitiesOver10k: [],
        countriesData: [],
        ownGeneration: '',
        purchasedForResale: ''
    });

    const [baseYearTotalCO2e, setBaseYearTotalCO2e] = useState(0);

    return (
        <Container sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                {/* Header Section */}
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Απογραφή Εκπομπών Αερίων Θερμοκηπίου
                    </Typography>
                    <TextField
                        fullWidth
                        label="Όνομα Δήμου"
                        sx={{ mb: 2 }}
                        onChange={(e) => setEntityInfo({ ...entityInfo, name: e.target.value })}
                    />
                    <DatePicker
                        label="Έτος Απογραφής" views={['year']}
                        onChange={(value) => setEntityInfo({ ...entityInfo, year: value.year() })}
                    />
                </Box>

                {/* Reporter's Information */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.text' }}>
                        Στοιχεία Υπεύθυνου Απογραφής
                    </Typography>
                    
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label="Ημερομηνία Επαλήθευσης (MM/DD/YYYY)"
                                onChange={(value) => setReporterInfo({ ...reporterInfo, verificationDate: value.toDate() })}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Ονοματεπώνυμο"
                                value={reporterInfo.verifier}
                                onChange={(e) => setReporterInfo({ ...reporterInfo, verifier: e.target.value })}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={reporterInfo.email}
                                onChange={(e) => setReporterInfo({ ...reporterInfo, email: e.target.value })}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Τηλέφωνο"
                                value={reporterInfo.phone}
                                onChange={(e) => setReporterInfo({ ...reporterInfo, phone: e.target.value })}
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Διεύθυνση"
                                multiline
                                rows={3}
                                value={reporterInfo.address}
                                onChange={(e) => setReporterInfo({ ...reporterInfo, address: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Required Information */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.text' }}>
                        Απαιτούμενες Πληροφορίες
                    </Typography>
                    <TextField
                        label="Εξαιρούμενες εγκαταστάσεις/λειτουργίες"
                        multiline
                        fullWidth
                        rows={2}
                        sx={{ mb: 2 }}
                        onChange={(e) => setEntityInfo({ ...entityInfo, excludedFacilities: e.target.value })}
                    />
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <DatePicker label="Περίοδος Αναφοράς Από"
                                onChange={(value) => setEntityInfo({ ...entityInfo, periodFrom: value.toDate() })}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <DatePicker label="Περίοδος Αναφοράς Έως"
                                onChange={(value) => setEntityInfo({ ...entityInfo, periodTo: value.toDate() })}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Emissions Information */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.text' }}>
                        Πληροφορίες Εκπομπών
                    </Typography>

                    <EmissionsTable readOnly={true} constants={constants} />
                </Box>

                {/* Uncertainty Analysis */}
                <Box sx={{ my: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.text' }}>
                        Ανάλυση Αβεβαιότητας (IPCC Guidelines)
                    </Typography>
                    <UncertaintyTable 
                        uncertaintyData={emissionsResults.uncertainty} 
                        constants={constants} 
                    />
                </Box>

                {/* Base Year */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.text' }}>
                        Έτος Βάσης
                    </Typography>

                    <DatePicker
                        fullWidth
                        label="Επιλεγμένο έτος βάσης"
                        value={entityInfo.baseYear}
                        views={['year']}
                        onChange={(e) => setBaseYearEmissions({ ...baseYearEmissions, year: e.year() })}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Διευκρίνιση πολιτικής ορισμού του έτους βάσης"
                        multiline
                        rows={2}
                        sx={{ mb: 2 }}
                    />

                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                        Εκπομπές Έτους Βάσης
                    </Typography>
                    <EmissionsTable 
                        title="Εκπομπές Έτους Βάσης" 
                        data={baseYearEmissions} 
                        readOnly={false} 
                        constants={constants}
                        onTotalChange={setBaseYearTotalCO2e}
                    />
                </Box>
                
                {/* Climate Indicators */}
                <ClimateIndicators
                    eCO2totalEmissions={totalEmissions.co2e}
                    eCO2buildingEmissions={buildingEmissions.co2e}
                    eCO2transportEmissions={transportEmissions.co2e}
                    population={parseFloat(populationValue) || 0}
                    buildingArea={parseFloat(buildingArea) || 0}
                    passengers={parseFloat(passengersValue) || 0}
                    baseYearEmissions={baseYearTotalCO2e}
                    absorptions={absorptions.co2e}
                />

                <Box sx={{ mt: 5, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Για να κατεβάσετε τα δεδομένα της εφαρμογής (τιμές σταθερών, εκπομπές, τιμές πεδίων  του πίνακα κλπ), πατήστε το κουμπί απο κάτω.
                    </Typography>
                    <Button sx={{ mt: 1 }} variant="contained" onClick={handleDownload}>
                        Download JSON
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ReportPage;
