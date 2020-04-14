import { normalizeColor } from 'grommet/utils'
import { css } from 'styled-components'
import getGradientShade from '../helpers/getGradientShade'

const theme = {
  button: {
    border: {
      color: 'brand',
      width: '1px'
    },
    color: {
      dark: 'white',
      light: 'white'
    },
    primary: {
      color: {
        dark: 'dark-3',
        light: 'brand'
      }
    },
    extend: props => {
      const color = normalizeColor('brand', props.theme)
      const gradientShade = getGradientShade(color)

      // This shouldn't be necessary where we're manually setting the color with our own ternary,
      // but style collision is happening
      // so the theme color under color.light isn't being applied
      // needs more investigation, as it seems to be a Grommet bug
      const fontColor = props.theme.dark ? color : 'white'
      return css`
        transition: none;
        text-align: center;
        &:disabled {
          cursor: not-allowed;
        }
        &:focus:not(:disabled),
        &:hover:not(:disabled) {
          color: white;
          background: linear-gradient(${color}, ${gradientShade});
          box-shadow: none;
        }
        &:active:not(:disabled) {
          color: white;
          background: linear-gradient(${gradientShade}, ${color});
        }
    `}
  }
}

export default theme
