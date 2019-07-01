const theme = {
  anchor: {
    extend: props => `
      & {
        border-bottom: 2px solid transparent;
        border-top: 2px solid transparent;
        ${props.active && `
          font-weight: bold;
          color: white;
          border-bottom-color: white;
        `}
      }
    `,
    fontWeight: 'normal',
    hover: {
      extend: `
        background: rgba(255,255,255,0.2);
        color: white;
      `,
      textDecoration: 'none'
    }
  }
}

export default theme
