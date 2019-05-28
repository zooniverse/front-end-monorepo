export default {
  formField: {
    border: {
      color: {
        dark: 'dark-3',
        light: 'light-4'
      },
      side: 'all'
    },
    label: {
      margin: {
        horizontal: 'none',
        vertical: 'xsmall'
      }
    }
  },
  textInput: {
    extend: props => `
      color: ${props.theme.dark
        ? props.theme.global.colors['white']
        : props.theme.global.colors['dark-1']
      };
      font-weight: 400;
    `
  },
  global: {
    colors: {
      placeholder: {
        dark: 'dark-1',
        light: 'light-4'
      },
      text: 'white'
    }
  }
}
