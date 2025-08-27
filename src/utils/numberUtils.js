export function roundNearestInt(value) {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  return Number(value.toFixed(0));
}

export function minArray(values) {
  if (!values || values.length === 0) return 0;
  let min = values[0];
  for (let i = 1; i < values.length; i += 1) {
    const v = values[i];
    if (v < min) min = v;
  }
  return min;
}

export function maxArray(values) {
  if (!values || values.length === 0) return 0;
  let max = values[0];
  for (let i = 1; i < values.length; i += 1) {
    const v = values[i];
    if (v > max) max = v;
  }
  return max;
}

export function ensureAtLeast(value, minValue) {
  return value < minValue ? minValue : value;
}

