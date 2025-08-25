import defaultConstants from '../../config/newConstants';

// Diesel emissions
export function calculateECO2_DIESEL(consumption, constants = defaultConstants) {
    return (consumption * constants.Diesel.NCV * constants.Diesel.EF_CO2 * constants.Diesel.OxidationFactor * constants.Diesel.Density * 1e-6);
}

export function calculateCH4_DIESEL(consumption, constants = defaultConstants) {
    return (consumption * constants.Diesel.NCV * constants.Diesel.EF_CH4 * constants.Diesel.Density * 1e-9);
}

export function calculateN2O_DIESEL(consumption, constants = defaultConstants) {
    return (consumption * constants.Diesel.NCV * constants.Diesel.EF_N2O * constants.Diesel.Density * 1e-9);
}

// Gasoline emissions
export function calculateECO2_GASOLINE(consumption, constants = defaultConstants) {
    return (consumption * constants.Gasoline.NCV * constants.Gasoline.EF_CO2 * constants.Gasoline.OxidationFactor * constants.Gasoline.Density * 1e-6);
}

export function calculateCH4_GASOLINE(consumption, constants = defaultConstants) {
    return (consumption * constants.Gasoline.NCV * constants.Gasoline.EF_CH4 * constants.Gasoline.Density * 1e-9);
}

export function calculateN2O_GASOLINE(consumption, constants = defaultConstants) {
    return (consumption * constants.Gasoline.NCV * constants.Gasoline.EF_N2O * constants.Gasoline.Density * 1e-9);
}

// LPG emissions
export function calculateECO2_LPG(consumption, constants = defaultConstants) {
    return (consumption * constants.LPG.NCV * constants.LPG.EF_CO2 * constants.LPG.OxidationFactor * 1e-6);
}

export function calculateCH4_LPG(consumption, constants = defaultConstants) {
    return (consumption * constants.LPG.NCV * constants.LPG.EF_CH4 * 1e-9);
}

export function calculateN2O_LPG(consumption, constants = defaultConstants) {
    return (consumption * constants.LPG.NCV * constants.LPG.EF_N2O * 1e-9);
}

// Natural Gas emissions
export function calculateECO2_NATURAL_GAS_HEATING(consumption, constants = defaultConstants) {
    return (consumption * constants.NaturalGas.EF_CO2 * constants.NaturalGas.OxidationFactor * (1/277777.80));
}

export function calculateECO2_NATURAL_GAS_VEHICLES(consumption, constants = defaultConstants) {
    return (consumption * constants.NaturalGas.EF_CO2 * constants.NaturalGas.OxidationFactor * (1/277777.80) * constants.NaturalGas.HigherCalorificValue);
}

export function calculateCH4_NATURAL_GAS_HEATING(consumption, constants = defaultConstants) {
    return (consumption * constants.NaturalGas.EF_CH4_Heating * (1/277777.80) * 1e-3);
}

export function calculateCH4_NATURAL_GAS_VEHICLES(consumption, constants = defaultConstants) {
    return (consumption * constants.NaturalGas.EF_CH4_Vehicles * (1/277777.80) * constants.NaturalGas.HigherCalorificValue * 1e-3 / constants.NaturalGas.Density);
}

export function calculateN2O_NATURAL_GAS_HEATING(consumption, constants = defaultConstants) {
    return (consumption * constants.NaturalGas.EF_N2O_Heating * (1/277777.80) * 1e-3);
}

export function calculateN2O_NATURAL_GAS_VEHICLES(consumption, constants = defaultConstants) {
    return (consumption * constants.NaturalGas.EF_N2O_Vehicles * (1/277777.80) * constants.NaturalGas.HigherCalorificValue * 1e-3 / constants.NaturalGas.Density);
}

// Woody Biomass emissions
export function calculateECO2_WOODY_BIOMASS_PELLET(consumption, constants = defaultConstants) {
    return (consumption * constants.WoodyBiomass.CarbonConcentration * constants.WoodyBiomass.MoisturePellets * constants.WoodyBiomass.OxidationFactorPellets * (44/12));
}

export function calculateCH4_WOODY_BIOMASS_PELLET(consumption, constants = defaultConstants) {
    return (consumption * constants.WoodyBiomass.NCV * constants.WoodyBiomass.EF_CH4 * 1e-3);
}

export function calculateN2O_WOODY_BIOMASS_PELLET(consumption, constants = defaultConstants) {
    return (consumption * constants.WoodyBiomass.NCV * constants.WoodyBiomass.EF_N2O * 1e-3);
}

export function calculateECO2_WOODY_BIOMASS_FIREWOOD(consumption, constants = defaultConstants) {
    return (consumption * constants.WoodyBiomass.CarbonConcentration * constants.WoodyBiomass.MoistureFirewood * constants.WoodyBiomass.OxidationFactorFirewood * (44/12));
}

export function calculateCH4_WOODY_BIOMASS_FIREWOOD(consumption, constants = defaultConstants) {
    return (consumption * constants.WoodyBiomass.NCV * constants.WoodyBiomass.EF_CH4 * 1e-3);
}

export function calculateN2O_WOODY_BIOMASS_FIREWOOD(consumption, constants = defaultConstants) {
    return (consumption * constants.WoodyBiomass.NCV * constants.WoodyBiomass.EF_N2O * 1e-3);
} 