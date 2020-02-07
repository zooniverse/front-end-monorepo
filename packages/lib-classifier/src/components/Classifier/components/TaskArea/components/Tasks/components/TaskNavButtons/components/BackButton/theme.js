import { darken, lighten } from 'polished'
import { css } from 'styled-components'

const theme = {
  button: {
    border: {
      color: {
        dark: 'light-3',
        light: 'transparent'
      },
      width: '1px'
    },
    color: {
      dark: 'light-3',
      light: 'dark-5'
    },
    extend: props => {
      const { theme: { dark, global: { colors } } } = props
      const lighterAccent2 = lighten(0.05, colors['accent-2'])
      const darkerAccent2 = darken(0.11, colors['accent-2'])
      const background = dark ? colors['dark-1'] : colors['light-1']
      const backgroundFocusColor = dark ?
        colors['dark-1'] :
        `linear-gradient(
            ${lighterAccent2},
            ${darkerAccent2}
          )`
      const borderFocusColor = dark ?
        `solid thin ${colors['dark-5']}` :
        `solid thin transparent`
      const focusColor = dark ?
       'light-3' :
       'black'
      return css`
        background: ${background};
        height: 100%;
        text-transform: capitalize;
        width: 100%;

        &:focus,
        &:hover {
          background: ${backgroundFocusColor};
          border: ${borderFocusColor};
          box-shadow: none;
          color: ${focusColor};
        }
      `
    },
    padding: {
      horizontal: props => props.theme.global.edgeSize.small,
      vertical: props => props.theme.global.edgeSize.xsmall
    }
  }
}

export default theme
