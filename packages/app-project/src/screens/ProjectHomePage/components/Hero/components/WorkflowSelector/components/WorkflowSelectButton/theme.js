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
    `
  },
}

export default theme
