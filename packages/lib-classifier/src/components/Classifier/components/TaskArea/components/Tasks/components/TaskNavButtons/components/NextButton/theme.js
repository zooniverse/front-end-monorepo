import { adjustHue } from 'polished'

const theme = {
  button: {
    border: {
      color: 'neutral-4',
      width: '1px'
    },
    color: {
      dark: 'neutral-4',
      light: 'black'
    },
    extend: props => {
      const { theme: { dark, global: { colors } } } = props
      return `
        box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
        flex: 1 1 auto;
        text-transform: capitalize;

        &:disabled:hover {
          cursor: not-allowed;
        }

        &:focus:not(:disabled),
        &:hover:not(:disabled) {
          background: ${dark ? colors['neutral-4'] : adjustHue(-7, colors['neutral-4'])};
          box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
          color: ${dark ? 'white' : 'black'};
        }
      `
    },
    padding: {
      horizontal: props => props.theme.global.edgeSize.small,
      vertical: props => props.theme.global.edgeSize.xsmall
    },
    primary: {
      color: {
        dark: 'dark-3',
        light: 'neutral-4'
      }
    }
  },
  text: {
    extend: props => `
      html[lang="ar"],
      html[lang="he"] {
        &:after {
          content: ' ←';
        }
      }
      &:after {
        content: ' →';
      }
    `
  }
}

export default theme
