// Technique borrowed from
// https://stackoverflow.com/questions/48484767/javascript-check-if-string-is-valid-css-color
// Rather than use complicated regexes
// But we need to know if the custom string value submitted in the subject JSON is an actual color
// This will only work in the browser
// But that's ok since we are only rendering the classifier client side right now
function validateColor (color) {
  const tempElementStyle = new Option().style
  tempElementStyle.color = color
  // invalid colors will be an empty string
  if (tempElementStyle.color === '') {
    console.error(`Color for data subject viewer is invalid: ${color}`)
    return ''
  }
  return color || ''
}

function whichColor (color, themeColors, defaultColors, seriesIndex) {
  const chosenColor = themeColors[color] ||
    color ||
    defaultColors[seriesIndex]
  return validateColor(chosenColor)
}

export default function getDataSeriesColor({
    seriesOptions: seriesOptions = {},
    seriesIndex: seriesIndex = 0,
    themeColors: themeColors = {},
    defaultColors: defaultColors = [],
    focusedSeries: focusedSeries = []
} = {}) {
  const { color } = seriesOptions
  if (focusedSeries && focusedSeries[seriesIndex]) {
    const [focused] = Object.values(focusedSeries[seriesIndex]) || []
    if (focused) {
      return whichColor(color, themeColors, defaultColors, seriesIndex)
    } else {
      return (themeColors && themeColors['light-4']) ? validateColor(themeColors['light-4']) : whichColor(color, themeColors, defaultColors, seriesIndex)
    }
  }

  return whichColor(color, themeColors, defaultColors, seriesIndex)
}