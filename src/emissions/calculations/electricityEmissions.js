import defaultConstants from '../../config/newConstants';

export function calculateCO2_ELECTRICITY(consumption, constants = defaultConstants) {
    return (consumption * constants.Electricity.EF_CO2 * 10);
}

export function calculateCH4_ELECTRICITY(consumption, constants = defaultConstants) {
    return (consumption * constants.Electricity.EF_CH4);
}

export function calculateN2O_ELECTRICITY(consumption, constants = defaultConstants) {
    return (consumption * constants.Electricity.EF_N2O);
}

export function calculateECO2_ELECTRICITY(consumption, constants = defaultConstants) {
    return (consumption * (constants.Electricity.EF_CO2 + 
            constants.Electricity.EF_CH4 * constants.GWP.CH4 + 
            constants.Electricity.EF_N2O * constants.GWP.N2O));
} 