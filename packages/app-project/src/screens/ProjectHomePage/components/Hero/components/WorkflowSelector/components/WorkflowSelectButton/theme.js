const theme = {
  button: {
    border: {
      width: '0'
    },
    color: 'black',
    extend: props => `
      text-align: center;
      background: ${props.theme.global.colors['neutral-4']};
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
