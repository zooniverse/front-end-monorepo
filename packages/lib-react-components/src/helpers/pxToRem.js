import _ from 'lodash'

const BASE_FONT_SIZE = 15

function pxToRem(px) {
  if (!_.isNumber(px)) {
    throw new TypeError('Argument for pxToRem must be an integer or float.')
  }

  const converted = _.round((px / BASE_FONT_SIZE), 9)
  return `${converted}rem`
}

export default pxToRem