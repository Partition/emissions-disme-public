import defaultConstants from '../../config/newConstants';

// Municipal Solid Waste Emissions
export function calculateDOC(paperWaste, textileWaste, foodWaste, greenWaste, woodWaste, dehydratedSludge, constants = defaultConstants) {
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

export function calculateL0(disposalType, doc, constants = defaultConstants) {
    return constants.SolidWaste.MCF[disposalType] * 
           doc * 
           constants.SolidWaste.DOCF * 
           constants.SolidWaste.F * 
           constants.SolidWaste.C_TO_CH4_CONVERSION;
}

export function calculateCH4_MSW(msw, mswf, dehydratedSludge, l0, recoveredCH4, disposalType, constants = defaultConstants) {
    const ox = disposalType === 'XYTA_XYTY' ? constants.SolidWaste.OX_XYTA_XYTY : constants.SolidWaste.OX_XADA;
    return (((msw * mswf) + dehydratedSludge) * l0 - recoveredCH4) * (1 - ox);
}

export function calculateCO2e_MSW(ch4Emissions, constants = defaultConstants) {
    return ch4Emissions * constants.GWP.CH4;
}

// Wastewater Treatment Emissions
export function calculateTOW(population, hasMixedWaste, constants = defaultConstants) {
    const correctionFactor = hasMixedWaste ? constants.WastewaterTreatment.I.MIXED : constants.WastewaterTreatment.I.MUNICIPAL_ONLY;
    return population * 
           constants.WastewaterTreatment.FBOD * 
           constants.WastewaterTreatment.GRAMS_TO_TONNES * 
           correctionFactor * 
           constants.WastewaterTreatment.DAYS_PER_YEAR;
}

export function calculateEF_Wastewater(practiceType, constants = defaultConstants) {
    return constants.WastewaterTreatment.Bo * constants.WastewaterTreatment.MCF[practiceType];
}

export function calculateCH4_Wastewater(populationRatios, emissionFactors, tow, sludgeRemoved, recoveredCH4) {
    const emissionsWithSludge = Object.entries(populationRatios)
        .filter(([practice]) => ['KEL', 'SEPTIC_TANK', 'ABSORPTION_PIT'].includes(practice))
        .reduce((sum, [practice, ratio]) => 
            sum + (ratio * emissionFactors[practice] * (tow - sludgeRemoved)), 0);

    const emissionsWithoutSludge = Object.entries(populationRatios)
        .filter(([practice]) => ['UNTREATED_DISCHARGE'].includes(practice))
        .reduce((sum, [practice, ratio]) => 
            sum + (ratio * emissionFactors[practice] * tow), 0);

    return emissionsWithSludge - recoveredCH4 + emissionsWithoutSludge;
}

export function calculateN_Treatment(volume, nitrogenConcentration, constants = defaultConstants) {
    return volume * nitrogenConcentration * constants.WastewaterTreatment.GRAMS_TO_TONNES;
}

export function calculateN_Discharge(volume, nitrogenConcentration, constants = defaultConstants) {
    return volume * nitrogenConcentration * constants.WastewaterTreatment.GRAMS_TO_TONNES;
}

export function calculateN2O_Treatment(nitrogenQuantity, populationRatios, constants = defaultConstants) {
    const emissions = Object.entries(populationRatios)
        .reduce((sum, [practice, ratio]) => {
            if (['KEL', 'SEPTIC_ABSORPTION'].includes(practice)) {
                return sum + (nitrogenQuantity * ratio * constants.WastewaterTreatment.EF_N2O_TREATMENT[practice]);
            }
            return sum;
        }, 0);
    
    return emissions * constants.WastewaterTreatment.N2O_N_TO_N2O;
}

export function calculateN2O_Discharge(nitrogenQuantity, constants = defaultConstants) {
    return nitrogenQuantity * 
           constants.WastewaterTreatment.EF_N2O_DISCHARGE * 
           constants.WastewaterTreatment.N2O_N_TO_N2O;
}

export function calculateTotalN2O_Wastewater(treatmentEmissions, dischargeEmissions) {
    return treatmentEmissions + dischargeEmissions;
}

export function calculateCO2e_Wastewater(ch4Emissions, n2oEmissions, constants = defaultConstants) {
    return (ch4Emissions * constants.GWP.CH4) + (n2oEmissions * constants.GWP.N2O);
}

// Composting Emissions
export function calculateCH4_Composting(organicWasteMass, constants = defaultConstants) {
    return organicWasteMass * 
           constants.Composting.EF_CH4 * 
           constants.Composting.KG_TO_TONNES;
}

export function calculateN2O_Composting(organicWasteMass, constants = defaultConstants) {
    return organicWasteMass * 
           constants.Composting.EF_N2O * 
           constants.Composting.KG_TO_TONNES;
}

export function calculateCO2e_Composting(ch4Emissions, n2oEmissions, constants = defaultConstants) {
    return (ch4Emissions * constants.GWP.CH4) + 
           (n2oEmissions * constants.GWP.N2O);
} 