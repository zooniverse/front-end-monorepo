const selectTheme = {
  global: {
    control: {
      border: {
        radius: '24px',
        color: {
          dark: 'light-5',
          light: 'white'
        },
        width: '0.5px'
      }
    },
    drop: {
      background: 'neutral-1'
    }
  },
  select: {
    control: {
      // this is the select button/input
      extend: `
        font-weight: 700;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);

        &:focus:not(:focus-visible) {
          box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
        }
      `,
      open: {
        background: '#ADDDE0', // accent-1
        color: '#005D69' // neutral-1
      }
    },
    icons: {
      color: {
        dark: 'white',
        light: 'neutral-1'
      },
      margin: { left: '0', right: 'xsmall' }
    },
    listbox: {
      extend: `
        & > button {
          text-transform: uppercase;
          &[aria-selected='true'] {
            text-decoration: underline;
          }
        }
      `
    },
    options: {
      container: {
        align: 'center'
      },
      text: {
        textAlign: 'center',
        weight: 700
      }
    }
  }
}

export default selectTheme
