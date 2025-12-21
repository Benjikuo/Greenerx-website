export const CONFIG = {
  FLOOR_HEIGHT: 3,            // m
  UNITS_PER_RISER: 10,
  HORIZONTAL_PER_UNIT: 6,     // m
};

export const MATERIAL = {
  CAST_IRON: {
    label: "CIP 排水鑄鐵管",
    weightPerM: 15,
    gwp: 2.0,
    install: 2.0,
  },
  PVC: {
    label: "PVC 排水管",
    weightPerM: 5,     // kg/m
    gwp: 2.7,          // kgCO2e/kg
    install: 0.8,      // kgCO2e/m
  },
  HDPE: {
    label: "HDPE 排水管",
    weightPerM: 3.5,
    gwp: 1.8,
    install: 0.5,
  },
};

export const TRANSPORT = {
  DISTANCE: 100,        // km
  FACTOR: 0.0001,       // kgCO2e / kg·km
};
