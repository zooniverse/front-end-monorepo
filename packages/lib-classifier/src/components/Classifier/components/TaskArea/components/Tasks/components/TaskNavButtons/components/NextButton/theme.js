import { adjustHue } from 'polished'

const nextButtonTheme = {
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
      flex: 3 0 auto;
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

        svg {
          fill: ${props.theme.dark ? 'white' : 'black'};
          stroke: ${props.theme.dark ? 'white' : 'black'};
        }
      }
    `,
    padding: {
      vertical: '10px'
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
      &:before {
        content: '${props.isRtl ? `← ` : ``}';
      }
      &:after {
        content: '${!props.isRtl ? ` →` : ``}';
      }
    `
  }
}

export default nextButtonTheme
