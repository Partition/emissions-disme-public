/**
 * Default constants used for emissions calculations
 */
const defaultConstants = {
  GWP: {
    CO2: 1,
    CH4: 28,
    N2O: 265,
    meta: {
      description: {
        CO2: "Τιμή Δυναμικού Παγκόσμιας Θέρμανσης για το CO2",
        CH4: "Τιμή Δυναμικού Παγκόσμιας Θέρμανσης για το CH4",
        N2O: "Τιμή Δυναμικού Παγκόσμιας Θέρμανσης για το N2O"
      },
      units: {
        CO2: "tn CO2/tn CO2",
        CH4: "tn CO2/tn CH4",
        N2O: "tn CO2/tn N2O"
      },
      sources: {
        CO2: "IPCC, 2014: Climate Change 2014: Synthesis Report. Contribution of Working Groups I, II and III to the Fifth Assessment Report (AR5) of the Intergovernmental Panel on Climate Change, Geneva, Switzerland, 151 pp.",
        CH4: "IPCC, 2014: Climate Change 2014: Synthesis Report. Contribution of Working Groups I, II and III to the Fifth Assessment Report (AR5) of the Intergovernmental Panel on Climate Change, Geneva, Switzerland, 151 pp.",
        N2O: "IPCC, 2014: Climate Change 2014: Synthesis Report. Contribution of Working Groups I, II and III to the Fifth Assessment Report (AR5) of the Intergovernmental Panel on Climate Change, Geneva, Switzerland, 151 pp."
      }
    }
  },

  Diesel: {
    NCV: 42.80,
    EF_CO2: 73.78,
    EF_CH4: 4.55,
    EF_N2O: 2.14,
    OxidationFactor: 1,
    Density: 0.8325,
    meta: {
      description: {
        NCV: "Καθαρή Θερμιδική Αξία του ντίζελ (Net Calorific Value)",
        EF_CO2: "Συντελεστής εκπομπής CO2 για το ντίζελ",
        EF_CH4: "Συντελεστής εκπομπής CH4 για το ντίζελ",
        EF_N2O: "Συντελεστής εκπομπής N2O για το ντίζελ",
        OxidationFactor: "Συντελεστής οξείδωσης άνθρακα του ντίζελ",
        Density: "Μέση πυκνότητα πετρελαίου ντίζελ στους 15°C"
      },
      units: {
        NCV: "TJ/Ktn",
        EF_CO2: "tn CO2/TJ",
        EF_CH4: "kg CH4/TJ",
        EF_N2O: "kg N2O/TJ",
        OxidationFactor: "dimensionless",
        Density: "kg/lt"
      },
      sources: {
        NCV: "National Inventory Report 2022, Greece, Table 3.13",
        EF_CO2: "National Inventory Report 2022, Greece, Table 3.13",
        EF_CH4: "National Inventory Report 2022, Greece, Table 3.23",
        EF_N2O: "National Inventory Report 2022, Greece, Table 3.23",
        OxidationFactor: "IPCC Guidelines for National Greenhouse Gas Inventories, 2006, Volume 2 'Energy', Chapter 1 'Introduction', Table 1.4",
        Density: "ΚΥΑ 355/2000/2001 (ΦΕΚ 410Β) - Υπολογισμένη βάσει της ελάχιστης και μέγιστης πυκνότητας"
      }
    }
  },

  Gasoline: {
    NCV: 42.79,
    EF_CO2: 73.26,
    EF_CH4: 20.44,
    EF_N2O: 1.66,
    OxidationFactor: 1,
    Density: 0.7475,
    meta: {
      description: {
        NCV: "Καθαρή Θερμιδική Αξία της βενζίνης (Net Calorific Value)",
        EF_CO2: "Συντελεστής εκπομπής CO2 για τη βενζίνη",
        EF_CH4: "Συντελεστής εκπομπής CH4 για τη βενζίνη",
        EF_N2O: "Συντελεστής εκπομπής N2O για τη βενζίνη",
        OxidationFactor: "Συντελεστής οξείδωσης άνθρακα της βενζίνης",
        Density: "Μέση πυκνότητα βενζίνης στους 15°C"
      },
      units: {
        NCV: "TJ/Ktn",
        EF_CO2: "tn CO2/TJ",
        EF_CH4: "kg CH4/TJ",
        EF_N2O: "kg N2O/TJ",
        OxidationFactor: "dimensionless",
        Density: "kg/lt"
      },
      sources: {
        NCV: "National Inventory Report 2022, Greece, Table 3.13",
        EF_CO2: "National Inventory Report 2022, Greece, Table 3.13",
        EF_CH4: "National Inventory Report 2022, Greece, Table 3.23",
        EF_N2O: "National Inventory Report 2022, Greece, Table 3.23",
        OxidationFactor: "IPCC Guidelines for National Greenhouse Gas Inventories, 2006, Volume 2 'Energy', Chapter 1 'Introduction', Table 1.4",
        Density: "ΚΥΑ 354/2000/2001 (ΦΕΚ 410Β) - Υπολογισμένη βάσει της ελάχιστης και μέγιστης πυκνότητας"
      }
    }
  },

  LPG: {
    NCV: 47.3,
    EF_CO2: 63.10,
    EF_CH4: 8.71,
    EF_N2O: 1.64,
    OxidationFactor: 1,
    meta: {
      description: {
        NCV: "Καθαρή Θερμιδική Αξία του LPG (Net Calorific Value)",
        EF_CO2: "Συντελεστής εκπομπής CO2 για το LPG",
        EF_CH4: "Συντελεστής εκπομπής CH4 για το LPG",
        EF_N2O: "Συντελεστής εκπομπής N2O για το LPG",
        OxidationFactor: "Συντελεστής οξείδωσης άνθρακα του LPG"
      },
      units: {
        NCV: "TJ/Ktn",
        EF_CO2: "tn CO2/TJ",
        EF_CH4: "kg CH4/TJ",
        EF_N2O: "kg N2O/TJ",
        OxidationFactor: "dimensionless"
      },
      sources: {
        NCV: "National Inventory Report 2022, Greece, Table 3.13",
        EF_CO2: "National Inventory Report 2022, Greece, Table 3.13",
        EF_CH4: "National Inventory Report 2022, Greece, Table 3.23",
        EF_N2O: "National Inventory Report 2022, Greece, Table 3.23",
        OxidationFactor: "IPCC Guidelines for National Greenhouse Gas Inventories, 2006, Volume 2 'Energy', Chapter 1 'Introduction', Table 1.4"
      }
    }
  },

  NaturalGas: {
    EF_CO2: 55.69,
    EF_CH4_Heating: 5,
    EF_CH4_Vehicles: 102.22,
    EF_N2O_Heating: 0.1,
    EF_N2O_Vehicles: 3.33,
    OxidationFactor: 1,
    HigherCalorificValue: 11.889,
    Density: 454,
    meta: {
      description: {
        EF_CO2: "Συντελεστής εκπομπής CO2 για το φυσικό αέριο",
        EF_CH4_Heating: "Συντελεστής εκπομπής CH4 για θέρμανση με φυσικό αέριο",
        EF_CH4_Vehicles: "Συντελεστής εκπομπής CH4 για οχήματα με φυσικό αέριο (CNG)",
        EF_N2O_Heating: "Συντελεστής εκπομπής N2O για θέρμανση με φυσικό αέριο",
        EF_N2O_Vehicles: "Συντελεστής εκπομπής N2O για οχήματα με φυσικό αέριο (CNG)",
        OxidationFactor: "Συντελεστής οξείδωσης άνθρακα του φυσικού αερίου",
        HigherCalorificValue: "Ανώτερη Θερμογόνος Δύναμη του φυσικού αερίου (μέση τιμή)",
        Density: "Μέση πυκνότητα φυσικού αερίου"
      },
      units: {
        EF_CO2: "tn CO2/TJ",
        EF_CH4_Heating: "kg CH4/TJ",
        EF_CH4_Vehicles: "kg CH4/TJ",
        EF_N2O_Heating: "kg N2O/TJ",
        EF_N2O_Vehicles: "kg N2O/TJ",
        OxidationFactor: "dimensionless",
        HigherCalorificValue: "kWh/Nm3",
        Density: "kg/m3"
      },
      sources: {
        EF_CO2: "National Inventory Report 2022, Greece, Table 3.13 και ΔΕΣΦΑ Α.Ε.",
        EF_CH4_Heating: "IPCC Guidelines for National Greenhouse Gas Inventories, Volume 2 'Energy', Chapter 2 'Stationary Combustion', Table 2.4",
        EF_CH4_Vehicles: "National Inventory Report 2022, Greece, Table 3.23",
        EF_N2O_Heating: "IPCC Guidelines for National Greenhouse Gas Inventories, Volume 2 'Energy', Chapter 2 'Stationary Combustion', Table 2.4",
        EF_N2O_Vehicles: "National Inventory Report 2022, Greece, Table 3.23",
        OxidationFactor: "IPCC Guidelines for National Greenhouse Gas Inventories, 2006, Volume 2 'Energy', Chapter 1 'Introduction', Table 1.4",
        HigherCalorificValue: "ΔΕΣΦΑ Α.Ε. (μέση τιμή μεταξύ 11,131 και 12,647 kWh/Nm3)",
        Density: "ΔΕΣΦΑ Α.Ε. (μέση τιμή μεταξύ 430 και 478 kg/m3)"
      }
    }
  },

  WoodyBiomass: {
    NCV: 0.0156,
    EF_CH4: 300,
    EF_N2O: 4,
    CarbonConcentration: 0.475,
    MoistureFirewood: 0.3,
    MoisturePellets: 0.05,
    OxidationFactorFirewood: 0.9,
    OxidationFactorPellets: 1,
    meta: {
      description: {
        NCV: "Καθαρή Θερμιδική Αξία της ξυλώδους βιομάζας (μέση τιμή για διάφορα είδη ξύλου)",
        EF_CH4: "Συντελεστής εκπομπής CH4 για την ξυλώδη βιομάζα",
        EF_N2O: "Συντελεστής εκπομπής N2O για την ξυλώδη βιομάζα",
        CarbonConcentration: "Περιεκτικότητα σε άνθρακα της ξυλώδους βιομάζας (μέση τιμή για τα περισσότερα είδη ξύλου)",
        MoistureFirewood: "Ποσοστό υγρασίας καυσόξυλων",
        MoisturePellets: "Ποσοστό υγρασίας pellet",
        OxidationFactorFirewood: "Συντελεστής οξείδωσης άνθρακα για καυσόξυλα",
        OxidationFactorPellets: "Συντελεστής οξείδωσης άνθρακα για pellets"
      },
      units: {
        NCV: "TJ/tn",
        EF_CH4: "kg CH4/TJ",
        EF_N2O: "kg N2O/TJ",
        CarbonConcentration: "tn C/tn dry biomass",
        MoistureFirewood: "fraction",
        MoisturePellets: "fraction",
        OxidationFactorFirewood: "dimensionless",
        OxidationFactorPellets: "dimensionless"
      },
      sources: {
        NCV: "IPCC Guidelines for National Greenhouse Gas Inventories, Volume 2 'Energy', Chapter 1 'Introduction', Table 1.2",
        EF_CH4: "IPCC Guidelines for National Greenhouse Gas Inventories, Volume 2 'Energy', Chapter 2 'Stationary Combustion', Table 2.4",
        EF_N2O: "IPCC Guidelines for National Greenhouse Gas Inventories, Volume 2 'Energy', Chapter 2 'Stationary Combustion', Table 2.4",
        CarbonConcentration: "Μέση τιμή για τα περισσότερα είδη ξύλου",
        MoistureFirewood: "Μέση τιμή μεταξύ φρεσκοκομμένων ξύλων και εντελώς στεγνών ξύλων αποθηκευμένων σε ξηρό μέρος",
        MoisturePellets: "Τιμή δεδομένων αγοράς από τεχνικές προδιαγραφές προϊόντων",
        OxidationFactorFirewood: "IPCC Guidelines for National Greenhouse Gas Inventories, 2006, Volume 2 'Energy', Chapter 1 'Introduction', Table 1.4 (προσαρμοσμένη τιμή)",
        OxidationFactorPellets: "IPCC Guidelines for National Greenhouse Gas Inventories, 2006, Volume 2 'Energy', Chapter 1 'Introduction', Table 1.4"
      }
    }
  },

  Electricity: {
    EF_CO2: 436.889,
    EF_CH4: 0.011215,
    EF_N2O: 0.004173,
    meta: {
      description: {
        EF_CO2: "Συντελεστής εκπομπής CO2 από την παραγωγή ηλεκτρικής ενέργειας (Υπολειπόμενο Ενεργειακό Μίγμα)",
        EF_CH4: "Συντελεστής εκπομπής CH4 από την παραγωγή ηλεκτρικής ενέργειας",
        EF_N2O: "Συντελεστής εκπομπής N2O από την παραγωγή ηλεκτρικής ενέργειας"
      },
      units: {
        EF_CO2: "g CO2/kWh",
        EF_CH4: "g CH4/kWh",
        EF_N2O: "g N2O/kWh"
      },
      sources: {
        EF_CO2: "Έκθεση Ενεργειακού Μίγματος 2021, ΔΑΠΕΕΠ, Πίνακας Υπολειπόμενου Ενεργειακού Μίγματος",
        EF_CH4: "National Inventory Report 2022, Greece, Chapter Energy, Table 2.4b (0.43 Ktn CH4 / 38.34 TWh)",
        EF_N2O: "National Inventory Report 2022, Greece, Chapter Energy, Table 2.5b (0.16 Ktn N2O / 38.34 TWh)"
      }
    }
  },

  SolidWaste: {
    OX_XYTA_XYTY: 0.1,
    OX_XADA: 0,
    MCF: {
      XYTA_XYTY: 1,
      XADA_MORE_THAN_5M: 0.8,
      XADA_LESS_THAN_5M: 0.4
    },
    A1_PAPER_CARBON: 0.4,
    B1_TEXTILE_CARBON: 0.24,
    C1_FOODWASTE_CARBON: 0.15,
    D1_GREEN_WASTE_CARBON: 0.2,
    E1_WOOD_CARBON: 0.43,
    ST1_DEHYDRATED_MUD_CARBON: 0.45,
    DOCF: 0.5,
    F: 0.5,
    C_TO_CH4_CONVERSION: 16 / 12,
    meta: {
      description: {
        OX_XYTA_XYTY: "Συντελεστής οξείδωσης του μεθανίου στο εδαφικό υλικό κάλυψης των αποβλήτων για ΧΥΤΑ ή ΧΥΤΥ",
        OX_XADA: "Συντελεστής οξείδωσης του μεθανίου στο εδαφικό υλικό κάλυψης των αποβλήτων για ΧΑΔΑ",
        MCF: {
          _self: "Συντελεστής διόρθωσης μεθανίου - χρησιμοποιείται λόγω του ότι στους ΧΑΔΑ το ποσοστό των αποβλήτων που αποδομείται αερόβια στην επιφάνεια της απόθεσης είναι μεγαλύτερο από το αντίστοιχο ποσοστό στους ΧΥΤΑ ή ΧΥΤΥ",
          XYTA_XYTY: "Συντελεστής διόρθωσης μεθανίου για ΧΥΤΑ/ΧΥΤΥ",
          XADA_MORE_THAN_5M: "Συντελεστής διόρθωσης μεθανίου για ΧΑΔΑ με βάθος > 5m",
          XADA_LESS_THAN_5M: "Συντελεστής διόρθωσης μεθανίου για ΧΑΔΑ με βάθος < 5m"
        },
        A1_PAPER_CARBON: "Περιεκτικότητα χαρτιού σε οργανικό άνθρακα",
        B1_TEXTILE_CARBON: "Περιεκτικότητα υφασμάτων σε οργανικό άνθρακα",
        C1_FOODWASTE_CARBON: "Περιεκτικότητα αποβλήτων τροφίμων σε οργανικό άνθρακα",
        D1_GREEN_WASTE_CARBON: "Περιεκτικότητα 'πράσινων' και λοιπών αποδομήσιμων αποβλήτων σε οργανικό άνθρακα",
        E1_WOOD_CARBON: "Περιεκτικότητα αποβλήτων ξύλου και άχυρου σε οργανικό άνθρακα",
        ST1_DEHYDRATED_MUD_CARBON: "Περιεκτικότητα αφυδατωμένης ιλύος από επεξεργασία λυμάτων σε οργανικό άνθρακα",
        DOCF: "Ποσοστό του οργανικού άνθρακα που τελικώς αποδομείται και απελευθερώνεται",
        F: "Ποσοστό μεθανίου κατ' όγκο στα αέρια που παράγονται"
      },
      units: {
        OX_XYTA_XYTY: "dimensionless",
        OX_XADA: "dimensionless",
        MCF: {
          _self: "dimensionless",
          XYTA_XYTY: "dimensionless",
          XADA_MORE_THAN_5M: "dimensionless",
          XADA_LESS_THAN_5M: "dimensionless"
        },
        A1_PAPER_CARBON: "tn C/tn χαρτιού",
        B1_TEXTILE_CARBON: "tn C/tn υφασμάτων",
        C1_FOODWASTE_CARBON: "tn C/tn αποβλήτων τροφίμων",
        D1_GREEN_WASTE_CARBON: "tn C/tn 'πράσινων' και λοιπών αποδομήσιμων αποβλήτων",
        E1_WOOD_CARBON: "tn C/tn αποβλήτων ξύλου και άχυρου",
        ST1_DEHYDRATED_MUD_CARBON: "tn C/tn ιλύος",
        DOCF: "dimensionless",
        F: "dimensionless",
        C_TO_CH4_CONVERSION: "dimensionless"
      },
      sources: {
        OX_XYTA_XYTY: "National Inventory Report 2022, Greece",
        OX_XADA: "National Inventory Report 2022, Greece",
        MCF: {
          _self: "IPCC Guidelines, Chapter 5: Waste",
          XYTA_XYTY: "IPCC Guidelines, Chapter 5: Waste, Table 3.1",
          XADA_MORE_THAN_5M: "IPCC Guidelines, Chapter 5: Waste, Table 3.1",
          XADA_LESS_THAN_5M: "IPCC Guidelines, Chapter 5: Waste, Table 3.1"
        },
        A1_PAPER_CARBON: "National Inventory Report 2022, Greece",
        B1_TEXTILE_CARBON: "National Inventory Report 2022, Greece",
        C1_FOODWASTE_CARBON: "National Inventory Report 2022, Greece",
        D1_GREEN_WASTE_CARBON: "National Inventory Report 2022, Greece",
        E1_WOOD_CARBON: "National Inventory Report 2022, Greece",
        ST1_DEHYDRATED_MUD_CARBON: "National Inventory Report 2022, Greece",
        DOC_components: "National Inventory Report 2022, Greece",
        DOCF: "National Inventory Report 2022, Greece",
        F: "National Inventory Report 2022, Greece"
      }
    }
  },

  WastewaterTreatment: {
    Bo: 0.6,
    MCF: {
      KEL: 0.03,
      SEPTIC_TANK: 0.5,
      ABSORPTION_PIT: 0.1,
      UNTREATED_DISCHARGE: 0.11
    },
    FBOD: 57,
    I: {
      MIXED: 1.25,
      MUNICIPAL_ONLY: 1.00
    },
    EF_N2O_TREATMENT: {
      KEL: 0.016,
      SEPTIC_ABSORPTION: 0.0045
    },
    EF_N2O_DISCHARGE: 0.005,
    N2O_N_TO_N2O: 44 / 28,
    GRAMS_TO_TONNES: 0.000001,
    DAYS_PER_YEAR: 365,
    meta: {
      description: {
        Bo: "Μέγιστη δυναμικότητα παραγωγής CH4",
        MCF: {
          _self: "Συντελεστής διόρθωσης CH4 για κάθε πρακτική διαχείρισης",
          KEL: "Συντελεστής διόρθωσης CH4 για Κέντρα Επεξεργασίας Λυμάτων",
          SEPTIC_TANK: "Συντελεστής διόρθωσης CH4 για σηπτικές δεξαμενές",
          ABSORPTION_PIT: "Συντελεστής διόρθωσης CH4 για απορροφητικούς βόθρους",
          UNTREATED_DISCHARGE: "Συντελεστής διόρθωσης CH4 για ανεπεξέργαστη διάθεση"
        },
        FBOD: "Συντελεστής ημερήσιας παραγωγής οργανικού βιοαποδομήσιμου φορτίου λυμάτων ανά άτομο",
        I: {
          _self: "Συντελεστής διόρθωσης για βιομηχανικά/εμπορικά λύματα",
          MIXED: "Συντελεστής διόρθωσης για μικτά λύματα (αστικά και βιομηχανικά)",
          MUNICIPAL_ONLY: "Συντελεστής διόρθωσης για αμιγώς αστικά λύματα"
        },
        EF_N2O_TREATMENT: {
          _self: "Συντελεστής εκπομπής N2O από την επεξεργασία των λυμάτων",
          KEL: "Συντελεστής εκπομπής N2O από ΚΕΛ",
          SEPTIC_ABSORPTION: "Συντελεστής εκπομπής N2O από σηπτικές δεξαμενές και απορροφητικούς βόθρους"
        },
        EF_N2O_DISCHARGE: "Συντελεστής εκπομπής N2O από την διάθεση λυμάτων σε υδάτινο αποδέκτη"
      },
      units: {
        Bo: "tn CH4/tn BOD",
        MCF: {
          _self: "dimensionless",
          KEL: "dimensionless",
          SEPTIC_TANK: "dimensionless",
          ABSORPTION_PIT: "dimensionless",
          UNTREATED_DISCHARGE: "dimensionless"
        },
        FBOD: "gr/capita/day",
        I: {
          _self: "dimensionless",
          MIXED: "dimensionless",
          MUNICIPAL_ONLY: "dimensionless"
        },
        EF_N2O_TREATMENT: {
          _self: "tn N2O-N/tn N",
          KEL: "tn N2O-N/tn N",
          SEPTIC_ABSORPTION: "tn N2O-N/tn N"
        },
        EF_N2O_DISCHARGE: "tn N2O-N/tn N",
        N2O_N_TO_N2O: "dimensionless",
        GRAMS_TO_TONNES: "dimensionless",
        DAYS_PER_YEAR: "days"
      },
      sources: {
        Bo: "2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 6, Table 6.2",
        MCF: {
          _self: "2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 6, Table 6.3",
          KEL: "2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 6, Table 6.3",
          SEPTIC_TANK: "2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 6, Table 6.3",
          ABSORPTION_PIT: "2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 6, Table 6.3",
          UNTREATED_DISCHARGE: "2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 6, Table 6.3"
        },
        FBOD: "2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 6, Table 6.4",
        I: {
          _self: "2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 6",
          MIXED: "2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 6",
          MUNICIPAL_ONLY: "2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 6"
        },
        EF_N2O_TREATMENT: {
          _self: "2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 6, Table 6.8A",
          KEL: "2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 6, Table 6.8A",
          SEPTIC_ABSORPTION: "2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 6, Table 6.8A"
        },
        EF_N2O_DISCHARGE: "2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 6, Table 6.8A"
      }
    }
  },

  Composting: {
    EF_CH4: 4,
    EF_N2O: 0.24,
    KG_TO_TONNES: 0.001,
    meta: {
      description: {
        info: "Υπολογισμός εκπομπών από την λιπασματοποίηση οργανικών στερεών αποβλήτων. Τα αέρια του θερμοκηπίου που παράγονται από τις βιολογικές διεργασίες είναι το μεθάνιο (CH4) και το πρωτοξείδιο του αζώτου (N2O).",
        EF_CH4: "Συντελεστής εκπομπής CH4 από διεργασίες λιπασματοποίησης (επί κανονικού βάρους αποβλήτων, όχι επί ξηρού βάρους)",
        EF_N2O: "Συντελεστής εκπομπής N2O από διεργασίες λιπασματοποίησης (επί κανονικού βάρους αποβλήτων, όχι επί ξηρού βάρους)",
        KG_TO_TONNES: "Συντελεστής μετατροπής κιλών (kg) σε τόνους (tn)",
      },
      units: {
        EF_CH4: "kg CH4/tn αποβλήτων",
        EF_N2O: "kg N2O/tn αποβλήτων",
        KG_TO_TONNES: "dimensionless",
      },
      sources: {
        EF_CH4: "2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 4: Biological Treatment of Solid Waste, Table 4.1",
        EF_N2O: "2006 IPCC Guidelines for National Greenhouse Gas Inventories, Chapter 4: Biological Treatment of Solid Waste, Table 4.1",
      }
    }
  },

  CO2Absorption: {
    WOOD_MOISTURE_CONTENT: 0.55,
    WOOD_CARBON_CONTENT: 0.475,
    C_TO_CO2_CONVERSION: 44 / 12,
    TreeTypes: {
      ORANGE_BITTER_ORANGE: "ORANGE_BITTER_ORANGE",
      OLIVE: "OLIVE",
      OTHER: "OTHER"
    },
    GrowthPhase: {
      JUVENILE: "JUVENILE",
      MATURE: "MATURE"
    },
    AnnualDevelopmentRate: {
      ORANGE_BITTER_ORANGE: {
        JUVENILE: 0.00380,
        MATURE: 0.01220,
        MATURE_PHASE_START_YEAR: 6
      },
      OLIVE: {
        JUVENILE: 0.00970,
        MATURE: 0.01859,
        MATURE_PHASE_START_YEAR: 7
      },
      OTHER: {
        JUVENILE: 0.00745,
        MATURE: 0.01695,
        MATURE_PHASE_START_YEAR: 7
      }
    },
    meta: {
      description: {
        general: "Υπολογισμός απορροφήσεων CO2 από δέντρα σε πάρκα, χώρους πρασίνου και πεζοδρόμια του Δήμου. Υπολογίζεται η ποσότητα CO2 που απορροφάται για την δημιουργία της ετήσιας νέας ξυλώδους βιομάζας του δέντρου (αύξηση κορμού, νέα κλαδιά, νέες ρίζες).",
        WOOD_MOISTURE_CONTENT: "Ποσοστό υγρασίας του ξύλου (μέση τιμή φρεσκοκομμένων κλαδεμάτων για τα περισσότερα συνήθη είδη δένδρων)",
        WOOD_CARBON_CONTENT: "Περιεκτικότητα σε άνθρακα της ξυλώδους βιομάζας (μέση τιμή που καλύπτει τα περισσότερα συνήθη είδη δένδρων, τόσο σκληρού ξύλου όσο και μαλακού ξύλου)",
        C_TO_CO2_CONVERSION: "Συντελεστής μετατροπής μάζας C σε μάζα CO2",
        TreeTypes: {
          _self: "Κατηγορίες δέντρων",
          ORANGE_BITTER_ORANGE: "Νερατζιά/Πορτοκαλιά και λοιπά εσπεριδοειδή (μανταρινιά, λεμονιά, κλπ.)",
          OLIVE: "Ελιά",
          OTHER: "Λοιπά είδη δέντρων"
        },
        GrowthPhase: {
          _self: "Φάσεις ανάπτυξης δέντρων",
          JUVENILE: "Νεανική φάση",
          MATURE: "Ώριμη φάση"
        },
        AnnualDevelopmentRate: {
          _self: "Ετήσιος ρυθμός ανάπτυξης ξυλώδους βιομάζας (κορμός, κλαδιά, ρίζες) ανά είδος δέντρου και φάση ανάπτυξης",
          ORANGE_BITTER_ORANGE: {
            _self: "Ρυθμός ανάπτυξης για εσπεριδοειδή",
            JUVENILE: "Ρυθμός ανάπτυξης στη νεανική φάση",
            MATURE: "Ρυθμός ανάπτυξης στην ώριμη φάση",
            MATURE_PHASE_START_YEAR: "Έτη από φύτευση μέχρι την έναρξη της ώριμης φάσης"
          },
          OLIVE: {
            _self: "Ρυθμός ανάπτυξης για ελιά",
            JUVENILE: "Ρυθμός ανάπτυξης στη νεανική φάση",
            MATURE: "Ρυθμός ανάπτυξης στην ώριμη φάση",
            MATURE_PHASE_START_YEAR: "Έτη από φύτευση μέχρι την έναρξη της ώριμης φάσης"
          },
          OTHER: {
            _self: "Ρυθμός ανάπτυξης για λοιπά είδη",
            JUVENILE: "Ρυθμός ανάπτυξης στη νεανική φάση",
            MATURE: "Ρυθμός ανάπτυξης στην ώριμη φάση",
            MATURE_PHASE_START_YEAR: "Έτη από φύτευση μέχρι την έναρξη της ώριμης φάσης"
          }
        }
      },
      units: {
        WOOD_MOISTURE_CONTENT: "fraction",
        WOOD_CARBON_CONTENT: "tn C/tn ξηρή βιομάζα",
        C_TO_CO2_CONVERSION: "dimensionless",
        TreeTypes: {
          _self: "dimensionless",
          ORANGE_BITTER_ORANGE: "dimensionless",
          OLIVE: "dimensionless",
          OTHER: "dimensionless"
        },
        GrowthPhase: {
          _self: "dimensionless",
          JUVENILE: "dimensionless",
          MATURE: "dimensionless"
        },
        AnnualDevelopmentRate: {
          _self: "tn ξηρής ξυλώδους βιομάζας/δένδρο/έτος",
          ORANGE_BITTER_ORANGE: {
            _self: "tn ξηρής ξυλώδους βιομάζας/δένδρο/έτος",
            JUVENILE: "tn ξηρής ξυλώδους βιομάζας/δένδρο/έτος",
            MATURE: "tn ξηρής ξυλώδους βιομάζας/δένδρο/έτος",
            MATURE_PHASE_START_YEAR: "έτη"
          },
          OLIVE: {
            _self: "tn ξηρής ξυλώδους βιομάζας/δένδρο/έτος",
            JUVENILE: "tn ξηρής ξυλώδους βιομάζας/δένδρο/έτος",
            MATURE: "tn ξηρής ξυλώδους βιομάζας/δένδρο/έτος",
            MATURE_PHASE_START_YEAR: "έτη"
          },
          OTHER: {
            _self: "tn ξηρής ξυλώδους βιομάζας/δένδρο/έτος",
            JUVENILE: "tn ξηρής ξυλώδους βιομάζας/δένδρο/έτος",
            MATURE: "tn ξηρής ξυλώδους βιομάζας/δένδρο/έτος",
            MATURE_PHASE_START_YEAR: "έτη"
          }
        }
      },
      sources: {
        AnnualDevelopmentRate: {
          _self: "Πειραματικές μετρήσεις πεδίου",
          ORANGE_BITTER_ORANGE: {
            _self: "Πειραματικές μετρήσεις πεδίου από το Γεωπονικό Πανεπιστήμιο Αθηνών, έργο LIFE ClimaTree (ισχύει για νερατζιά, πορτοκαλιά, και λοιπά εσπεριδοειδή)",
            JUVENILE: "Πειραματικές μετρήσεις πεδίου από το Γεωπονικό Πανεπιστήμιο Αθηνών, έργο LIFE ClimaTree",
            MATURE: "Πειραματικές μετρήσεις πεδίου από το Γεωπονικό Πανεπιστήμιο Αθηνών, έργο LIFE ClimaTree",
            MATURE_PHASE_START_YEAR: "Πειραματικές μετρήσεις πεδίου από το Γεωπονικό Πανεπιστήμιο Αθηνών, έργο LIFE ClimaTree"
          },
          OLIVE: {
            _self: "Πειραματικές μετρήσεις πεδίου από το Γεωπονικό Πανεπιστήμιο Αθηνών, έργο LIFE ClimaTree",
            JUVENILE: "Πειραματικές μετρήσεις πεδίου από το Γεωπονικό Πανεπιστήμιο Αθηνών, έργο LIFE ClimaTree",
            MATURE: "Πειραματικές μετρήσεις πεδίου από το Γεωπονικό Πανεπιστήμιο Αθηνών, έργο LIFE ClimaTree",
            MATURE_PHASE_START_YEAR: "Πειραματικές μετρήσεις πεδίου από το Γεωπονικό Πανεπιστήμιο Αθηνών, έργο LIFE ClimaTree"
          },
          OTHER: {
            _self: "Προσεγγιστικοί συντελεστές λόγω έλλειψης επαρκών πειραματικών δεδομένων πεδίου",
            JUVENILE: "Προσεγγιστικοί συντελεστές λόγω έλλειψης επαρκών πειραματικών δεδομένων πεδίου",
            MATURE: "Προσεγγιστικοί συντελεστές λόγω έλλειψης επαρκών πειραματικών δεδομένων πεδίου",
            MATURE_PHASE_START_YEAR: "Προσεγγιστικοί συντελεστές λόγω έλλειψης επαρκών πειραματικών δεδομένων πεδίου"
          }
        }
      }
    }
  },

  Uncertainty: {
    ActivityData: {
      SOLID_FUELS: 0.03,
      LIQUID_FUELS: 0.03,
      GAS_FUELS: 0.03,
      ELECTRICITY: 0.05,
      COOLING: 0,
      WASTE_MANAGEMENT: 0.30,
      COMPOSTING: 0.05,
      WASTEWATER_MANAGEMENT: 0
    },
    EmissionFactors: {
      SOLID_FUELS: 0.03,
      LIQUID_FUELS: 0.03,
      GAS_FUELS: 0.03,
      ELECTRICITY: 0.05,
      COOLING: 0,
      WASTE_MANAGEMENT: 0.30,
      COMPOSTING_CH4: 0.30,
      COMPOSTING_N2O: 1.00,
      WASTEWATER_MANAGEMENT: 0.3
    },
    meta: {
      description: {
        ActivityData: {
          _self: "Αβεβαιότητα δεδομένων δραστηριότητας",
          SOLID_FUELS: "Αβεβαιότητα δεδομένων κατανάλωσης στερεών καυσίμων",
          LIQUID_FUELS: "Αβεβαιότητα δεδομένων κατανάλωσης υγρών καυσίμων",
          GAS_FUELS: "Αβεβαιότητα δεδομένων κατανάλωσης αέριων καυσίμων",
          ELECTRICITY: "Αβεβαιότητα δεδομένων κατανάλωσης ηλεκτρικής ενέργειας",
          COOLING: "Αβεβαιότητα δεδομένων κατανάλωσης θερμότητας",
          WASTE_MANAGEMENT: "Αβεβαιότητα δεδομένων διαχείρισης αποβλήτων",
          COMPOSTING: "Αβεβαιότητα δεδομένων λιπασματοποίησης",
          WASTEWATER_MANAGEMENT: "Αβεβαιότητα δεδομένων επεξεργασίας λυμάτων"
        },
        EmissionFactors: {
          _self: "Αβεβαιότητα συντελεστών εκπομπής",
          SOLID_FUELS: "Αβεβαιότητα συντελεστών εκπομπής στερεών καυσίμων",
          LIQUID_FUELS: "Αβεβαιότητα συντελεστών εκπομπής υγρών καυσίμων",
          GAS_FUELS: "Αβεβαιότητα συντελεστών εκπομπής αέριων καυσίμων",
          ELECTRICITY: "Αβεβαιότητα συντελεστών εκπομπής ηλεκτρικής ενέργειας",
          COOLING: "Αβεβαιότητα συντελεστών εκπομπής θερμότητας",
          WASTE_MANAGEMENT: "Αβεβαιότητα συντελεστών εκπομπής διαχείρισης αποβλήτων",
          COMPOSTING_CH4: "Αβεβαιότητα συντελεστή εκπομπής CH4 από λιπασματοποίηση",
          COMPOSTING_N2O: "Αβεβαιότητα συντελεστή εκπομπής N2O από λιπασματοποίηση",
          WASTEWATER_MANAGEMENT: "Αβεβαιότητα συντελεστών εκπομπής επεξεργασίας λυμάτων"
        }
      },
      units: {
        ActivityData: {
          _self: "fraction",
          SOLID_FUELS: "fraction",
          LIQUID_FUELS: "fraction",
          GAS_FUELS: "fraction",
          ELECTRICITY: "fraction",
          WASTE_MANAGEMENT: "fraction",
          COMPOSTING: "fraction",
          WASTEWATER_MANAGEMENT: "fraction"
        },
        EmissionFactors: {
          _self: "fraction",
          SOLID_FUELS: "fraction",
          LIQUID_FUELS: "fraction",
          GAS_FUELS: "fraction",
          ELECTRICITY: "fraction",
          WASTE_MANAGEMENT: "fraction",
          COMPOSTING_CH4: "fraction",
          COMPOSTING_N2O: "fraction",
          WASTEWATER_MANAGEMENT: "fraction"
        }
      },
      sources: {
        ActivityData: {
          _self: "Table 3.13 of Municipal Emission Reduction Plans Guide",
          SOLID_FUELS: "Table 3.13 of Municipal Emission Reduction Plans Guide",
          LIQUID_FUELS: "Table 3.13 of Municipal Emission Reduction Plans Guide",
          GAS_FUELS: "Table 3.13 of Municipal Emission Reduction Plans Guide",
          ELECTRICITY: "Table 3.13 of Municipal Emission Reduction Plans Guide",
          WASTE_MANAGEMENT: "Table 3.13 of Municipal Emission Reduction Plans Guide",
          COMPOSTING: "Table 3.13 of Municipal Emission Reduction Plans Guide",
          WASTEWATER_MANAGEMENT: "Table 3.13 of Municipal Emission Reduction Plans Guide"
        },
        EmissionFactors: {
          _self: "Table 3.13 of Municipal Emission Reduction Plans Guide",
          SOLID_FUELS: "Table 3.13 of Municipal Emission Reduction Plans Guide",
          LIQUID_FUELS: "Table 3.13 of Municipal Emission Reduction Plans Guide",
          GAS_FUELS: "Table 3.13 of Municipal Emission Reduction Plans Guide",
          ELECTRICITY: "Table 3.13 of Municipal Emission Reduction Plans Guide",
          WASTE_MANAGEMENT: "Table 3.13 of Municipal Emission Reduction Plans Guide",
          COMPOSTING_CH4: "Table 3.13 of Municipal Emission Reduction Plans Guide",
          COMPOSTING_N2O: "Table 3.13 of Municipal Emission Reduction Plans Guide",
          WASTEWATER_MANAGEMENT: "Table 3.13 of Municipal Emission Reduction Plans Guide"
        }
      }
    }
  }
};

export default defaultConstants;
