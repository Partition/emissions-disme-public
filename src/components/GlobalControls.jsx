import React from 'react';
import { Box, Button, Alert, Collapse, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { clearCategory, clearAllCategories, updateValidationState } from '../store/emissionsSlice';
import { resetResults, clearResultsForCategory, getEmissionsByUncertaintyType } from '../store/emissionsResultsSlice';
import tableData from '../config/tableData.json';
import { useNavigate } from 'react-router';

const GlobalControls = ({ currentCategory }) => {
    const dispatch = useDispatch();
    const allTableData = useSelector(state => state.emissions.tableData);
    const allValidationStates = useSelector(state => state.emissions.validationState);
    const multiEntryData = useSelector(state => state.emissions.multiEntryData);
    const emissionsResults = useSelector(state => state.emissionsResults);
    const emissionsByUncertaintyType = useSelector(getEmissionsByUncertaintyType);
    const navigate = useNavigate();
    // Show global error if any category has errors
    const showGlobalError = Object.values(allValidationStates).some(state => 
        state && state.showGlobalError
    );

    // Get categories with errors
    const getCategoriesWithErrors = () => {
        return Object.entries(allValidationStates)
            .filter(([catNum, state]) => {
                return state && state.showGlobalError;
            })
            .map(([catNum]) => {
                return `${catNum}. ${tableData[catNum].Category}`;
            });
    };

    // Validation function
    const validateValue = (value) => {
        if (value === "") return true;
        if (typeof value === 'string') {
            return /^(0|[1-9]\d*)(\.\d+)?$/.test(value);
        }
        return true;
    };

    // Validate multi-entry fields
    const validateMultiEntry = (entries) => {
        if (!entries || entries.length === 0) return true;
        
        // Check if any entry has empty required fields
        return !entries.some(entry => {
            const values = entry.values || {};
            // Check if all fields have values
            return Object.values(values).some(value => value === "" || value === undefined);
        });
    };

    // Check if any category has errors and update validation states
    const updateValidationStates = () => {
        let hasAnyErrors = false;

        // Check all categories for errors
        Object.entries(allTableData).forEach(([catNum, catRows]) => {
            const categoryErrors = {};
            const categoryTouched = {};
            
            catRows.forEach(row => {
                // Check variables in each row
                if (row.variables) {
                    Object.entries(row.variables).forEach(([varName, varData]) => {
                        const fieldId = `${row.ID}-${varName}`;
                        if (varData.isMultiEntry) {
                            // Validate multi-entry fields
                            const entryKey = `${row.ID}-${varName}`;
                            const entries = multiEntryData[entryKey];
                            const isValid = validateMultiEntry(entries);
                            categoryErrors[fieldId] = !isValid;
                            categoryTouched[fieldId] = true;
                        } else if (varData.value !== "") {
                            // Validate regular fields
                            // For select fields (like field 5.7), just check if they have a value
                            let isValid = false;
                            if (varData.type === 'select' || row.ID === '5.7') {
                                // Select fields are valid if they have a value
                                isValid = varData.value !== "";
                            } else {
                                // For non-select fields, validate numeric format
                                isValid = validateValue(varData.value);
                            }
                            categoryErrors[fieldId] = !isValid;
                            categoryTouched[fieldId] = true;
                        }
                    });
                }
            });

            const categoryHasErrors = Object.values(categoryErrors).some(Boolean);
            hasAnyErrors = hasAnyErrors || categoryHasErrors;
            // Update validation state for this category
            dispatch(updateValidationState({
                categoryNumber: catNum,
                errors: categoryErrors,
                touched: categoryTouched,
                showGlobalError: categoryHasErrors
            }));
        });

        return hasAnyErrors;
    };

    // Handle form submission check
    const handleCheck = () => {
        const hasErrors = updateValidationStates();

        if (!hasErrors) {
            // Log emissions data for development
            console.group('Emissions Data Summary');
            
            // Log total emissions
            console.log('Total Emissions Across All Categories:', emissionsResults.totals.total);
            
            // Log emissions by scope
            console.group('Emissions by Scope:');
            Object.entries(emissionsResults.totals.byScope).forEach(([scope, emissions]) => {
                console.log(`Scope ${scope}:`, emissions);
            });
            console.groupEnd();
            
            // Log detailed field breakdown
            console.group('Field-by-Field Breakdown:');
            Object.entries(emissionsResults.results).forEach(([key, result]) => {
                console.group(`Field ${key}`);
                console.log('Category:', result.categoryNumber);
                console.log('Field ID:', result.fieldId);
                console.log('Entry Index:', result.entryIndex);
                console.log('Scope:', result.scope);
                console.log('Uncertainty Type:', result.uncertaintyType);
                console.log('Emissions:', result.emissions);
                console.groupEnd();
            });
            console.groupEnd();
            
            // Log emissions grouped by uncertainty type
            console.group('Emissions by Uncertainty Type:');
            Object.entries(emissionsByUncertaintyType).forEach(([uncertaintyType, data]) => {
                console.group(`${uncertaintyType} (${data.count} fields)`);
                console.log('Total Emissions:', data.totalEmissions);
                console.log('Fields:', data.fields.map(f => `${f.categoryNumber}-${f.fieldId}-${f.entryIndex}`));
                console.groupEnd();
            });
            console.groupEnd();
            
            console.groupEnd();
            navigate('/report');
        }
    };

    // Handle clearing current category
    const handleClearCategory = () => {
        dispatch(clearCategory(currentCategory));
        dispatch(clearResultsForCategory(currentCategory));
    };

    // Handle clearing all categories
    const handleClearAll = () => {
        dispatch(clearAllCategories());
        dispatch(resetResults());
    };

    const errorCategories = getCategoriesWithErrors();

    return (
        <Box sx={{ mb: 2, top: 0, zIndex: 1, pt: 2 }}>
            <Collapse in={showGlobalError}>
                <Alert 
                    severity="error" 
                    sx={{ 
                        mb: 2,
                        border: '1px solid',
                        borderColor: 'error.light',
                        borderRadius: 1,
                        width: 'fit-content',
                        maxWidth: '100%'
                    }}
                >
                    <Typography variant="body1">
                        Παρακαλούμε διορθώστε τα σφάλματα πριν την επιβεβαίωση
                    </Typography>
                    {errorCategories.length > 0 && (
                        <Typography 
                            variant="body2" 
                            sx={{ mt: 1 }}
                        >
                            Σφάλματα στις κατηγορίες: {errorCategories.join(', ')}
                        </Typography>
                    )}
                </Alert>
            </Collapse>
            <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button 
                    variant="outlined" 
                    color="warning" 
                    onClick={handleClearCategory}
                >
                    Καθαρισμος
                </Button>
                <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={handleClearAll}
                >
                    Καθαρισμος Ολων
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleCheck}
                >
                    Επιβεβαιωση
                </Button>
            </Box>
        </Box>
    );
};

export default GlobalControls; 