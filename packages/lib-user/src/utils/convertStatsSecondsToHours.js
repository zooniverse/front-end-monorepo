export function convertStatsSecondsToHours(seconds = 0) {
  // if seconds is NaN, undefined, null, 0, or falsey, return 0
  if (isNaN(seconds) || !seconds) {
    return 0
  }

  return Number((seconds / 3600).toFixed(1))
}
