import * as emissionFuncs from './emissionFuncs';

export const emissionCalculators = {
  // Category 1: Δημοτικά κτίρια
  "1.1": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateDieselCO2(variables.consumption, constants), ch4: emissionFuncs.calculateDieselCH4(variables.consumption, constants), n2o: emissionFuncs.calculateDieselN2O(variables.consumption, constants) }) },
  "1.2": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateLPGCO2(variables.consumption, constants), ch4: emissionFuncs.calculateLPGCH4(variables.consumption, constants), n2o: emissionFuncs.calculateLPGN2O(variables.consumption, constants) }) },
  "1.3": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateNaturalGasHeatingCO2(variables.consumption, constants), ch4: emissionFuncs.calculateNaturalGasHeatingCH4(variables.consumption, constants), n2o: emissionFuncs.calculateNaturalGasHeatingN2O(variables.consumption, constants) }) },
  "1.4.1": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateWoodyBiomassPelletCO2(variables.consumption, constants), ch4: emissionFuncs.calculateWoodyBiomassPelletCH4(variables.consumption, constants), n2o: emissionFuncs.calculateWoodyBiomassPelletN2O(variables.consumption, constants) }) },
  "1.4.2": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateWoodyBiomassFirewoodCO2(variables.consumption, constants), ch4: emissionFuncs.calculateWoodyBiomassFirewoodCH4(variables.consumption, constants), n2o: emissionFuncs.calculateWoodyBiomassFirewoodN2O(variables.consumption, constants) }) },
  "1.5": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateElectricityCO2(variables.consumption, constants), ch4: emissionFuncs.calculateElectricityCH4(variables.consumption, constants), n2o: emissionFuncs.calculateElectricityN2O(variables.consumption, constants) }) },
  "1.6": { 
    calculate: (variables, constants) => {
      // Use multi-entry refrigerant calculation if available, otherwise fall back to old method
      if (variables.refrigerant && Array.isArray(variables.refrigerant) && variables.refrigerant.length > 0) {
        return { 
          co2: emissionFuncs.calculateMultiRefrigerantCO2(variables.refrigerant), 
          ch4: 0, 
          n2o: 0 
        };
      } else if (variables.consumption && variables.GWP) {
        // Fallback to old method
        return { 
          co2: emissionFuncs.calculateCoolingLeakageCO2(variables.consumption, variables.GWP), 
          ch4: 0, 
          n2o: 0 
        };
      }
      return { co2: 0, ch4: 0, n2o: 0 };
    } 
  },

  // Category 2: Δημοτικός φωτισμός
  "2.1": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateElectricityCO2(variables.consumption, constants), ch4: emissionFuncs.calculateElectricityCH4(variables.consumption, constants), n2o: emissionFuncs.calculateElectricityN2O(variables.consumption, constants) }) },

  // Category 3: Μεταφορές
  "3.1": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateDieselCO2(variables.consumption, constants), ch4: emissionFuncs.calculateDieselCH4(variables.consumption, constants), n2o: emissionFuncs.calculateDieselN2O(variables.consumption, constants) }) },
  "3.2": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateGasolineCO2(variables.consumption, constants), ch4: emissionFuncs.calculateGasolineCH4(variables.consumption, constants), n2o: emissionFuncs.calculateGasolineN2O(variables.consumption, constants) }) },
  "3.3": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateLPGCO2(variables.consumption, constants), ch4: emissionFuncs.calculateLPGCH4(variables.consumption, constants), n2o: emissionFuncs.calculateLPGN2O(variables.consumption, constants) }) },
  "3.4": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateNaturalGasVehiclesCO2(variables.consumption, constants), ch4: emissionFuncs.calculateNaturalGasVehiclesCH4(variables.consumption, constants), n2o: emissionFuncs.calculateNaturalGasVehiclesN2O(variables.consumption, constants) }) },
  "3.5": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateElectricityCO2(variables.consumption, constants), ch4: emissionFuncs.calculateElectricityCH4(variables.consumption, constants), n2o: emissionFuncs.calculateElectricityN2O(variables.consumption, constants) }) },

  // Category 4: Μηχανήματα έργου
  "4.1": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateDieselCO2(variables.consumption, constants), ch4: emissionFuncs.calculateDieselCH4(variables.consumption, constants), n2o: emissionFuncs.calculateDieselN2O(variables.consumption, constants) }) },
  "4.2": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateGasolineCO2(variables.consumption, constants), ch4: emissionFuncs.calculateGasolineCH4(variables.consumption, constants), n2o: emissionFuncs.calculateGasolineN2O(variables.consumption, constants) }) },
  "4.3": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateLPGCO2(variables.consumption, constants), ch4: emissionFuncs.calculateLPGCH4(variables.consumption, constants), n2o: emissionFuncs.calculateLPGN2O(variables.consumption, constants) }) },
  "4.4": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateNaturalGasVehiclesCO2(variables.consumption, constants), ch4: emissionFuncs.calculateNaturalGasVehiclesCH4(variables.consumption, constants), n2o: emissionFuncs.calculateNaturalGasVehiclesN2O(variables.consumption, constants) }) },
  "4.5": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateElectricityCO2(variables.consumption, constants), ch4: emissionFuncs.calculateElectricityCH4(variables.consumption, constants), n2o: emissionFuncs.calculateElectricityN2O(variables.consumption, constants) }) },

  // Category 5: Διαχείριση αστικών στερεών αποβλήτων & λυμάτων
  "5.1.1": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateDieselCO2(variables.consumption, constants), ch4: emissionFuncs.calculateDieselCH4(variables.consumption, constants), n2o: emissionFuncs.calculateDieselN2O(variables.consumption, constants) }) },
  "5.1.2": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateLPGCO2(variables.consumption, constants), ch4: emissionFuncs.calculateLPGCH4(variables.consumption, constants), n2o: emissionFuncs.calculateLPGN2O(variables.consumption, constants) }) },
  "5.1.3": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateNaturalGasHeatingCO2(variables.consumption, constants), ch4: emissionFuncs.calculateNaturalGasHeatingCH4(variables.consumption, constants), n2o: emissionFuncs.calculateNaturalGasHeatingN2O(variables.consumption, constants) }) },
  "5.2": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateElectricityCO2(variables.consumption, constants), ch4: emissionFuncs.calculateElectricityCH4(variables.consumption, constants), n2o: emissionFuncs.calculateElectricityN2O(variables.consumption, constants) }) },
  "5.3.1": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateDieselCO2(variables.consumption, constants), ch4: emissionFuncs.calculateDieselCH4(variables.consumption, constants), n2o: emissionFuncs.calculateDieselN2O(variables.consumption, constants) }) },
  "5.3.2": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateLPGCO2(variables.consumption, constants), ch4: emissionFuncs.calculateLPGCH4(variables.consumption, constants), n2o: emissionFuncs.calculateLPGN2O(variables.consumption, constants) }) },
  "5.3.3": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateNaturalGasHeatingCO2(variables.consumption, constants), ch4: emissionFuncs.calculateNaturalGasHeatingCH4(variables.consumption, constants), n2o: emissionFuncs.calculateNaturalGasHeatingN2O(variables.consumption, constants) }) },
  "5.4": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateElectricityCO2(variables.consumption, constants), ch4: emissionFuncs.calculateElectricityCH4(variables.consumption, constants), n2o: emissionFuncs.calculateElectricityN2O(variables.consumption, constants) }) },
  "5.5.1": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateDieselCO2(variables.consumption, constants), ch4: emissionFuncs.calculateDieselCH4(variables.consumption, constants), n2o: emissionFuncs.calculateDieselN2O(variables.consumption, constants) }) },
  "5.5.2": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateLPGCO2(variables.consumption, constants), ch4: emissionFuncs.calculateLPGCH4(variables.consumption, constants), n2o: emissionFuncs.calculateLPGN2O(variables.consumption, constants) }) },
  "5.5.3": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateNaturalGasHeatingCO2(variables.consumption, constants), ch4: emissionFuncs.calculateNaturalGasHeatingCH4(variables.consumption, constants), n2o: emissionFuncs.calculateNaturalGasHeatingN2O(variables.consumption, constants) }) },
  "5.6": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateElectricityCO2(variables.consumption, constants), ch4: emissionFuncs.calculateElectricityCH4(variables.consumption, constants), n2o: emissionFuncs.calculateElectricityN2O(variables.consumption, constants) }) },
  "5.7": { calculate: (variables, constants) => { const doc = emissionFuncs.calculateDOC(variables.paperWaste, variables.textileWaste, variables.foodWaste, variables.greenWaste, variables.woodWaste, variables.dehydratedSludge, constants); const l0 = emissionFuncs.calculateL0(variables.disposalType, doc, constants); const ch4 = emissionFuncs.calculateMSWCH4(variables.msw, variables.mswf, variables.dehydratedSludge, l0, variables.recoveredCH4, variables.disposalType, constants); return { co2: 0, ch4, n2o: 0 }; } },
  "5.8.1": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateDieselCO2(variables.consumption, constants), ch4: emissionFuncs.calculateDieselCH4(variables.consumption, constants), n2o: emissionFuncs.calculateDieselN2O(variables.consumption, constants) }) },
  "5.8.2": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateLPGCO2(variables.consumption, constants), ch4: emissionFuncs.calculateLPGCH4(variables.consumption, constants), n2o: emissionFuncs.calculateLPGN2O(variables.consumption, constants) }) },
  "5.8.3": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateNaturalGasHeatingCO2(variables.consumption, constants), ch4: emissionFuncs.calculateNaturalGasHeatingCH4(variables.consumption, constants), n2o: emissionFuncs.calculateNaturalGasHeatingN2O(variables.consumption, constants) }) },
  "5.9": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateElectricityCO2(variables.consumption, constants), ch4: emissionFuncs.calculateElectricityCH4(variables.consumption, constants), n2o: emissionFuncs.calculateElectricityN2O(variables.consumption, constants) }) },
  "5.10": { calculate: (variables, constants) => { const tow = emissionFuncs.calculateTOW(variables.population, variables.hasMixedWaste, constants); const populationRatios = { KEL: variables.PR1 / 100, SEPTIC_TANK: variables.PR2 / 100, ABSORPTION_PIT: variables.PR3 / 100, UNTREATED_DISCHARGE: variables.PR4 / 100 }; const emissionFactors = { KEL: emissionFuncs.calculateWastewaterEF('KEL', constants), SEPTIC_TANK: emissionFuncs.calculateWastewaterEF('SEPTIC_TANK', constants), ABSORPTION_PIT: emissionFuncs.calculateWastewaterEF('ABSORPTION_PIT', constants), UNTREATED_DISCHARGE: emissionFuncs.calculateWastewaterEF('UNTREATED_DISCHARGE', constants) }; const ch4 = emissionFuncs.calculateWastewaterCH4(populationRatios, emissionFactors, tow, variables.removedSludge, variables.recoveredCH4); const n2oTreatment = emissionFuncs.calculateTreatmentN2O(emissionFuncs.calculateTreatmentN(variables.treatedWastewaterVolume, variables.nitrogenConcentration, constants), { KEL: variables.PR1N2O / 100, SEPTIC_ABSORPTION: variables.PR2N2O / 100 }, constants); const n2oDischarge = emissionFuncs.calculateDischargeN2O(emissionFuncs.calculateDischargeN(variables.dischargedWastewaterVolume, variables.nitrogenConcentration, constants), constants); const n2o = emissionFuncs.calculateTotalWastewaterN2O(n2oTreatment, n2oDischarge); return { co2: 0, ch4, n2o }; } },
  "5.11.1": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateDieselCO2(variables.consumption, constants), ch4: emissionFuncs.calculateDieselCH4(variables.consumption, constants), n2o: emissionFuncs.calculateDieselN2O(variables.consumption, constants) }) },
  "5.11.2": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateLPGCO2(variables.consumption, constants), ch4: emissionFuncs.calculateLPGCH4(variables.consumption, constants), n2o: emissionFuncs.calculateLPGN2O(variables.consumption, constants) }) },
  "5.11.3": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateNaturalGasHeatingCO2(variables.consumption, constants), ch4: emissionFuncs.calculateNaturalGasHeatingCH4(variables.consumption, constants), n2o: emissionFuncs.calculateNaturalGasHeatingN2O(variables.consumption, constants) }) },
  "5.12": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateElectricityCO2(variables.consumption, constants), ch4: emissionFuncs.calculateElectricityCH4(variables.consumption, constants), n2o: emissionFuncs.calculateElectricityN2O(variables.consumption, constants) }) },
  "5.13": { calculate: (variables, constants) => { const ch4 = emissionFuncs.calculateCompostingCH4(variables.organicWasteMass, constants); const n2o = emissionFuncs.calculateCompostingN2O(variables.organicWasteMass, constants); return { co2: 0, ch4, n2o }; } },

  // Category 6: Ύδρευση & Άρδευση
  "6.1.1": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateDieselCO2(variables.consumption, constants), ch4: emissionFuncs.calculateDieselCH4(variables.consumption, constants), n2o: emissionFuncs.calculateDieselN2O(variables.consumption, constants) }) },
  "6.1.2": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateLPGCO2(variables.consumption, constants), ch4: emissionFuncs.calculateLPGCH4(variables.consumption, constants), n2o: emissionFuncs.calculateLPGN2O(variables.consumption, constants) }) },
  "6.1.3": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateNaturalGasHeatingCO2(variables.consumption, constants), ch4: emissionFuncs.calculateNaturalGasHeatingCH4(variables.consumption, constants), n2o: emissionFuncs.calculateNaturalGasHeatingN2O(variables.consumption, constants) }) },
  "6.2": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateElectricityCO2(variables.consumption, constants), ch4: emissionFuncs.calculateElectricityCH4(variables.consumption, constants), n2o: emissionFuncs.calculateElectricityN2O(variables.consumption, constants) }) },
  "6.3.1": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateDieselCO2(variables.consumption, constants), ch4: emissionFuncs.calculateDieselCH4(variables.consumption, constants), n2o: emissionFuncs.calculateDieselN2O(variables.consumption, constants) }) },
  "6.3.2": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateLPGCO2(variables.consumption, constants), ch4: emissionFuncs.calculateLPGCH4(variables.consumption, constants), n2o: emissionFuncs.calculateLPGN2O(variables.consumption, constants) }) },
  "6.3.3": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateNaturalGasHeatingCO2(variables.consumption, constants), ch4: emissionFuncs.calculateNaturalGasHeatingCH4(variables.consumption, constants), n2o: emissionFuncs.calculateNaturalGasHeatingN2O(variables.consumption, constants) }) },
  "6.4": { calculate: (variables, constants) => ({ co2: emissionFuncs.calculateElectricityCO2(variables.consumption, constants), ch4: emissionFuncs.calculateElectricityCH4(variables.consumption, constants), n2o: emissionFuncs.calculateElectricityN2O(variables.consumption, constants) }) },

  // Category 7: Πράσινες απορροφήσεις
  "7.1.1": {
    calculate: (variables, constants) => {
      // Equation 9.1 - Area based calculation
      if (variables.trees && Array.isArray(variables.trees) && variables.trees.length > 0) {
        const area = parseFloat(variables.area) || 0;
        const pruningMass = parseFloat(variables.pruningMass) || 0;
        
        // Tree absorption is negative CO2 (removed from atmosphere)
        const co2 = emissionFuncs.calculateTreeAbsorptionByArea(area, variables.trees, pruningMass, constants);
        
        return { co2, ch4: 0, n2o: 0 };
      }
      return { co2: 0, ch4: 0, n2o: 0 };
    }
  },
  "7.1.2": {
    calculate: (variables, constants) => {
      // Equation 9.2 - Count based calculation
      if (variables.trees && Array.isArray(variables.trees) && variables.trees.length > 0) {
        const pruningMass = parseFloat(variables.pruningMass) || 0;
        
        // Tree absorption is negative CO2 (removed from atmosphere)
        const co2 = emissionFuncs.calculateTreeAbsorptionByCount(variables.trees, pruningMass, constants);
        
        return { co2, ch4: 0, n2o: 0 };
      }
      return { co2: 0, ch4: 0, n2o: 0 };
    }
  }
};