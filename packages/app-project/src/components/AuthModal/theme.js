export default {
  checkBox: {
    border: {
      width: '1px'
    },
    check: {
      radius: '0px',
    },
    gap: 'xsmall',
    size: '16px'
  },
  formField: {
    border: {
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

  }
}
