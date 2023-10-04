const { parseToRgb, rgb } = require('polished')

function getGradientShade (hex) {
  const color = parseToRgb(hex)
  color.red = overlay(color.red)
  color.green = overlay(color.green)
  color.blue = overlay(color.blue)
  return rgb(color)
}

function overlay(source, overlay = 76) {
  const value = source < 128
    ? (2 * overlay * source / 255)
    : (255 - 2 * (255 - overlay) * (255 - source) / 255)
  return Math.round(value)
}

export default getGradientShade
