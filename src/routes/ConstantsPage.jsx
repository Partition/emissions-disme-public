import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Paper,
    Button,
    Box,
    Typography,
    InputAdornment,
    Tooltip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { updateConstant, resetConstants } from '../store/constantsSlice';

// Helper function to check if a value is an object and not null
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

// Helper function to flatten nested objects
const flattenObject = (obj, parentKey = '', result = {}) => {
    Object.entries(obj).forEach(([key, value]) => {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (isObject(value) && key !== 'meta') {
            flattenObject(value, newKey, result);
        } else if (key !== 'meta') {
            result[newKey] = value;
        }
    });
    return result;
};

// Helper function to get meta information for a key
const getMetaInfo = (constants, category, key) => {
    const keyParts = key.split('.');
    const meta = constants[category].meta;
    let description, units, source;

    // Helper function to get nested value or _self
    const getNestedValueOrSelf = (obj, parts) => {
        if (!obj) return null;
        
        // For direct key matches (non-nested)
        if (parts.length === 1) {
            return obj[parts[0]] || null;
        }

        // For nested keys
        let current = obj;
        const fullPath = [];
        
        // Traverse the path
        for (const part of parts) {
            fullPath.push(part);
            
            if (!current[part]) {
                // If we can't go deeper but have a parent object, return parent's _self
                return current._self || null;
            }
            
            current = current[part];
            if (typeof current === 'string') {
                return current;
            }
        }

        // If we've reached the end of our path and have an object, 
        // prefer its _self value
        return current._self || null;
    };

    // For nested objects (e.g., MCF.XYTA_XYTY or AnnualDevelopmentRate.ORANGE_BITTER_ORANGE.JUVENILE)
    description = getNestedValueOrSelf(meta?.description, keyParts) || '';
    units = getNestedValueOrSelf(meta?.units, keyParts) || 'dimensionless';
    source = getNestedValueOrSelf(meta?.sources, keyParts) || '';

    return { description, units, source };
};

const getGreekCategoryName = (category) => {
    switch (category) {
        case 'GWP':
            return 'Δυναμικό Παγκόσμιας Σταθεράς Θέρμανσης';
        case 'Diesel':
            return 'Πετρέλαιο Ντίζελ';
        case 'Gasoline':
            return 'Βενζίνη';
        case 'LPG':
            return 'Υγραέριο (LPG)';
        case 'NaturalGas':
            return 'Φυσικό Αέριο';
        case 'WoodyBiomass':
            return 'Ξυλώδης Βιομάζα';
        case 'Electricity':
            return 'Ηλεκτρική Ενέργεια';
        case 'SolidWaste':
            return 'Στερεά Απόβλητα';
        case 'WastewaterTreatment':
            return 'Επεξεργασία Λυμάτων';
        case 'Composting':
            return 'Λιπασματοποίηση';
        case 'CO2Absorption':
            return 'Απορροφήσεις CO2';
        case 'Uncertainty':
            return 'Αβεβαιότητα';
        default:
            return category;
    }
};

const ConstantCategory = ({ category, categoryData, constants, onValueChange }) => {
    const flattenedData = flattenObject(categoryData);
    
    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{getGreekCategoryName(category)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '15%', fontWeight: 'bold' }}>Σταθερά</TableCell>
                                <TableCell style={{ width: '35%', fontWeight: 'bold' }}>Περιγραφή</TableCell>
                                <TableCell style={{ width: '20%', fontWeight: 'bold' }}>Τιμή</TableCell>
                                <TableCell style={{ width: '30%', fontWeight: 'bold' }}>Πηγή</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(flattenedData).map(([key, value]) => {
                                const metaInfo = getMetaInfo(constants, category, key);
                                return (
                                    <TableRow key={`${category}-${key}`}>
                                        <TableCell>{key}</TableCell>
                                        <TableCell>
                                                <Typography
                                                    style={{
                                                        maxWidth: '300px',
                                                        whiteSpace: 'normal'
                                                    }}
                                                >
                                                    {metaInfo.description}
                                                </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                value={value}
                                                onChange={(e) => onValueChange(category, key, parseFloat(e.target.value))}
                                                variant="outlined"
                                                size="small"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {metaInfo.units ? metaInfo.units != 'dimensionless' ? metaInfo.units : '' : ''}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                                <Typography
                                                    style={{
                                                        maxWidth: '550px',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {metaInfo.source}
                                                </Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    );
};

function ConstantsPage() {
    const constants = useSelector(state => state.constants);
    const dispatch = useDispatch();

    const handleValueChange = (category, key, value) => {
        if (!isNaN(value)) {
            dispatch(updateConstant({ category, key, value }));
        }
    };

    const resetToDefaults = () => {
        dispatch(resetConstants());
    };

    return (    
        <Box sx={{ pt: 2 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={resetToDefaults}
                >
                    Επαναφορά Προεπιλογών
                </Button>
            </Box>
            {Object.entries(constants).map(([category, categoryData]) => (
                <ConstantCategory
                    key={category}
                    category={category}
                    categoryData={categoryData}
                    constants={constants}
                    onValueChange={handleValueChange}
                />
            ))}
        </Box>
    );
}

export default ConstantsPage;