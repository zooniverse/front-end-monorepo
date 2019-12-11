import { normalizeColor } from 'grommet/utils'

import getGradientShade from '../helpers/getGradientShade'

const theme = {
  button: {
    border: {
      color: 'neutral-5',
      width: '1px'
    },
    color: {
      dark: 'neutral-5',
      light: 'black'
    },
    primary: {
      color: {
        dark: 'dark-3',
        light: 'neutral-5'
      }
    },
    extend: props => {
      const color = normalizeColor('neutral-5', props.theme)
      const gradientShade = getGradientShade(color)

      return `
        transition: none;
        text-align: center;
        &:disabled {
          cursor: not-allowed;
        }
        &:focus:not(:disabled),
        &:hover:not(:disabled) {
          color: black;
          background: linear-gradient(${color}, ${gradientShade});
          box-shadow: none;
        }
        &:active:not(:disabled) {
          color: black;
          background: linear-gradient(${gradientShade}, ${color});
        }
    `}
  }
}

export default theme
