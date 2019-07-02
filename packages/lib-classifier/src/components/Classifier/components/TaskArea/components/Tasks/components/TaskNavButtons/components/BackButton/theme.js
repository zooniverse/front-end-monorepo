import { darken, lighten } from 'polished'

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
      return `
        background: ${ dark ? colors['dark-1'] : colors['light-1'] };
        height: 100%;
        text-transform: capitalize;
        width: 100%;

        &:focus,
        &:hover {
          background: ${dark ? colors['dark-1'] : `linear-gradient(
            ${lighten(0.05, colors['accent-2'])},
            ${darken(0.11, colors['accent-2'])}
          )`};
          border: ${dark ? `solid thin ${colors['dark-5']}` : 'solid thin transparent'};
          box-shadow: none;
          color: ${dark ? 'light-3' : 'black'};
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
