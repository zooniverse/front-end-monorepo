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
    extend: props => `
      flex: 1 1 auto;
      text-transform: capitalize;

      &:disabled:hover {
        cursor: not-allowed;
      }

      &:focus:not(:disabled),
      &:hover:not(:disabled) {
        box-shadow: none;
        background: ${props.theme.dark
    ? props.theme.global.colors['neutral-4']
    : adjustHue(-7, props.theme.global.colors['neutral-4'])
};
        color: ${props.theme.dark ? 'white' : 'black'};
      }
    `,
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
