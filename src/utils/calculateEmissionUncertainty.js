import defaultConstants from '../config/newConstants';
import tableData from '../config/tableData.json';
import { calculateCO2e } from '../config/emissionFuncs';

// Calculate uncertainty for a single emission value
const calculateSingleUncertainty = (emission, uncertaintyActivity, gasType, constants) => {
  const activityUncertainty = constants.Uncertainty.ActivityData[uncertaintyActivity];
  let emissionFactorUncertainty = constants.Uncertainty.EmissionFactors[uncertaintyActivity];

  if (uncertaintyActivity === 'COMPOSTING' && gasType) {
    emissionFactorUncertainty = constants.Uncertainty.EmissionFactors[`COMPOSTING_${gasType}`];
  }

  if (activityUncertainty == null || emissionFactorUncertainty == null) {
    return { absolute: 0, relative: 0, lower: emission, upper: emission, combinedUncertainty: 0 };
  }

  const combinedUncertainty = Math.sqrt(activityUncertainty ** 2 + emissionFactorUncertainty ** 2);
  const absolute = emission * combinedUncertainty;
  const relative = combinedUncertainty * 100;
  const lower = emission - absolute;
  const upper = emission + absolute;

  return { absolute, relative, lower, upper, combinedUncertainty };
};

// Calculate combined uncertainty for a given uncertainty type
export const calculateUncertaintyByType = (type, totalEmissionsCO2e, constants) => {
  return calculateSingleUncertainty(totalEmissionsCO2e, type, null, constants);
};

// Get all uncertainty types and their distribution within each category
const getCategoryUncertaintyDistribution = () => {
  const categoryDistributions = {};
  
  Object.entries(tableData).forEach(([categoryNumber, category]) => {
    if (category.Fields) {
      const uncertaintyTypeCounts = {};
      let totalFields = 0;
      
      // Count fields by uncertainty type
      category.Fields.forEach(field => {
        if (field.uncertaintyType && field.uncertaintyType !== '') {
          uncertaintyTypeCounts[field.uncertaintyType] = (uncertaintyTypeCounts[field.uncertaintyType] || 0) + 1;
          totalFields++;
        }
      });
      
      // Calculate proportional distribution
      if (totalFields > 0) {
        const distribution = {};
        Object.entries(uncertaintyTypeCounts).forEach(([uncertaintyType, count]) => {
          distribution[uncertaintyType] = count / totalFields;
        });
        categoryDistributions[categoryNumber] = distribution;
      }
    }
  });
  
  return categoryDistributions;
};

// Calculate cumulated uncertainty using IPCC Tier 1 methodology
export const calculateCumulatedUncertainty = (uncertaintyByType) => {
  let totalEmissions = 0;
  let weightedUncertaintySquared = 0;
  
  Object.values(uncertaintyByType).forEach(({ totalEmissions: emissions, uncertainty }) => {
    if (uncertainty && emissions.co2e > 0) {
      totalEmissions += emissions.co2e;
      // Weight uncertainty by emission amount squared
      weightedUncertaintySquared += Math.pow(emissions.co2e * uncertainty.combinedUncertainty, 2);
    }
  });
  
  if (totalEmissions === 0) return null;
  
  // Calculate cumulated uncertainty as percentage
  const cumulatedUncertainty = Math.sqrt(weightedUncertaintySquared) / totalEmissions;
  const cumulatedUncertaintyPercent = cumulatedUncertainty * 100;
  
  // Determine certainty ranking based on uncertainty percentage
  const getCertaintyRanking = (uncertaintyPercent) => {
    if (uncertaintyPercent <= 5) return 'Excellent';
    if (uncertaintyPercent <= 10) return 'Very Good';
    if (uncertaintyPercent <= 20) return 'Good';
    if (uncertaintyPercent <= 30) return 'Fair';
    if (uncertaintyPercent <= 50) return 'Poor';
    return 'Very Poor';
  };
  
  return {
    totalEmissions,
    cumulatedUncertainty: cumulatedUncertaintyPercent,
    certaintyRanking: getCertaintyRanking(cumulatedUncertaintyPercent),
    absolute: totalEmissions * cumulatedUncertainty
  };
};

export default calculateSingleUncertainty; 