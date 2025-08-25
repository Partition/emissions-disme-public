// Global Warming Potentials (GWP) for greenhouse gases
// AR5 Synthesis Report (2014) - IPCC
export const GWP_CO2 = 1; // GWP for CO2, 1 tn CO2/tn CO2
export const GWP_CH4 = 28; // GWP for CH4, 28 tn CO2/tn CH4
export const GWP_N2O = 265; // GWP for N2O, 265 tn CO2/tn N2O

// Diesel-specific constants
export const NCV_DIESEL = 42.80; // Net Calorific Value for diesel in TJ/Ktn
export const EF_DIESEL_CO2 = 73.78; // CO2 emission factor for diesel in tn CO2/TJ
export const EF_DIESEL_CH4 = 4.55; // CH4 emission factor for diesel in kg CH4/TJ
export const EF_DIESEL_N2O = 2.14; // N2O emission factor for diesel in kg N2O/TJ
export const OXIDATION_FACTOR_DIESEL = 1; // Carbon oxidation factor for diesel
export const DENSITY_DIESEL = 0.8325; // Density of diesel in Kg/lt @ 15°C

// Gasoline-specific constants
export const NCV_GASOLINE = 42.79; // Net Calorific Value for gasoline in TJ/Ktn
export const EF_GASOLINE_CO2 = 73.26; // CO2 emission factor for gasoline in tn CO2/TJ
export const EF_GASOLINE_CH4 = 20.44; // CH4 emission factor for gasoline in kg CH4/TJ
export const EF_GASOLINE_N2O = 1.66; // N2O emission factor for gasoline in kg N2O/TJ
export const OXIDATION_FACTOR_GASOLINE = 1; // Carbon oxidation factor for gasoline
export const DENSITY_GASOLINE = 0.7475; // Density of gasoline in Kg/lt @ 15°C

// LPG-specific constants
export const NCV_LPG = 47.3; // Net Calorific Value for LPG in TJ/Ktn
export const EF_LPG_CO2 = 63.10; // CO2 emission factor for LPG in tn CO2/TJ
export const EF_LPG_CH4 = 8.71; // CH4 emission factor for LPG in kg CH4/TJ
export const EF_LPG_N2O = 1.64; // N2O emission factor for LPG in kg N2O/TJ
export const OXIDATION_FACTOR_LPG = 1; // Carbon oxidation factor for LPG

// Natural Gas-specific constants
export const EF_NATURAL_GAS_CO2 = 55.69; // CO2 emission factor for natural gas in tn CO2/TJ
export const EF_NATURAL_GAS_CH4_HEATING = 5; // CH4 emission factor for natural gas for heating in kg CH4/TJ
export const EF_NATURAL_GAS_CH4_VEHICLES = 102.22; // CH4 emission factor for natural gas for vehicles in kg CH4/TJ
export const EF_NATURAL_GAS_N2O_HEATING = 0.1; // N2O emission factor for natural gas in kg NO2/TJ
export const EF_NATURAL_GAS_N2O_VEHICLES = 3.33; // N2O emission factor for natural gas in kg NO2/TJ
export const OXIDATION_FACTOR_NATURAL_GAS = 1; // Carbon oxidation factor for natural gas
export const HIGHER_CALORIFIC_VALUE_NATURAL_GAS = 11.889; // Higher Calorific Value for natural gas in KWh/Nm3 (normal cubic meter)
export const DENSITY_NATURAL_GAS = 454; // Density of natural gas in Kg/m3

// Woody Biomass-specific constants
export const NCV_WOODY_BIOMASS = 0.0156; // Net Calorific Value for woody biomass in TJ/tn
export const EF_WOODY_BIOMASS_CH4 = 300; // CH4 emission factor for woody biomass in kg CH4/TJ
export const EF_WOODY_BIOMASS_N2O = 4; // N2O emission factor for woody biomass in kg N2O/TJ
export const CW_CARBON_CONCENTRATION = 0.475; // Carbon concentration in woody biomass, C/tn dry biomass
export const W_MOISTURE_FIREWOOD = 0.3; // Moisture content of firewood in %
export const W_MOISTURE_PELLETS = 0.05; // Moisture content of pellets in %
export const OXIDATION_FACTOR_FIREWOOD = 0.9; // Carbon oxidation factor for firewood
export const OXIDATION_FACTOR_PELLETS = 1; // Carbon oxidation factor for pellets

// Electricity-specific constants
/**
 * Electricity emission factor for CO2, g CO2/kWh.
*/
export const EF_CO2 = 436.889; // CO2 emission factor
export const EF_CH4 = 0.011215; // CH4 emission factor
export const EF_N2O = 0.004173; // N2O emission factor



//TODO: Add the rest of cooling & waste related constants

// Cooling specific constants
// EF_Fi = depends on which cooling method is used 

// Solid waste specific constants
// ??