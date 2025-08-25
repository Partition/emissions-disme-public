import defaultConstants from "./newConstants";


/**
 * Calculate total CO2 equivalent emissions from CO2, CH4, and N2O
 * @param {number} co2 - CO2 emissions in tonnes
 * @param {number} ch4 - CH4 emissions in tonnes
 * @param {number} n2o - N2O emissions in tonnes
 * @param {Object} constants - Constants object containing GWP values
 * @returns {number} CO2 equivalent emissions in tonnes
 */
export const calculateCO2e = (co2, ch4, n2o, constants) => co2 * 1 + ch4 * constants.GWP.CH4 + n2o * constants.GWP.N2O;


// Fuel usage emissions 

// Diesel
/**
 * Calculate CO2 emissions from diesel use
 * Equation: ECO2_ντίζελ = C x NCV x EF x OX x d x 1e-6
 * @param {number} consumption - Diesel consumption in lt
 * @param {Object} constants - Constants object
 * @returns {number} CO2 emissions in tn
 */
export function calculateDieselCO2(consumption, constants) {
    return (
        consumption *
        constants.Diesel.NCV *
        constants.Diesel.EF_CO2 *
        constants.Diesel.OxidationFactor *
        constants.Diesel.Density *
        1e-6
    );
}
/**
 * Calculate CH4 emissions from diesel use
 * Equation: ECH4_ντίζελ = C x NCV x EFCH4 x d x 1e-9
 * @param {number} consumption - Diesel consumption in lt
 * @param {Object} constants - Constants object
 * @returns {number} CH4 emissions in tn
 */
export function calculateDieselCH4(consumption, constants) {
    return (
        consumption *
        constants.Diesel.NCV *
        constants.Diesel.EF_CH4 *
        constants.Diesel.Density *
        1e-9
    );
}
/**
 * Calculate N2O emissions from diesel use
 * Equation: EN2O_ντίζελ = C x NCV x EFN2O x d x 1e-9
 * @param {number} consumption - Diesel consumption in lt
 * @param {Object} constants - Constants object
 * @returns {number} N2O emissions in tn
 */
export function calculateDieselN2O(consumption, constants) {
    return (
        consumption *
        constants.Diesel.NCV *
        constants.Diesel.EF_N2O *
        constants.Diesel.Density *
        1e-9
    );
}


// Gasoline
/**
 * Calculate CO2 emissions from gasoline use
 * Equation: ECO2_βενζίνη = C x NCV x EF x OX x d x 1e-6
 * @param {number} consumption - Gasoline consumption in lt
 * @param {Object} constants - Constants object
 * @returns {number} CO2 emissions in tn
 */
export function calculateGasolineCO2(consumption, constants) {
    return (
        consumption *
        constants.Gasoline.NCV *
        constants.Gasoline.EF_CO2 *
        constants.Gasoline.OxidationFactor *
        constants.Gasoline.Density *
        1e-6
    );
}
/**
 * Calculate CH4 emissions from gasoline use
 * Equation: ECH4_βενζίνη = C x NCV x EFCH4 x d x 1e-9
 * @param {number} consumption - Gasoline consumption in lt
 * @param {Object} constants - Constants object
 * @returns {number} CH4 emissions in tn
 */
export function calculateGasolineCH4(consumption, constants) {
    return (
        consumption *
        constants.Gasoline.NCV *
        constants.Gasoline.EF_CH4 *
        constants.Gasoline.Density *
        1e-9
    );
}
/**
 * Calculate N2O emissions from gasoline use
 * Equation: EN2O_βενζίνη = C x NCV x EFN2O x d x 1e-9
 * @param {number} consumption - Gasoline consumption in lt
 * @param {Object} constants - Constants object
 * @returns {number} N2O emissions in tn
 */
export function calculateGasolineN2O(consumption, constants) {
    return (
        consumption *
        constants.Gasoline.NCV *
        constants.Gasoline.EF_N2O *
        constants.Gasoline.Density *
        1e-9
    );
}


// LPG
/**
 * Calculate CO2 emissions from LPG use
 * Equation: ECO2_LPG = C x NCV x EF x OX x 1e-6
 * @param {number} consumption - LPG consumption in Kg
 * @param {Object} constants - Constants object
 * @returns {number} CO2 emissions in tn
 */
export function calculateLPGCO2(consumption, constants) {
    return (
        consumption *
        constants.LPG.NCV *
        constants.LPG.EF_CO2 *
        constants.LPG.OxidationFactor *
        1e-6
    );
}

/**
 * Calculate CH4 emissions from LPG use
 * Equation: ECH4_LPG = C x NCV x EFCH4 x 1e-9
 * @param {number} consumption - LPG consumption in Kg
 * @param {Object} constants - Constants object
 * @returns {number} CH4 emissions in tn
 */
export function calculateLPGCH4(consumption, constants) {
    return (
        consumption *
        constants.LPG.NCV *
        constants.LPG.EF_CH4 *
        1e-9
    );
}

/**
 * Calculate N2O emissions from LPG use
 * Equation: EN2O_LPG = C x NCV x EFN2O x 1e-9
 * @param {number} consumption - LPG consumption in Kg
 * @param {Object} constants - Constants object
 * @returns {number} N2O emissions in tn
 */
export function calculateLPGN2O(consumption, constants) {
    return (
        consumption *
        constants.LPG.NCV *
        constants.LPG.EF_N2O *
        1e-9
    );
}


// Natural Gas (CNG)
/**
 * Calculate CO2 emissions from natural gas (heating)
 * Equation: ECO2_ΦΑ = C x EF x OX x (1/277777.80)
 * @param {number} consumption - Natural gas consumption in KWh
 * @param {Object} constants - Constants object
 * @returns {number} CO2 emissions in tn
 */
export function calculateNaturalGasHeatingCO2(consumption, constants) {
    return (
        consumption *
        constants.NaturalGas.EF_CO2 *
        constants.NaturalGas.OxidationFactor *
        (1 / 277777.80)
    );
}
/**
 * Calculate CH4 emissions from natural gas (heating)
 * Equation: ECH4_ΦΑ = C x EFCH4 x (1/277777.80) x 1e-3
 * @param {number} consumption - Natural gas consumption in KWh
 * @param {Object} constants - Constants object
 * @returns {number} CH4 emissions in tn
 */
export function calculateNaturalGasHeatingCH4(consumption, constants) {
    return (
        consumption *
        constants.NaturalGas.EF_CH4_Heating *
        (1 / 277777.80) *
        1e-3
    );
}

/**
 * Calculate N2O emissions from natural gas (heating)
 * Equation: EN2O_ΦΑ = C x EFN2O x (1/277777.80) x 1e-3
 * @param {number} consumption - Natural gas consumption in KWh
 * @param {Object} constants - Constants object
 * @returns {number} N2O emissions in tn
 */
export function calculateNaturalGasHeatingN2O(consumption, constants) {
    return (
        consumption *
        constants.NaturalGas.EF_N2O_Heating *
        (1 / 277777.80) *
        1e-3
    );
}

/**
 * Calculate CO2 emissions from natural gas (vehicles)
 * Equation: ECO2_ΦΑ = C x EF x OX x (1/277777.80) x HCV / d
 * @param {number} consumption - Natural gas consumption in Kg
 * @param {Object} constants - Constants object
 * @returns {number} CO2 emissions in tn
 */
export function calculateNaturalGasVehiclesCO2(consumption, constants) {
    return (
        consumption *
        constants.NaturalGas.EF_CO2 *
        constants.NaturalGas.OxidationFactor *
        (1 / 277777.80) *
        constants.NaturalGas.HigherCalorificValue /
        constants.NaturalGas.Density
    );
}

/**
 * Calculate CH4 emissions from natural gas (vehicles)
 * Equation: ECH4_ΦΑ = C x EFCH4 x (1/277777.80) x HCV x 1e-3 / d
 * @param {number} consumption - Natural gas consumption in Kg
 * @param {Object} constants - Constants object
 * @returns {number} CH4 emissions in tn
 */
export function calculateNaturalGasVehiclesCH4(consumption, constants) {
    return (
        consumption *
        constants.NaturalGas.EF_CH4_Vehicles *
        (1 / 277777.80) *
        constants.NaturalGas.HigherCalorificValue *
        1e-3 /
        constants.NaturalGas.Density
    );
}

/**
 * Calculate N2O emissions from natural gas (vehicles)
 * Equation: EN2O_ΦΑ = C x EFN2O x (1/277777.80) x HCV x 1e-3 / d
 * @param {number} consumption - Natural gas consumption in Kg
 * @param {Object} constants - Constants object
 * @returns {number} N2O emissions in tn
 */
export function calculateNaturalGasVehiclesN2O(consumption, constants) {
    return (
        consumption *
        constants.NaturalGas.EF_N2O_Vehicles *
        (1 / 277777.80) *
        constants.NaturalGas.HigherCalorificValue *
        1e-3 /
        constants.NaturalGas.Density
    );
}


// Woody Biomass
// Pellet
/**
 * Calculate CO2 emissions from woody biomass pellet
 * Equation: ECO2_ΞΜ = C x CW x (1-W) x OX x 44/12
 * @param {number} consumption - Biomass pellet consumption in tn
 * @param {Object} constants - Constants object
 * @returns {number} CO2 emissions in tn
 */
export function calculateWoodyBiomassPelletCO2(consumption, constants) {
    return (
        consumption *
        constants.WoodyBiomass.CarbonConcentration *
        constants.WoodyBiomass.MoisturePellets *
        constants.WoodyBiomass.OxidationFactorPellets *
        (44 / 12)
    );
}

/**
 * Calculate CH4 emissions from woody biomass pellet
 * Equation: ECH4_ΞΜ = C x NCV x EFCH4 x 1e-3
 * @param {number} consumption - Biomass pellet consumption in tn
 * @param {Object} constants - Constants object
 * @returns {number} CH4 emissions in tn
 */
export function calculateWoodyBiomassPelletCH4(consumption, constants) {
    return (
        consumption *
        constants.WoodyBiomass.NCV *
        constants.WoodyBiomass.EF_CH4 *
        1e-3
    );
}

/**
 * Calculate N2O emissions from woody biomass pellet
 * Equation: EN2O_ΞΜ = C x NCV x EFN2O x 1e-3
 * @param {number} consumption - Biomass pellet consumption in tn
 * @param {Object} constants - Constants object
 * @returns {number} N2O emissions in tn
 */
export function calculateWoodyBiomassPelletN2O(consumption, constants) {
    return (
        consumption *
        constants.WoodyBiomass.NCV *
        constants.WoodyBiomass.EF_N2O *
        1e-3
    );
}


// Firewood
/**
 * Calculate CO2 emissions from woody biomass firewood
 * Equation: ECO2_ΞΜ = C x CW x (1-W) x OX x 44/12
 * @param {number} consumption - Biomass firewood consumption in tn
 * @param {Object} constants - Constants object
 * @returns {number} CO2 emissions in tn
 */
export function calculateWoodyBiomassFirewoodCO2(consumption, constants) {
    return (
        consumption *
        constants.WoodyBiomass.CarbonConcentration *
        constants.WoodyBiomass.MoistureFirewood *
        constants.WoodyBiomass.OxidationFactorFirewood *
        (44 / 12)
    );
}

/**
 * Calculate CH4 emissions from woody biomass firewood
 * Equation: ECH4_ΞΜ = C x NCV x EFCH4 x 1e-3
 * @param {number} consumption - Biomass firewood consumption in tn
 * @param {Object} constants - Constants object
 * @returns {number} CH4 emissions in tn
 */
export function calculateWoodyBiomassFirewoodCH4(consumption, constants) {
    return (
        consumption *
        constants.WoodyBiomass.NCV *
        constants.WoodyBiomass.EF_CH4 *
        1e-3
    );
}

/**
 * Calculate N2O emissions from woody biomass firewood
 * Equation: EN2O_ΞΜ = C x NCV x EFN2O x 1e-3
 * @param {number} consumption - Biomass firewood consumption in tn
 * @param {Object} constants - Constants object
 * @returns {number} N2O emissions in tn
 */
export function calculateWoodyBiomassFirewoodN2O(consumption, constants) {
    return (
        consumption *
        constants.WoodyBiomass.NCV *
        constants.WoodyBiomass.EF_N2O *
        1e-3
    );
}

// Electricity
/**
 * Calculate CO2 emissions from electricity consumption
 * @param {number} consumption - Electricity consumption in KWh
 * @param {Object} constants - Constants object containing emission factors
 * @returns {number} CO2 emissions in tonnes
 */
export function calculateElectricityCO2(consumption, constants) {
    return consumption * constants.Electricity.EF_CO2 * 1e-6; // Convert g to tonnes
}

/**
 * Calculate CH4 emissions from electricity consumption
 * @param {number} consumption - Electricity consumption in KWh
 * @param {Object} constants - Constants object containing emission factors
 * @returns {number} CH4 emissions in tonnes
 */
export function calculateElectricityCH4(consumption, constants) {
    return consumption * constants.Electricity.EF_CH4 * 1e-6; // Convert g to tonnes
}

/**
 * Calculate N2O emissions from electricity consumption
 * @param {number} consumption - Electricity consumption in KWh
 * @param {Object} constants - Constants object containing emission factors
 * @returns {number} N2O emissions in tonnes
 */
export function calculateElectricityN2O(consumption, constants) {
    return consumption * constants.Electricity.EF_N2O * 1e-6; // Convert g to tonnes
}


// Cooling 
// 5.1, 5.2
export function calculateCoolingLeakageCO2(consumption, GWP) { // Leak of fluoride cooling means Kg
    return (consumption * GWP * 1e-3); // Convert kg to tonnes
}

/**
 * Calculate CO2 emissions from multiple refrigerant entries
 * @param {Array} refrigerants - Array of refrigerant objects with name, gwp, and amount properties
 * @returns {number} CO2 emissions in tonnes
 */
export function calculateMultiRefrigerantCO2(refrigerants) {
    if (!refrigerants || !refrigerants.length) return 0;
    
    return refrigerants.reduce((total, refrigerant) => {
        const amount = parseFloat(refrigerant.amount) || 0;
        const gwp = parseFloat(refrigerant.gwp) || 0;
        return total + (amount * gwp * 1e-3); // Convert kg to tonnes
    }, 0);
}

/**
 * Calculate CO2 emissions from a single refrigerant entry
 * @param {Object} refrigerant - A refrigerant object with amount and gwp properties
 * @returns {number} CO2 emissions in tonnes
 */
export function calculateSingleRefrigerantCO2(refrigerant) {
    if (!refrigerant) return 0;
    const amount = parseFloat(refrigerant.amount) || 0;
    const gwp = parseFloat(refrigerant.gwp) || 0;
    return amount * gwp * 1e-3; // Convert kg to tonnes
}

// Municipal Solid Waste Disposal Emissions

/**
 * Calculate DOC (Degradable Organic Carbon) content of waste
 * Equation 6.4: DOC = [(α1 x A) + (β1 x B) + (γ1 x Γ) + (δ1 x Δ) + (ε1 x E) + (στ1 x DS)] / (Α+Β+Γ+Δ+Ε+DS)
 * @param {number} paperWaste - Annual paper waste quantity (A) in tonnes
 * @param {number} textileWaste - Annual textile waste quantity (B) in tonnes
 * @param {number} foodWaste - Annual food waste quantity (Γ) in tonnes
 * @param {number} greenWaste - Annual green and other degradable waste quantity (Δ) in tonnes
 * @param {number} woodWaste - Annual wood and straw waste quantity (E) in tonnes
 * @param {number} dehydratedSludge - Annual dehydrated sludge quantity (DS) in tonnes
 * @param {Object} constants - Constants object containing waste-specific carbon content values
 * @returns {number} DOC value in tonnes C/tonnes waste
 */
export function calculateDOC(paperWaste, textileWaste, foodWaste, greenWaste, woodWaste, dehydratedSludge, constants) {
    const numerator = (
        constants.SolidWaste.A1_PAPER_CARBON * paperWaste +
        constants.SolidWaste.B1_TEXTILE_CARBON * textileWaste +
        constants.SolidWaste.C1_FOODWASTE_CARBON * foodWaste +
        constants.SolidWaste.D1_GREEN_WASTE_CARBON * greenWaste +
        constants.SolidWaste.E1_WOOD_CARBON * woodWaste +
        constants.SolidWaste.ST1_DEHYDRATED_MUD_CARBON * dehydratedSludge
    );

    const denominator = paperWaste + textileWaste + foodWaste + greenWaste + woodWaste + dehydratedSludge;

    return numerator / denominator;
}

/**
 * Calculate methane generation potential (L0)
 * Equation 6.3: L0 = MCF x DOC x DOCF x F x 16/12
 * @param {string} disposalType - Type of disposal site ('XYTA_XYTY', 'XADA_MORE_THAN_5M', or 'XADA_LESS_THAN_5M')
 * @param {number} doc - DOC value calculated from calculateDOC()
 * @param {Object} constants - Constants object
 * @returns {number} L0 value in tonnes CH4/tonnes waste
 */
export function calculateL0(disposalType, doc, constants) {
    return constants.SolidWaste.MCF[disposalType] *
        doc *
        constants.SolidWaste.DOCF *
        constants.SolidWaste.F *
        constants.SolidWaste.C_TO_CH4_CONVERSION;
}

/**
 * Calculate methane emissions from waste disposal
 * Equation 6.2: ECH4_ΑΣΑ = [((MSW x MSWF) + DS) x L0) – R] x (1 – OX)
 * @param {number} msw - Total MSW generated in tonnes
 * @param {number} mswf - Fraction of MSW sent to disposal
 * @param {number} dehydratedSludge - Dehydrated sludge quantity in tonnes
 * @param {number} l0 - Methane generation potential
 * @param {number} recoveredCH4 - Recovered methane mass in tonnes
 * @param {string} disposalType - Type of disposal site ('XYTA_XYTY' or 'XADA')
 * @param {Object} constants - Constants object
 * @returns {number} Methane emissions in tonnes
 */
export function calculateMSWCH4(msw, mswf, dehydratedSludge, l0, recoveredCH4, disposalType, constants) {
    const ox = disposalType === 'XYTA_XYTY' ? constants.SolidWaste.OX_XYTA_XYTY : constants.SolidWaste.OX_XADA;
    return (((msw * mswf) + dehydratedSludge) * l0 - recoveredCH4) * (1 - ox);
}

// Wastewater Treatment Emissions

/**
 * Calculate total organic biodegradable load in wastewater
 * Equation 7.4: TOW = P x FBOD x 0.000001 x I x 365
 * @param {number} population - Municipality population
 * @param {boolean} hasMixedWaste - Whether wastewater includes industrial waste
 * @param {Object} constants - Constants object containing wastewater treatment parameters
 * @returns {number} TOW value in tonnes BOD
 */
export function calculateTOW(population, hasMixedWaste, constants) {
    const correctionFactor = hasMixedWaste ? constants.WastewaterTreatment.I.MIXED : constants.WastewaterTreatment.I.MUNICIPAL_ONLY;
    return population *
        constants.WastewaterTreatment.FBOD *
        constants.WastewaterTreatment.GRAMS_TO_TONNES *
        correctionFactor *
        constants.WastewaterTreatment.DAYS_PER_YEAR;
}

/**
 * Calculate CH4 emission factor for wastewater treatment practice
 * Equation 7.3: EFj = Bo x MCFj
 * @param {string} practiceType - Type of wastewater management practice ('KEL', 'SEPTIC_TANK', 'ABSORPTION_PIT', 'UNTREATED_DISCHARGE')
 * @param {Object} constants - Constants object containing wastewater treatment parameters
 * @returns {number} Emission factor in tonnes CH4/tonnes BOD
 */
export function calculateWastewaterEF(practiceType, constants) {
    return constants.WastewaterTreatment.Bo * constants.WastewaterTreatment.MCF[practiceType];
}

/**
 * Calculate CH4 emissions from wastewater treatment
 * Equation 7.2: ECH4_Λ = Σ{PRj1-3 x EFj1-3 x (TOW – S)} – R + Σ{PRj4-5 x EFj4-5 x TOW}
 * @param {Object} populationRatios - Object containing population ratios for each treatment practice (PRj)
 * @param {Object} emissionFactors - Object containing emission factors for each practice (EFj)
 * @param {number} tow - Total organic biodegradable load
 * @param {number} sludgeRemoved - Organic load removed in sludge
 * @param {number} recoveredCH4 - Recovered methane mass
 * @returns {number} CH4 emissions in tonnes
 */
export function calculateWastewaterCH4(populationRatios, emissionFactors, tow, sludgeRemoved, recoveredCH4) {
    // Calculate emissions from practices 1-3 (with sludge removal)
    const emissionsWithSludge = Object.entries(populationRatios)
        .filter(([practice]) => ['KEL', 'SEPTIC_TANK', 'ABSORPTION_PIT'].includes(practice))
        .reduce((sum, [practice, ratio]) =>
            sum + (ratio * emissionFactors[practice] * (tow - sludgeRemoved)), 0);

    // Calculate emissions from practices 4-5 (without sludge removal)
    const emissionsWithoutSludge = Object.entries(populationRatios)
        .filter(([practice]) => ['UNTREATED_DISCHARGE'].includes(practice))
        .reduce((sum, [practice, ratio]) =>
            sum + (ratio * emissionFactors[practice] * tow), 0);

    return emissionsWithSludge - recoveredCH4 + emissionsWithoutSludge;
}


// N2O Emissions from Wastewater Treatment

/**
 * Calculate nitrogen quantity in wastewater for treatment
 * Equation 7.7: NΕΠΕΞ = VΕΠΕΞ x CN_ΕΠΕΞ x 0.000001
 * @param {number} volume - Volume of wastewater treated in m3
 * @param {number} nitrogenConcentration - Average annual total nitrogen concentration in mg/L
 * @param {Object} constants - Constants object containing conversion factors
 * @returns {number} Nitrogen quantity in tonnes N
 */
export function calculateTreatmentN(volume, nitrogenConcentration, constants) {
    return volume * nitrogenConcentration * constants.WastewaterTreatment.GRAMS_TO_TONNES;
}

/**
 * Calculate nitrogen quantity in discharged wastewater
 * Equation 7.9: NΔ = VΔ x CN_Δ x 0.000001
 * @param {number} volume - Volume of discharged wastewater in m3
 * @param {number} nitrogenConcentration - Average annual total nitrogen concentration in mg/L
 * @param {Object} constants - Constants object containing conversion factors
 * @returns {number} Nitrogen quantity in tonnes N
 */
export function calculateDischargeN(volume, nitrogenConcentration, constants) {
    return volume * nitrogenConcentration * constants.WastewaterTreatment.GRAMS_TO_TONNES;
}

/**
 * Calculate N2O emissions from wastewater treatment processes
 * Equation 7.6: EN2O_Λ_ΕΠΕΞ = Σ{NΕΠΕΞ x PRj x EFΕΠΕΞ_j} x 44/28
 * @param {number} nitrogenQuantity - Quantity of nitrogen in wastewater (NΕΠΕΞ) in tonnes N
 * @param {Object} populationRatios - Object containing population ratios for each treatment practice (PRj)
 * @param {Object} constants - Constants object containing emission factors
 * @returns {number} N2O emissions from treatment in tonnes N2O
 */
export function calculateTreatmentN2O(nitrogenQuantity, populationRatios, constants) {
    const emissions = Object.entries(populationRatios)
        .reduce((sum, [practice, ratio]) => {
            // Only consider KEL and septic/absorption tanks as per guidelines
            if (['KEL', 'SEPTIC_ABSORPTION'].includes(practice)) {
                return sum + (nitrogenQuantity * ratio * constants.WastewaterTreatment.EF_N2O_TREATMENT[practice]);
            }
            return sum;
        }, 0);

    return emissions * constants.WastewaterTreatment.N2O_N_TO_N2O;
}

/**
 * Calculate N2O emissions from wastewater discharge to water bodies
 * Equation 7.8: EN2O_Λ_Δ = NΔ x EFΔ x 44/28
 * @param {number} nitrogenQuantity - Quantity of nitrogen in discharged wastewater (NΔ) in tonnes N
 * @param {Object} constants - Constants object containing emission factors
 * @returns {number} N2O emissions from discharge in tonnes N2O
 */
export function calculateDischargeN2O(nitrogenQuantity, constants) {
    return nitrogenQuantity *
        constants.WastewaterTreatment.EF_N2O_DISCHARGE *
        constants.WastewaterTreatment.N2O_N_TO_N2O;
}

/**
 * Calculate total N2O emissions from wastewater management
 * Equation 7.5: EN2O_Λ = EN2O_Λ_ΕΠΕΞ + EN2O_Λ_Δ
 * @param {number} treatmentEmissions - N2O emissions from treatment processes in tonnes N2O
 * @param {number} dischargeEmissions - N2O emissions from discharge in tonnes N2O
 * @returns {number} Total N2O emissions in tonnes N2O
 */
export function calculateTotalWastewaterN2O(treatmentEmissions, dischargeEmissions) {
    return treatmentEmissions + dischargeEmissions;
}

// Composting Emissions

/**
 * Calculate CH4 emissions from composting
 * Equation 8.2: ECH4_compost = ΜΟW x EFCH4_compost x 0.001
 * @param {number} organicWasteMass - Total mass of organic waste composted in tonnes
 * @param {Object} constants - Constants object containing emission factors
 * @returns {number} CH4 emissions in tonnes
 */
export function calculateCompostingCH4(organicWasteMass, constants) {
    return organicWasteMass *
        constants.Composting.EF_CH4 *
        constants.Composting.KG_TO_TONNES;
}

/**
 * Calculate N2O emissions from composting
 * Equation 8.3: EN2O_compost = ΜΟW x EFN2O_compost x 0.001
 * @param {number} organicWasteMass - Total mass of organic waste composted in tonnes
 * @param {Object} constants - Constants object containing emission factors
 * @returns {number} N2O emissions in tonnes
 */
export function calculateCompostingN2O(organicWasteMass, constants) {
    return organicWasteMass *
        constants.Composting.EF_N2O *
        constants.Composting.KG_TO_TONNES;
}

// CO2 Absorption by Trees

/**
 * Calculate CO2 absorption for trees based on area and planting density (Equation 9.1)
 * ARBW = Σ{(JPi x PDi x S x ADR1_i x Cw x 44/12) + (MPi x PDi x S x ADR2_i x Cw x 44/12)} – (PRU x (1-W) x Cw x 44/12)
 * 
 * @param {number} area - Area in stremma
 * @param {Array} trees - Array of tree objects with properties for each tree type
 * @param {number} pruningMass - Mass of pruned material in tonnes
 * @param {Object} constants - Constants object
 * @returns {number} CO2 absorption in tonnes (negative value)
 */
export function calculateTreeAbsorptionByArea(area, trees, pruningMass, constants) {
    if (!trees || !trees.length || !area) return 0;
    
    // Calculate absorption for each tree type and sum
    const totalAbsorption = trees.reduce((total, tree) => {
        return total + calculateSingleTreeAbsorptionByArea(area, tree, constants);
    }, 0);
    
    // Calculate pruning emissions
    const pruningEmissions = (pruningMass || 0) * (1 - constants.CO2Absorption.WOOD_MOISTURE_CONTENT) * constants.CO2Absorption.WOOD_CARBON_CONTENT * (44/12);
    
    // Return negative value (absorption)
    return -(totalAbsorption - pruningEmissions);
}

/**
 * Calculate CO2 absorption for a single tree type based on area and planting density
 * @param {number} area - Area in stremma
 * @param {Object} tree - A tree object with properties for the tree type
 * @param {Object} constants - Constants object
 * @returns {number} CO2 absorption in tonnes
 */
export function calculateSingleTreeAbsorptionByArea(area, tree, constants) {
    if (!tree || !area) return 0;
    
    // Parse values with fallbacks to 0
    const juvenilePercentage = parseFloat(tree.juvenilePercentage) / 100 || 0;
    const maturePercentage = parseFloat(tree.maturePercentage) / 100 || 0;
    const plantingDensity = parseFloat(tree.plantingDensity) || 0;
    const juvenileGrowthRate = parseFloat(tree.juvenileGrowthRate) || 0;
    const matureGrowthRate = parseFloat(tree.matureGrowthRate) || 0;
    
    // Calculate absorption for this tree type
    const juvenileAbsorption = juvenilePercentage * plantingDensity * area * juvenileGrowthRate * constants.CO2Absorption.WOOD_CARBON_CONTENT * (44/12);
    const matureAbsorption = maturePercentage * plantingDensity * area * matureGrowthRate * constants.CO2Absorption.WOOD_CARBON_CONTENT * (44/12);
    
    return juvenileAbsorption + matureAbsorption;
}

/**
 * Calculate CO2 absorption for trees based on tree count (Equation 9.2)
 * ARBW = Σ{(TJP_i x ADR1_i x Cw x 44/12) + (TMP_i x ADR2_i x Cw x 44/12)} – (PRU x (1-W) x Cw x 44/12)
 * 
 * @param {Array} trees - Array of tree objects with properties for each tree type
 * @param {number} pruningMass - Mass of pruned material in tonnes
 * @param {Object} constants - Constants object
 * @returns {number} CO2 absorption in tonnes (negative value)
 */
export function calculateTreeAbsorptionByCount(trees, pruningMass, constants) {
    if (!trees || !trees.length) return 0;
    
    // Calculate absorption for each tree type and sum
    const totalAbsorption = trees.reduce((total, tree) => {
        return total + calculateSingleTreeAbsorptionByCount(tree, constants);
    }, 0);
    
    // Calculate pruning emissions
    const pruningEmissions = (pruningMass || 0) * (1 - constants.CO2Absorption.WOOD_MOISTURE_CONTENT) * constants.CO2Absorption.WOOD_CARBON_CONTENT * (44/12);
    // Return negative value (absorption)
    return -(totalAbsorption - pruningEmissions);
}

/**
 * Calculate CO2 absorption for a single tree type based on tree count
 * @param {Object} tree - A tree object with properties for the tree type
 * @param {Object} constants - Constants object
 * @returns {number} CO2 absorption in tonnes
 */
export function calculateSingleTreeAbsorptionByCount(tree, constants) {
    if (!tree) return 0;

    // Parse values with fallbacks to 0
    const juvenileCount = parseFloat(tree.juvenileCount) || 0;
    const matureCount = parseFloat(tree.matureCount) || 0;
    const juvenileGrowthRate = parseFloat(tree.juvenileGrowthRate) || 0;
    const matureGrowthRate = parseFloat(tree.matureGrowthRate) || 0;

    // Calculate absorption for this tree type
    const juvenileAbsorption = juvenileCount * juvenileGrowthRate * constants.CO2Absorption.WOOD_CARBON_CONTENT * (44/12);
    const matureAbsorption = matureCount * matureGrowthRate * constants.CO2Absorption.WOOD_CARBON_CONTENT * (44/12);

    return juvenileAbsorption + matureAbsorption;
}

