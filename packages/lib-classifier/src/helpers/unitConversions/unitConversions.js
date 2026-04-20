/**
 * Conversion factors and display labels for each supported measurement unit.
 * All `factor` values convert from meters (the internal storage unit).
 */
const UNIT_CONVERSIONS = {
  meters: { factor: 1, label: 'm' },
  kilometers: { factor: 0.001, label: 'km' },
  feet: { factor: 3.28084, label: 'ft' },
  miles: { factor: 0.000621371, label: 'mi' },
  'nautical miles': { factor: 0.000539957, label: 'nmi' },
  degrees: { factor: 1, label: 'm' }
}

export default UNIT_CONVERSIONS
