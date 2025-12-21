import { CONFIG, MATERIAL, TRANSPORT } from "./config.js";

export function calculateTotalLength(units, floors, hasBasement) {
  const risers = Math.ceil(units / CONFIG.UNITS_PER_RISER);

  let vertical = floors * CONFIG.FLOOR_HEIGHT * risers;
  if (hasBasement) vertical += CONFIG.FLOOR_HEIGHT * risers;

  const horizontal = units * CONFIG.HORIZONTAL_PER_UNIT;

  return vertical + horizontal;
}

export function calculateMaterial(materialKey, length) {
  const m = MATERIAL[materialKey];

  const weight = length * m.weightPerM;
  const A1A3 = weight * m.gwp;
  const A4 = weight * TRANSPORT.DISTANCE * TRANSPORT.FACTOR;
  const A5 = length * m.install;

  return {
    label: m.label,
    weight: Math.round(weight),
    totalCO2: Math.round(A1A3 + A4 + A5),
  };
}
