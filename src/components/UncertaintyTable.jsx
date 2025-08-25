import React from 'react';
import {
    Paper,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';

const UncertaintyTable = ({ uncertaintyData, constants }) => {
    if (!uncertaintyData || !uncertaintyData.byType) {
        return (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                Δεν υπάρχουν διαθέσιμα δεδομένα για την ανάλυση αβεβαιότητας.
            </Typography>
        );
    }

    const { byType, cumulated } = uncertaintyData;

    const getUncertaintyTypeLabel = (type) => {
        const labels = {
            'ELECTRICITY': 'Ηλεκτρική Ενέργεια',
            'LIQUID_FUELS': 'Υγρά Καύσιμα',
            'GAS_FUELS': 'Αέρια Καύσιμα',
            'SOLID_FUELS': 'Στερεά Καύσιμα',
            'COOLING': 'Ψυκτικά Υγρά',
            'WASTE_MANAGEMENT': 'Διαχείριση Αποβλήτων',
            'WASTEWATER_MANAGEMENT': 'Επεξεργασία Λυμάτων',
            'COMPOSTING': 'Λιπασματοποίηση'
        };
        return labels[type] || type;
    };

    const getCertaintyColor = (ranking) => {
        const colors = {
            'Excellent': 'success',
            'Very Good': 'info',
            'Good': 'primary',
            'Fair': 'warning',
            'Poor': 'error',
            'Very Poor': 'error'
        };
        return colors[ranking] || 'default';
    };

    const getCertaintyRankingGreek = (ranking) => {
        const translations = {
            'Excellent': 'Άριστη',
            'Very Good': 'Πολύ Καλή',
            'Good': 'Καλή',
            'Fair': 'Μέτρια',
            'Poor': 'Κακή',
            'Very Poor': 'Πολύ Κακή'
        };
        return translations[ranking] || ranking;
    };

    return (
        <>
            {Object.keys(byType).length > 0 ? (
                <>
                    <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                    <TableCell align="center" sx={{ 
                                        backgroundColor: 'primary.main',
                                        color: 'primary.contrastText',
                                        fontWeight: 'bold'
                                    }}>
                                        Κατηγορία Αβεβαιότητας
                                    </TableCell>
                                    <TableCell align="center" sx={{ 
                                        backgroundColor: 'primary.main',
                                        color: 'primary.contrastText',
                                        fontWeight: 'bold'
                                    }}>
                                        Συνολικές Εκπομπές (mt CO2e)
                                    </TableCell>
                                    <TableCell align="center" sx={{ 
                                        backgroundColor: 'primary.main',
                                        color: 'primary.contrastText',
                                        fontWeight: 'bold'
                                    }}>
                                        Αβεβαιότητα (±%)
                                    </TableCell>
                                    <TableCell align="center" sx={{ 
                                        backgroundColor: 'primary.main',
                                        color: 'primary.contrastText',
                                        fontWeight: 'bold'
                                    }}>
                                        Απόλυτη Αβεβαιότητα (±mt CO2e)
                                    </TableCell>
                                    <TableCell align="center" sx={{ 
                                        backgroundColor: 'primary.main',
                                        color: 'primary.contrastText',
                                        fontWeight: 'bold'
                                    }}>
                                        Εύρος Εκπομπών
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(byType).map(([type, data]) => {
                                    if (!data || !data.uncertainty || !data.totalEmissions || data.totalEmissions.co2e <= 0) return null;
                                    
                                    const { totalEmissions, uncertainty } = data;
                                    
                                    // Add safety checks for undefined values
                                    if (uncertainty.relative === undefined || uncertainty.absolute === undefined || 
                                        uncertainty.lower === undefined || uncertainty.upper === undefined) {
                                        console.warn(`Missing uncertainty properties for type ${type}:`, uncertainty);
                                        return null;
                                    }
                                    
                                    return (
                                        <TableRow key={type} hover>
                                            <TableCell align="center" sx={{ fontWeight: 500 }}>
                                                {getUncertaintyTypeLabel(type)}
                                            </TableCell>
                                            <TableCell align="center">
                                                {totalEmissions.co2e.toFixed(2)}
                                            </TableCell>
                                            <TableCell align="center">
                                                ±{uncertainty.relative.toFixed(1)}%
                                            </TableCell>
                                            <TableCell align="center">
                                                ±{uncertainty.absolute.toFixed(2)}
                                            </TableCell>
                                            <TableCell align="center">
                                                {uncertainty.lower.toFixed(2)} - {uncertainty.upper.toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {cumulated && (
                        <Box sx={{ mt: 4, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                Συνολική Αβεβαιότητα (Cumulated Uncertainty)
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                                <Typography variant="body1">
                                    <strong>Συνολικές Εκπομπές:</strong> {cumulated.totalEmissions.toFixed(2)} mt CO2e
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Αβεβαιότητα:</strong> ±{cumulated.cumulatedUncertainty.toFixed(1)}%
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Απόλυτη Αβεβαιότητα:</strong> ±{cumulated.absolute.toFixed(2)} mt CO2e
                                </Typography>
                                <Chip 
                                    label={`Βαθμολογία: ${getCertaintyRankingGreek(cumulated.certaintyRanking)}`}
                                    color={getCertaintyColor(cumulated.certaintyRanking)}
                                    sx={{ fontWeight: 'bold' }}
                                />
                            </Box>
                        </Box>
                    )}
                </>
            ) : (
                <Typography variant="body2" color="textSecondary">
                    Δεν υπάρχουν διαθέσιμα δεδομένα εκπομπών για την ανάλυση αβεβαιότητας.
                </Typography>
            )}
        </>
    );
};

export default UncertaintyTable;