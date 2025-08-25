import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  // Store results per field, using a unique key
  // e.g. key = `${categoryNumber}-${fieldId}-${entryIndex}`
  results: {},
  // Store totals across all categories
  totals: {
    byScope: {
      1: { co2: 0, ch4: 0, n2o: 0 },
      2: { co2: 0, ch4: 0, n2o: 0 },
      3: { co2: 0, ch4: 0, n2o: 0 },
      "-1": { co2: 0, ch4: 0, n2o: 0 } // Absorptions/removals
    },
    total: { co2: 0, ch4: 0, n2o: 0 }
  },
  // Store uncertainty analysis results
  uncertainty: {
    byType: {},
    cumulated: null
  }
};

const emissionsResultsSlice = createSlice({
  name: 'emissionsResults',
  initialState,
  reducers: {
    setFieldResult: (state, action) => {
      const { key, result } = action.payload;
      state.results[key] = result;

      // Recalculate totals
      const newTotals = {
        byScope: {
          1: { co2: 0, ch4: 0, n2o: 0 },
          2: { co2: 0, ch4: 0, n2o: 0 },
          3: { co2: 0, ch4: 0, n2o: 0 },
          '-1': { co2: 0, ch4: 0, n2o: 0 },
        },
        total: { co2: 0, ch4: 0, n2o: 0 },
      };

      Object.values(state.results).forEach(fieldResult => {
        if (fieldResult && fieldResult.scope && fieldResult.emissions) {
          const { scope, emissions } = fieldResult;
          newTotals.byScope[scope].co2 += emissions.co2 || 0;
          newTotals.byScope[scope].ch4 += emissions.ch4 || 0;
          newTotals.byScope[scope].n2o += emissions.n2o || 0;
          
          newTotals.total.co2 += emissions.co2 || 0;
          newTotals.total.ch4 += emissions.ch4 || 0;
          newTotals.total.n2o += emissions.n2o || 0;
        }
      });
      state.totals = newTotals;
    },
    clearFieldResults: (state, action) => {
      const { categoryNumber, fieldId } = action.payload;
      const newResults = {};
      Object.entries(state.results).forEach(([key, result]) => {
        if (result.categoryNumber !== categoryNumber || result.fieldId !== fieldId) {
          newResults[key] = result;
        }
      });
      state.results = newResults;
    },
    clearResultsForCategory: (state, action) => {
      const categoryNumber = action.payload;
      const newResults = {};
      Object.entries(state.results).forEach(([key, result]) => {
        if (result.categoryNumber !== categoryNumber) {
          newResults[key] = result;
        }
      });
      state.results = newResults;

      // Recalculate totals
      const newTotals = {
        byScope: {
          1: { co2: 0, ch4: 0, n2o: 0 },
          2: { co2: 0, ch4: 0, n2o: 0 },
          3: { co2: 0, ch4: 0, n2o: 0 },
          '-1': { co2: 0, ch4: 0, n2o: 0 },
        },
        total: { co2: 0, ch4: 0, n2o: 0 },
      };

      Object.values(state.results).forEach(fieldResult => {
        if (fieldResult && fieldResult.scope && fieldResult.emissions) {
          const { scope, emissions } = fieldResult;
          newTotals.byScope[scope].co2 += emissions.co2 || 0;
          newTotals.byScope[scope].ch4 += emissions.ch4 || 0;
          newTotals.byScope[scope].n2o += emissions.n2o || 0;

          newTotals.total.co2 += emissions.co2 || 0;
          newTotals.total.ch4 += emissions.ch4 || 0;
          newTotals.total.n2o += emissions.n2o || 0;
        }
      });
      state.totals = newTotals;
    },
    updateUncertaintyResults: (state, action) => {
      const { byType, cumulated } = action.payload;
      state.uncertainty = { byType, cumulated };
    },
    resetResults: (state) => {
      state.results = {};
      state.totals = initialState.totals;
      state.uncertainty = initialState.uncertainty;
    }
  }
});

export const { setFieldResult, clearFieldResults, clearResultsForCategory, updateUncertaintyResults, resetResults } = emissionsResultsSlice.actions;

// Input selector
const selectResults = state => state.emissionsResults.results;

// Selector to get emissions grouped by uncertainty type
export const getEmissionsByUncertaintyType = createSelector(
  [selectResults],
  (results) => {
    const groupedResults = {};
  
    Object.values(results).forEach(result => {
      const uncertaintyType = result.uncertaintyType || 'UNKNOWN';
      
      if (!groupedResults[uncertaintyType]) {
        groupedResults[uncertaintyType] = {
          totalEmissions: { co2: 0, ch4: 0, n2o: 0 },
          fields: [],
          count: 0
        };
      }
      
      groupedResults[uncertaintyType].totalEmissions.co2 += result.emissions.co2 || 0;
      groupedResults[uncertaintyType].totalEmissions.ch4 += result.emissions.ch4 || 0;
      groupedResults[uncertaintyType].totalEmissions.n2o += result.emissions.n2o || 0;
      groupedResults[uncertaintyType].fields.push(result);
      groupedResults[uncertaintyType].count += 1;
    });
    
    return groupedResults;
  }
);

// Selector to get emissions grouped by scope
export const getEmissionsByScope = (state) => {
  return state.emissionsResults.totals.byScope;
};

export default emissionsResultsSlice.reducer; 