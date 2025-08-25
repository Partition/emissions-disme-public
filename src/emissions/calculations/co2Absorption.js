import defaultConstants from '../../config/newConstants';

/**
 * Calculate CO2 absorption based on area and planting density (less accurate method)
 * Equation 9.1: ARBW = Σ{(JPi x PDi x S x ADR1_i x Cw x 44/12) + (MPi x PDi x S x ADR2_i x Cw x 44/12)} – (PRU x (1-W) x Cw x 44/12)
 */
export function calculateCO2Absorption_ByArea(treeSpecies, area, pruningMass, constants = defaultConstants) {
    // Calculate absorption from tree growth
    const absorption = treeSpecies.reduce((total, species) => {
        const juvenileAbsorption = species.juvenilePercentage * 
                                 species.plantingDensity * 
                                 area * 
                                 species.juvenileGrowthRate * 
                                 constants.CO2Absorption.WOOD_CARBON_CONTENT * 
                                 constants.CO2Absorption.C_TO_CO2_CONVERSION;

        const matureAbsorption = species.maturePercentage * 
                                species.plantingDensity * 
                                area * 
                                species.matureGrowthRate * 
                                constants.CO2Absorption.WOOD_CARBON_CONTENT * 
                                constants.CO2Absorption.C_TO_CO2_CONVERSION;

        return total + juvenileAbsorption + matureAbsorption;
    }, 0);

    // Calculate CO2 released from prunings
    const pruningEmissions = pruningMass * 
                           (1 - constants.CO2Absorption.WOOD_MOISTURE_CONTENT) * 
                           constants.CO2Absorption.WOOD_CARBON_CONTENT * 
                           constants.CO2Absorption.C_TO_CO2_CONVERSION;

    return absorption - pruningEmissions;
}

/**
 * Calculate CO2 absorption based on tree count (more accurate method)
 * Equation 9.2: ARBW = Σ{(TJP_i x ADR1_i x Cw x 44/12) + (TMP_i x ADR2_i x Cw x 44/12)} – (PRU x (1-W) x Cw x 44/12)
 */
export function calculateCO2Absorption_ByCount(treeSpecies, pruningMass, constants = defaultConstants) {
    // Calculate absorption from tree growth
    const absorption = treeSpecies.reduce((total, species) => {
        const juvenileAbsorption = species.juvenileCount * 
                                 species.juvenileGrowthRate * 
                                 constants.CO2Absorption.WOOD_CARBON_CONTENT * 
                                 constants.CO2Absorption.C_TO_CO2_CONVERSION;

        const matureAbsorption = species.matureCount * 
                                species.matureGrowthRate * 
                                constants.CO2Absorption.WOOD_CARBON_CONTENT * 
                                constants.CO2Absorption.C_TO_CO2_CONVERSION;

        return total + juvenileAbsorption + matureAbsorption;
    }, 0);

    // Calculate CO2 released from prunings
    const pruningEmissions = pruningMass * 
                           (1 - constants.CO2Absorption.WOOD_MOISTURE_CONTENT) * 
                           constants.CO2Absorption.WOOD_CARBON_CONTENT * 
                           constants.CO2Absorption.C_TO_CO2_CONVERSION;

    return absorption - pruningEmissions;
} 