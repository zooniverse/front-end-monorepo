import { parseToRgb, rgb } from 'polished'

function getGradientShade (hex) {
  const color = parseToRgb(hex)
  color.red = overlay(color.red)
  color.green = overlay(color.green)
  color.blue = overlay(color.blue)
  return rgb(color)
}

// Works like Photoshop's blend mode for a given color channel. Note the default
// overlay value - the original design didn't use pure black as the overlay.
function overlay (source, overlay = 76) {
  const value = source < 128
    ? (2 * overlay * source / 255)
    : (255 - 2 * (255 - overlay) * (255 - source) / 255)
  return Math.round(value)
}

export default getGradientShade
