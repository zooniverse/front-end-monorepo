const theme = {
  text: {
    extend: props => `
      text-transform: capitalize;
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
