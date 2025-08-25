import { createSlice } from '@reduxjs/toolkit';

const emissionsSlice = createSlice({
    name: 'emissions',
    initialState: {
        // Store data by category number, allows for category-clear button
        tableData: {},
        // Store multi-entry data by entryKey
        multiEntryData: {},
        // Store validation state by category
        validationState: {
            // Structure: { categoryNumber: { errors: {}, touched: {}, showGlobalError: boolean } }
        }
    },
    reducers: {
        updateEmissionValue: (state, action) => {
            const { categoryNumber, rowId, variableName, value, error, touched } = action.payload;
            const row = state.tableData[categoryNumber].find(r => r.ID === rowId);
            if (row && variableName) {
                row.variables[variableName] = {
                    ...row.variables[variableName],
                    value,
                    error: error !== undefined ? error : row.variables[variableName].error,
                    touched: touched !== undefined ? touched : row.variables[variableName].touched
                };
            }
        },
        initializeCategory: (state, action) => {
            const { categoryNumber, initialData } = action.payload;
            state.tableData[categoryNumber] = initialData;
        },
        updateValidationState: (state, action) => {
            const { categoryNumber, errors, touched, showGlobalError } = action.payload;
            
            // Initialize the category validation state if it doesn't exist
            if (!state.validationState[categoryNumber]) {
                state.validationState[categoryNumber] = {
                    errors: {},
                    touched: {},
                    showGlobalError: false
                };
            }

            // Update the validation state for the category
            state.validationState[categoryNumber] = {
                ...state.validationState[categoryNumber],
                errors: { ...state.validationState[categoryNumber].errors, ...errors },
                touched: { ...state.validationState[categoryNumber].touched, ...touched },
                showGlobalError: showGlobalError || Object.values(errors).some(Boolean)
            };
        },
        // New reducer for initializing multi-entry data
        initializeMultiEntryData: (state, action) => {
            const { initialEntries } = action.payload;
            state.multiEntryData = { ...state.multiEntryData, ...initialEntries };
        },
        // New reducer for updating multi-entry data
        updateMultiEntryData: (state, action) => {
            const { entryKey, entries } = action.payload;
            state.multiEntryData[entryKey] = entries;
        },
        // New reducer for adding a multi-entry item
        addMultiEntryItem: (state, action) => {
            const { entryKey } = action.payload;
            const entries = [...(state.multiEntryData[entryKey] || [])];
            const newId = entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1;
            
            state.multiEntryData[entryKey] = [...entries, { id: newId, values: {} }];
        },
        // New reducer for removing a multi-entry item
        removeMultiEntryItem: (state, action) => {
            const { entryKey, entryId } = action.payload;
            const entries = [...(state.multiEntryData[entryKey] || [])].filter(entry => entry.id !== entryId);
            
            state.multiEntryData[entryKey] = entries.length ? entries : [{ id: 1, values: {} }]; // Always keep at least one entry
        },
        // New reducer for updating a specific multi-entry field value
        updateMultiEntryField: (state, action) => {
            const { entryKey, entryId, field, value } = action.payload;
            const entries = [...(state.multiEntryData[entryKey] || [])];
            const entryIndex = entries.findIndex(entry => entry.id === entryId);
            
            if (entryIndex !== -1) {
                entries[entryIndex] = {
                    ...entries[entryIndex],
                    values: {
                        ...entries[entryIndex].values,
                        [field]: value
                    }
                };
                
                state.multiEntryData[entryKey] = entries;
            }
        },
        clearCategory: (state, action) => {
            const categoryNumber = action.payload;
            if (state.tableData[categoryNumber]) {
                state.tableData[categoryNumber] = state.tableData[categoryNumber].map(row => ({
                    ...row,
                    value: "",
                    variables: Object.entries(row.variables || {}).reduce((acc, [key, variable]) => ({
                        ...acc,
                        [key]: {
                            ...variable,
                            value: '',
                            touched: false,
                            error: false
                        }
                    }), {})
                }));
                // Clear validation state for the category
                state.validationState[categoryNumber] = {
                    errors: {},
                    touched: {},
                    showGlobalError: false
                };
                
                // Clear multi-entry data for this category
                Object.keys(state.multiEntryData).forEach(key => {
                    if (key.startsWith(`${categoryNumber}-`)) {
                        state.multiEntryData[key] = [{ id: 1, values: {} }];
                    }
                });
            }
        },
        clearAllCategories: (state) => {
            Object.keys(state.tableData).forEach(categoryNumber => {
                state.tableData[categoryNumber] = state.tableData[categoryNumber].map(row => ({
                    ...row,
                    value: "",
                    variables: Object.entries(row.variables || {}).reduce((acc, [key, variable]) => ({
                        ...acc,
                        [key]: {
                            ...variable,
                            value: '',
                            touched: false,
                            error: false
                        }
                    }), {})
                }));
                // Clear validation state for all categories
                state.validationState[categoryNumber] = {
                    errors: {},
                    touched: {},
                    showGlobalError: false
                };
            });
            
            // Reset all multi-entry data
            Object.keys(state.multiEntryData).forEach(key => {
                state.multiEntryData[key] = [{ id: 1, values: {} }];
            });
        }
    }
});

export const { 
    updateEmissionValue, 
    initializeCategory, 
    clearCategory, 
    clearAllCategories,
    updateValidationState,
    initializeMultiEntryData,
    updateMultiEntryData,
    addMultiEntryItem,
    removeMultiEntryItem,
    updateMultiEntryField
} = emissionsSlice.actions;
export default emissionsSlice.reducer;
