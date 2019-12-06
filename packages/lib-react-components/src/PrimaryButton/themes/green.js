import { normalizeColor } from 'grommet/utils'

import getGradientShade from '../helpers/getGradientShade'

const theme = {
  button: {
    border: {
      color: 'status-ok',
      width: '1px'
    },
    color: {
      dark: 'status-ok',
      light: 'white'
    },
    primary: {
      color: {
        dark: 'dark-3',
        light: 'status-ok'
      }
    },
    extend: props => {
      const color = normalizeColor('status-ok', props.theme)
      const gradientShade = getGradientShade(color)

      return `
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
