import { calculateCO2e } from '../config/emissionFuncs';
import { getEmissionsByUncertaintyType } from '../store/emissionsResultsSlice';
import { calculateUncertaintyByType, calculateCumulatedUncertainty } from './calculateEmissionUncertainty';
import tableData from '../config/tableData.json';

// Extract population value from category 0, ID "0.0"
export const getPopulationValue = (emissionsState) => {
    const category0 = emissionsState?.tableData?.['0'];
    if (!category0) return null;
    
    const populationRow = category0.find(row => row.ID === '0.0');
    return populationRow?.variables?.population?.value || null;
};

// Extract passengers value from category 3, ID "3.6"
export const getPassengersValue = (emissionsState) => {
    const category3 = emissionsState?.tableData?.['3'];
    if (!category3) return null;
    const passengersRow = category3.find(row => row.ID === '3.6');
    return passengersRow?.variables?.passengers?.value || null;
};

// Extract building area value from category 1, ID "1.0"
export const getBuildingArea = (emissionsState) => {
    const category1 = emissionsState?.tableData?.['1'];
    if (!category1) return null;
    const buildingAreaRow = category1.find(row => row.ID === '1.0');
    return buildingAreaRow?.variables?.area?.value || null;
};

// Extract CO2 absorptions from category 7
export const getCO2Absorptions = (emissionsResults, constants) => {
    const totalAbsorptions = { co2: 0, ch4: 0, n2o: 0 };

    Object.values(emissionsResults.results).forEach(result => {
        if (result.categoryNumber === '7') {
            totalAbsorptions.co2 += result.emissions.co2 || 0;
            totalAbsorptions.ch4 += result.emissions.ch4 || 0;
            totalAbsorptions.n2o += result.emissions.n2o || 0;
        }
    });

    const co2e = calculateCO2e(
        totalAbsorptions.co2,
        totalAbsorptions.ch4,
        totalAbsorptions.n2o,
        constants
    );
    
    return { ...totalAbsorptions, co2e };
};

// Get emissions by specific category
export const getEmissionsByCategory = (emissionsResults, categoryNumber) => {
    const categoryData = emissionsResults?.byCategory?.[categoryNumber];
    if (!categoryData) {
        return {
            byScope: {
                1: { co2: 0, ch4: 0, n2o: 0 },
                2: { co2: 0, ch4: 0, n2o: 0 },
                3: { co2: 0, ch4: 0, n2o: 0 }
            },
            total: { co2: 0, ch4: 0, n2o: 0 }
        };
    }
    console.log("categoryData for category", categoryNumber, "is", categoryData);

    return categoryData;
};

// Get building emissions
export const getBuildingEmissions = (emissionsResults, constants, buildingCategories = ['1']) => {
    let totalEmissions = { co2: 0, ch4: 0, n2o: 0 };
    
    Object.values(emissionsResults.results).forEach(result => {
        if (buildingCategories.includes(result.categoryNumber)) {
            totalEmissions.co2 += result.emissions.co2 || 0;
            totalEmissions.ch4 += result.emissions.ch4 || 0;
            totalEmissions.n2o += result.emissions.n2o || 0;
        }
    });
    
    const co2e = calculateCO2e(
        totalEmissions.co2,
        totalEmissions.ch4,
        totalEmissions.n2o,
        constants
    );
    
    return { ...totalEmissions, co2e };
};

// Get transport emissions
export const getTransportEmissions = (emissionsResults, constants, transportCategories = ['3']) => {
    let totalEmissions = { co2: 0, ch4: 0, n2o: 0 };
    
    Object.values(emissionsResults.results).forEach(result => {
        if (transportCategories.includes(result.categoryNumber)) {
            totalEmissions.co2 += result.emissions.co2 || 0;
            totalEmissions.ch4 += result.emissions.ch4 || 0;
            totalEmissions.n2o += result.emissions.n2o || 0;
        }
    });
    
    const co2e = calculateCO2e(
        totalEmissions.co2,
        totalEmissions.ch4,
        totalEmissions.n2o,
        constants
    );
    
    return { ...totalEmissions, co2e };
};

// Get total emissions excluding absorptions
export const getTotalEmissionsExcludingAbsorptions = (emissionsResults, constants) => {
    const allTotals = emissionsResults?.totals?.total || { co2: 0, ch4: 0, n2o: 0 };
    const absorptions = getCO2Absorptions(emissionsResults, constants);
    
    const netEmissions = {
        co2: allTotals.co2 - absorptions.co2,
        ch4: allTotals.ch4 - absorptions.ch4,
        n2o: allTotals.n2o - absorptions.n2o
    };
    
    const co2e = calculateCO2e(
        netEmissions.co2,
        netEmissions.ch4,
        netEmissions.n2o,
        constants
    );
    
    return { ...netEmissions, co2e };
};

// Get totals by scope excluding absorptions
export const getTotalsByScopeExcludingAbsorptions = (emissionsResults, constants) => {
    const scopeTotals = emissionsResults?.totals?.byScope || {
        1: { co2: 0, ch4: 0, n2o: 0 },
        2: { co2: 0, ch4: 0, n2o: 0 },
        3: { co2: 0, ch4: 0, n2o: 0 }
    };
    
    const absorptions = getCO2Absorptions(emissionsResults, constants);
    
    // Calculate net emissions per scope (assuming absorptions are distributed proportionally)
    const totalEmissions = Object.values(scopeTotals).reduce((acc, scope) => {
        acc.co2 += scope.co2;
        acc.ch4 += scope.ch4;
        acc.n2o += scope.n2o;
        return acc;
    }, { co2: 0, ch4: 0, n2o: 0 });
    
    const netScopeTotals = {};
    
    [1, 2, 3].forEach(scope => {
        // For simplicity, subtract absorptions proportionally from each scope
        const scopeData = scopeTotals[scope];
        const proportion = totalEmissions.co2 > 0 ? scopeData.co2 / totalEmissions.co2 : 0;
        
        netScopeTotals[scope] = {
            co2: scopeData.co2 - (absorptions.co2 * proportion),
            ch4: scopeData.ch4 - (absorptions.ch4 * proportion),
            n2o: scopeData.n2o - (absorptions.n2o * proportion)
        };
    });
    
    return netScopeTotals;
};

// Calculate uncertainty analysis using the new granular results
export const calculateUncertaintyAnalysis = (emissionsResults, constants) => {
    // We need to pass the full state to the selector
    const emissionsByUncertaintyType = getEmissionsByUncertaintyType({ emissionsResults });

    const uncertaintyByType = {};
    Object.entries(emissionsByUncertaintyType).forEach(([type, data]) => {
        // First, calculate the co2e for the grouped emissions
        const co2e = calculateCO2e(
            data.totalEmissions.co2,
            data.totalEmissions.ch4,
            data.totalEmissions.n2o,
            constants
        );
        
        // Create a shallow copy to avoid mutating the original object
        const totalEmissionsWithCO2e = {
            ...data.totalEmissions,
            co2e
        };

        // Skip unknown or zero-emission types
        if (type === 'UNKNOWN' || totalEmissionsWithCO2e.co2e <= 0) return;

        // Now calculate uncertainty with the valid co2e value
        const uncertainty = calculateUncertaintyByType(type, totalEmissionsWithCO2e.co2e, constants);
        
        // Structure the data as the table component expects it
        uncertaintyByType[type] = {
            totalEmissions: totalEmissionsWithCO2e,
            uncertainty,
        };
    });
    
    // Calculate cumulated uncertainty from the new structure
    const cumulated = calculateCumulatedUncertainty(Object.values(uncertaintyByType));

    return {
        byType: uncertaintyByType,
        cumulated,
    };
}; 