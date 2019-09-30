const theme = {
  button: {
    border: {
      width: '0'
    },
    color: 'black',
    extend: props => `
      background: ${props.theme.global.colors['neutral-4']};
      text-align: center;
      &:hover {
        box-shadow: none;
      }
      &:disabled {
        cursor: not-allowed;
      }
    `
  }
}

export default theme
