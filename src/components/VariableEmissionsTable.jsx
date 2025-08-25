import { useState, useEffect, Fragment } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Collapse,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
  Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { 
  updateEmissionValue, 
  initializeCategory, 
  updateValidationState,
  initializeMultiEntryData,
  updateMultiEntryField,
  addMultiEntryItem,
  removeMultiEntryItem
} from '../store/emissionsSlice';
import { 
  setFieldResult,
  clearFieldResults
} from '../store/emissionsResultsSlice';
import tableData from '../config/tableData.json';
import { emissionCalculators } from '../config/emissionMappings';
import { 
  calculateSingleRefrigerantCO2,
  calculateSingleTreeAbsorptionByArea,
  calculateSingleTreeAbsorptionByCount
} from '../config/emissionFuncs';

const VariableEmissionsTable = ({ categoryNumber }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const rows = useSelector(state => state.emissions.tableData[categoryNumber] || []);
  const multiEntries = useSelector(state => state.emissions.multiEntryData || {});
  const validationState = useSelector(state => state.emissions.validationState[categoryNumber] || {});
  const constants = useSelector(state => state.constants);
  const emissionResults = useSelector(state => state.emissionsResults.results);
  const [expandedRows, setExpandedRows] = useState({});

  // Initialize rows if they don't exist
  useEffect(() => {
    if (!rows.length) {
      const newData = tableData[categoryNumber].Fields || [];
      const initialRows = newData.map((field) => ({
        ...field,
        variables: Object.entries(field.variables || {}).reduce((acc, [key, data]) => ({
          ...acc,
          [key]: { 
            value: '', 
            touched: false, 
            error: false,
            name: data.name,
            unit: data.unit,
            type: data.type || 'text',
            options: data.options || [],
            isMultiEntry: data.isMultiEntry || false,
            multiEntryFields: data.multiEntryFields || []
          }
        }), {})
      }));
      dispatch(initializeCategory({ categoryNumber, initialData: initialRows }));
      
      // Initialize multi-entries for applicable fields
      const initialMultiEntries = {};
      initialRows.forEach(row => {
        Object.entries(row.variables).forEach(([key, variable]) => {
          if (variable.isMultiEntry) {
            const entryKey = `${row.ID}-${key}`;
            // Only initialize if it doesn't already exist in the store
            if (!multiEntries[entryKey]) {
              initialMultiEntries[entryKey] = [{ id: 1, values: {} }];
            }
          }
        });
      });
      
      if (Object.keys(initialMultiEntries).length > 0) {
        dispatch(initializeMultiEntryData({ initialEntries: initialMultiEntries }));
      }
    }
  }, [categoryNumber, dispatch, rows.length, multiEntries]);

  // Update emissions whenever relevant data changes
  useEffect(() => {
    rows.forEach(row => {
      // Clear previous results for this field to avoid stale data
      dispatch(clearFieldResults({ categoryNumber, fieldId: row.ID }));

      // For each row, calculate emissions and dispatch results to the store
      const resultsToDispatch = calculateEmissions(row);
      resultsToDispatch.forEach(({ key, result }) => {
        dispatch(setFieldResult({ key, result }));
      });
    });
  }, [rows, constants, multiEntries, categoryNumber, dispatch]);

  const handleExpandClick = (rowId) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

  const validateValue = (value) => {
    if (value === "") return true;
    return /^(0|[1-9]\d*)(\.\d+)?$/.test(value);
  };

  const handleVariableChange = (rowId, variableName, value) => {
    const normalizedValue = typeof value === 'string' ? value.replace(',', '.') : value;
    dispatch(updateEmissionValue({
      categoryNumber,
      rowId,
      variableName,
      value: normalizedValue
    }));
  };

  const handleVariableBlur = (rowId, variableName, value, type = 'text') => {
    const normalizedValue = typeof value === 'string' ? value.replace(',', '.') : value;
    
    // Validate based on field type
    let isValid = true;
    if (type === 'select') {
      // Select fields must have a value to be valid
      isValid = normalizedValue !== '';
    } else {
      // For numeric fields, they should be filled (required)
      if (normalizedValue === "") {
        isValid = false;
      } else {
        isValid = typeof normalizedValue === 'string' ? validateValue(normalizedValue) : true;
      }
    }
    
    // Update both the field state and validation state
    const fieldId = `${rowId}-${variableName}`;
    const errors = {
      ...validationState.errors,
      [fieldId]: !isValid
    };
    const touched = {
      ...validationState.touched,
      [fieldId]: true
    };
    
    // Update validation state
    dispatch(updateValidationState({
      categoryNumber,
      errors,
      touched,
      showGlobalError: Object.values(errors).some(Boolean)
    }));

    // Update field state
    dispatch(updateEmissionValue({
      categoryNumber,
      rowId,
      variableName,
      value: normalizedValue,
      error: !isValid,
      touched: true
    }));
  };

  // Handle multi-entry field changes
  const handleMultiEntryChange = (entryKey, entryId, field, value) => {
    dispatch(updateMultiEntryField({
      entryKey,
      entryId,
      field,
      value
    }));
  };

  // Add a new entry for multi-entry fields
  const addMultiEntry = (entryKey) => {
    dispatch(addMultiEntryItem({
      entryKey
    }));
  };

  // Remove an entry from multi-entry fields
  const removeMultiEntry = (entryKey, entryId) => {
    dispatch(removeMultiEntryItem({
      entryKey,
      entryId
    }));
  };

  const calculateEmissions = (row) => {
    const calculator = emissionCalculators[row.ID];
    if (!calculator) return [];
  
    const scope = tableData[categoryNumber].Fields.find(field => field.ID === row.ID)?.scope;
    if (scope === undefined) return [];
  
    // Get uncertainty type from tableData
    const uncertaintyType = tableData[categoryNumber].Fields.find(field => field.ID === row.ID)?.uncertaintyType || '';
  
    // Special handling for multi-entry refrigerant calculations
    if (row.ID === '1.6') {
      const multiEntryVar = Object.entries(row.variables).find(([, data]) => data.isMultiEntry);
      if (!multiEntryVar) return [];
      
      const entryKey = `${row.ID}-${multiEntryVar[0]}`;
      const entries = multiEntries[entryKey] || [];
  
      return entries.map(entry => {
        const emissions = {
          co2: calculateSingleRefrigerantCO2(entry.values),
          ch4: 0,
          n2o: 0,
        };
        const key = `${categoryNumber}-${row.ID}-${entry.id}`;
        const result = {
          scope,
          emissions,
          categoryNumber,
          fieldId: row.ID,
          entryIndex: entry.id,
          uncertaintyType,
        };
        return { key, result };
      });
    }
  
    // Special handling for multi-entry tree absorption calculations
    if (row.ID === '7.1.1' || row.ID === '7.1.2') {
      const multiEntryVar = Object.entries(row.variables).find(([, data]) => data.isMultiEntry);
      if (!multiEntryVar) return [];

      const entryKey = `${row.ID}-${multiEntryVar[0]}`;
      const entries = multiEntries[entryKey] || [];
      const pruningMass = parseFloat(row.variables.pruningMass?.value) || 0;
      const area = row.ID === '7.1.1' ? parseFloat(row.variables.area?.value) || 0 : 0;

      // When there are no entries, we might still need to account for pruning emissions
      if (entries.length === 0) {
        const pruningEmissions = (pruningMass || 0) * (1 - constants.CO2Absorption.WOOD_MOISTURE_CONTENT) * constants.CO2Absorption.WOOD_CARBON_CONTENT * (44/12);
        const key = `${categoryNumber}-${row.ID}-pruning`;
        const result = {
          scope,
          emissions: { co2: pruningEmissions, ch4: 0, n2o: 0 },
          categoryNumber,
          fieldId: row.ID,
          entryIndex: 'pruning',
          uncertaintyType,
        };
        return [{ key, result }];
      }
      
      return entries.map(entry => {
        let absorption = 0;
        if (row.ID === '7.1.1') {
          absorption = calculateSingleTreeAbsorptionByArea(area, entry.values, constants);
        } else {
          absorption = calculateSingleTreeAbsorptionByCount(entry.values, constants);
        }

        const pruningEmissions = (pruningMass || 0) * (1 - constants.CO2Absorption.WOOD_MOISTURE_CONTENT) * constants.CO2Absorption.WOOD_CARBON_CONTENT * (44/12);
        
        const emissions = {
          co2: -(absorption - (pruningEmissions / entries.length)), // Distribute pruning across entries
          ch4: 0,
          n2o: 0,
        };
        
        const key = `${categoryNumber}-${row.ID}-${entry.id}`;
        const result = {
          scope,
          emissions,
          categoryNumber,
          fieldId: row.ID,
          entryIndex: entry.id,
          uncertaintyType,
        };
        return { key, result };
      });
    }
  
    const variables = Object.entries(row.variables || {}).reduce((acc, [key, data]) => {
      if (data.isMultiEntry) {
        const entryKey = `${row.ID}-${key}`;
        acc[key] = multiEntries[entryKey]?.map(entry => entry.values) || [];
      } else {
        acc[key] = parseFloat(data.value) || data.value || 0;
      }
      return acc;
    }, {});
  
    // For other calculation types
    if (calculator.calculate) {
      const emissions = calculator.calculate(variables, constants);
      const key = `${categoryNumber}-${row.ID}-0`; // Using a single key for the field
      const result = {
        scope,
        emissions,
        categoryNumber,
        fieldId: row.ID,
        entryIndex: 0,
        uncertaintyType,
      };
      return [{ key, result }];
    }
  
    // For simple, non-variable calculations
    if (calculator.co2) {
      const value = row.variables?.consumption?.value;
      if (!value) return [];
      
      const emissions = {
        co2: calculator.co2(parseFloat(value), constants),
        ch4: calculator.ch4 ? calculator.ch4(parseFloat(value), constants) : 0,
        n2o: calculator.n2o ? calculator.n2o(parseFloat(value), constants) : 0
      };
      const key = `${categoryNumber}-${row.ID}-0`;
      const result = { scope, emissions, categoryNumber, fieldId: row.ID, entryIndex: 0, uncertaintyType };
      return [{ key, result }];
    }
  
    return [];
  };

  const renderInputField = (row, name, data) => {
    if (data.isMultiEntry) {
      const entryKey = `${row.ID}-${name}`;
      return renderMultiEntryFields(row, name, data, entryKey);
    }
    
    if (data.type === 'select') {
      return (
        <FormControl 
          size="small" 
          error={data.touched && data.error}
          sx={{
            width: '170px',
            '& .MuiInputBase-root': {
              width: '100%'
            }
          }}
        >
          <InputLabel id={`${row.ID}-${name}-label`}>{data.name}</InputLabel>
          <Select
            labelId={`${row.ID}-${name}-label`}
            value={data.value}
            label={data.name}
            onChange={(e) => handleVariableChange(row.ID, name, e.target.value)}
            onBlur={(e) => handleVariableBlur(row.ID, name, e.target.value, 'select')}
          >
            {data.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {data.touched && data.error && (
            <FormHelperText>Παρακαλούμε επιλέξτε μια τιμή</FormHelperText>
          )}
        </FormControl>
      );
    }

    return (
      <TextField
        value={data.value}
        error={data.touched && data.error}
        helperText={data.touched && data.error ? "Παρακαλούμε εισάγετε έγκυρη τιμή" : ""}
        onChange={(e) => handleVariableChange(row.ID, name, e.target.value)}
        onBlur={(e) => handleVariableBlur(row.ID, name, e.target.value, 'text')}
        size="small"
        sx={{
          width: '170px',
          '& .MuiInputBase-root': {
            width: '100%'
          },
          '& .MuiInputBase-input': {
            textAlign: 'right',
          }
        }}
        InputProps={{
          endAdornment: data.unit ? <InputAdornment position="end">{data.unit}</InputAdornment> : null,
        }}
      />
    );
  };

  // Render multi-entry fields based on the variable configuration
  const renderMultiEntryFields = (row, variableName, variableData, entryKey) => {
    const fields = variableData.multiEntryFields || [];
    
    // Default fields for specific types if not defined in config
    let defaultFields = [];
    if (row.ID === '1.6') {
      // Default refrigerant fields
      defaultFields = [
        { name: 'name', label: 'Όνομα Ψυκτικού', width: 200 },
        { name: 'gwp', label: 'GWP', unit: '', width: 120 },
        { name: 'amount', label: 'Ποσότητα', unit: 'kg', width: 140 }
      ];
    } else if (row.ID === '7.1.1' || row.ID === '7.1.2') {
      // Default tree fields
      defaultFields = [
        { name: 'name', label: 'Είδος Δένδρου', width: 200 },
        { name: 'percentage', label: 'Ποσοστό', unit: '%', width: 140 }
      ];
    }
    
    const fieldsToRender = fields.length > 0 ? fields : defaultFields;
    const entries = multiEntries[entryKey] || [{ id: 1, values: {} }];
    
    return (
      <Box sx={{ mt: 2, mb: 2 }}>
        {entries.map((entry) => (
          <Box key={entry.id} sx={{ mb: 2, p: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Grid container spacing={2} alignItems="center">
              {fieldsToRender.map((field) => (
                <Grid item key={field.name}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="caption" sx={{ mb: 1 }}>{field.label}</Typography>
                    <TextField
                      value={entry.values[field.name] || ''}
                      onChange={(e) => handleMultiEntryChange(entryKey, entry.id, field.name, e.target.value)}
                      size="small"
                      sx={{
                        width: '190px',
                        '& .MuiInputBase-root': {
                          width: '100%'
                        },
                        '& .MuiInputBase-input': {
                          textAlign: field.type === 'number' ? 'right' : 'left',
                        }
                      }}
                      InputProps={{
                        endAdornment: field.unit ? <InputAdornment position="end">{field.unit}</InputAdornment> : null,
                      }}
                    />
                  </Box>
                </Grid>
              ))}
              <Grid item>
                <IconButton 
                  color="error" 
                  onClick={() => removeMultiEntry(entryKey, entry.id)}
                  disabled={entries.length <= 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}
        
        <Button 
          startIcon={<AddIcon />} 
          variant="outlined" 
          size="small" 
          onClick={() => addMultiEntry(entryKey)}
        >
          Προσθήκη {row.ID === '1.6' ? 'Ψυκτικού' : row.ID.startsWith('7') ? 'Είδους' : 'Στοιχείου'}
        </Button>
      </Box>
    );
  };

  // Check if a row has any errors
  const hasRowError = (row) => {
    if (!row.variables || !validationState.errors) return false;
    return Object.entries(row.variables).some(([varName]) => {
      const fieldId = `${row.ID}-${varName}`;
      return validationState.errors[fieldId];
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table 
        sx={{ 
          minWidth: 650,
          tableLayout: 'fixed',
          width: '100%'
        }} 
        aria-label="variable emissions table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ 
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              width: '60px',
            }} />
            <TableCell align="center" sx={{ 
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              width: '80px',
              whiteSpace: 'nowrap'
            }}>A/A</TableCell>
            <TableCell align="center" sx={{ 
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              width: '200px',
              wordWrap: 'break-word',
              whiteSpace: 'normal'
            }}>Κατηγορία στοιχείων</TableCell>
            <TableCell align="center" sx={{ 
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              width: '150px',
              wordWrap: 'break-word',
              whiteSpace: 'normal'
            }}>Τύπος εκπομπών</TableCell>
            <TableCell align="center" sx={{ 
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              width: '120px',
              wordWrap: 'break-word',
              whiteSpace: 'normal'
            }}>Πεδίο</TableCell>
            <TableCell align="center" sx={{ 
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              width: '180px',
              wordWrap: 'break-word',
              whiteSpace: 'normal'
            }}>Πηγές στοιχείων</TableCell>
            <TableCell align="center" sx={{ 
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              width: '100px',
              whiteSpace: 'nowrap'
            }}>CO2 (tn)</TableCell>
            <TableCell align="center" sx={{ 
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              width: '100px',
              whiteSpace: 'nowrap'
            }}>CH4 (tn)</TableCell>
            <TableCell align="center" sx={{ 
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              width: '100px',
              whiteSpace: 'nowrap'
            }}>N2O (tn)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const isExpanded = !!expandedRows[row.ID];
            
            // Aggregate results for the current field
            const fieldResults = Object.values(emissionResults).filter(
              res => res.categoryNumber === categoryNumber && res.fieldId === row.ID
            );
            
            const totalEmissionsForField = fieldResults.reduce((acc, result) => {
              acc.co2 += result.emissions.co2 || 0;
              acc.ch4 += result.emissions.ch4 || 0;
              acc.n2o += result.emissions.n2o || 0;
              return acc;
            }, { co2: 0, ch4: 0, n2o: 0 });

            return (
              <Fragment key={row.ID}>
                <TableRow 
                  sx={{
                    '& > *': { borderBottom: 'unset' },
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#e3e6ea' },
                    backgroundColor: hasRowError(row) ? theme.palette.error.main : 'inherit'
                  }}
                  onClick={() => handleExpandClick(row.ID)}
                >
                  <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => handleExpandClick(row.ID)}>
                      {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{row.ID}</TableCell>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    {row.dataCategory}
                  </TableCell>
                  <TableCell align="center">{row.emissionType}</TableCell>
                  <TableCell align="center">{row.scope}</TableCell>
                  <TableCell align="center">{row.dataSource?.join(", ")}</TableCell>
                  <TableCell align="center">{totalEmissionsForField.co2.toFixed(2)}</TableCell>
                  <TableCell align="center">{totalEmissionsForField.ch4.toFixed(2)}</TableCell>
                  <TableCell align="center">{totalEmissionsForField.n2o.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Table size="small">
                          <TableBody>
                            {Object.entries(row.variables).map(([name, data], idx, arr) => (
                              <TableRow
                                key={name}
                                sx={{
                                  backgroundColor: idx % 2 === 0 ? 'inherit' : '#f5f5f5',
                                  '&:last-child td, &:last-child th': { borderBottom: 'none' }
                                }}
                              >
                                <TableCell 
                                  sx={{ 
                                    width: '200px',
                                    whiteSpace: 'normal',
                                    wordWrap: 'break-word'
                                  }}
                                >
                                  {data.name} {data.unit ? `(${data.unit})` : ''}
                                </TableCell>
                                <TableCell 
                                  sx={{ 
                                    width: '200px',
                                    textAlign: 'right'
                                  }}
                                >
                                  {renderInputField(row, name, data)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VariableEmissionsTable;
