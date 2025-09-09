// Generate a cache of all the colors used during render
// This improves draw performance by avoiding re-calculating the same color every render

import { Color } from 'three'

const SATURATION_INACTIVE = 45
const SATURATION_ACTIVE = 100
const LIGHTNESS_CLAMP = .75
const COLOR_HUES = [
  90, 60, 30, 0, 330, 300, 270, 240, 210, 180, 150, 120
]

const colors = {
  canvas: {
    default: [],
    active: [],
    inactive: []
  },
  three: {
    default: [],
    active: [],
    inactive: []
  }
}

const pixelToPercent = (value) => {
  // 255 => 100%
  // 0 => 0%
  // 127.5 => 50%
  return `${Math.round((value / 255) * 100)}%` // normalize is some way
}

export const pointColor = ({
  annotationIndex = -1,
  isInactive = false,
  isThree = false,
  pointValue,
  threshold = { min: 5, max: 255 }
}) => {
  const ctx = isThree ? 'three' : 'canvas'
  const type = (annotationIndex === -1)
    ? 'default'
    : (isInactive)
      ? 'inactive'
      : 'active'

  // To allow infinite marks, we need to be able to "loop" through our colors
  const annotationIndexMod = annotationIndex % COLOR_HUES.length

  const pointValueClamped = (pointValue < threshold.min) 
    ? threshold.min
    : (pointValue > threshold.max)
      ? threshold.max
      : pointValue
  
  const pointValueScaled = Math.floor((pointValueClamped - threshold.min) * (255 / (threshold.max - threshold.min)))

  return (annotationIndex === -1)
    ? colors[ctx][type][pointValueScaled]
    : colors[ctx][type][annotationIndexMod][pointValueScaled]
}

// Generate the cached colors
COLOR_HUES.forEach((hue, i) => {
  colors.canvas.active[i] = []
  colors.three.active[i] = []

  colors.canvas.inactive[i] = []
  colors.three.inactive[i] = []

  for (let lightness = 0; lightness < 256; lightness++) {
    // Full lightness turns the mark color white
    const lightnessPercent = pixelToPercent(Math.floor(lightness * LIGHTNESS_CLAMP))

    // Default = marked & Inactive
    if (i === 0) {
      const hslDefault = `hsl(0, 0%, ${lightnessPercent})`
      colors.canvas.default[lightness] = hslDefault
      colors.three.default[lightness] = new Color(hslDefault)
    }
    
    // Active = marked and current mark
    const hslActive = `hsl(${hue}, ${SATURATION_ACTIVE}%, ${lightnessPercent})`
    colors.canvas.active[i][lightness] = hslActive
    colors.three.active[i][lightness] = new Color(hslActive)
    
    // Inactive = marked and not current mark
    const hslInactive = `hsl(${hue}, ${SATURATION_INACTIVE}%, ${lightnessPercent})`
    colors.canvas.inactive[i][lightness] = hslInactive
    colors.three.inactive[i][lightness] = new Color(hslInactive)
  }
})
