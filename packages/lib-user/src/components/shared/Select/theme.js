const selectTheme = {
  global: {
    control: {
      border: {
        radius: '24px'
      },
      color: {
        dark: 'white',
        light: 'dark-5'
      }
    },
    drop: {
      background: 'brand'
    }
  },
  select: {
    // container: {}, // this is the drop content
    control: {
      // this is the select button/input
      extend: `
        font-weight: 700;
        border: none;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
        width: clamp(180px, 50%, 215px);

        &:focus:not(:focus-visible) {
          box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
        }
      `,
      open: {
        background: '#ADDDE0', // accent-1
        color: '#00979d' // brand
      }
    },
    icons: {
      color: {
        dark: 'white',
        light: 'dark-5'
      },
      margin: { left: '0', right: 'xsmall' }
    },
    listbox: {
      extend: `
        & > button {
          &[aria-selected='true'] {
            text-decoration: underline;
          }
        }
      `
    },
    options: {
      container: {
        align: 'center',
        width: '215px'
      },
      text: {
        textAlign: 'center',
        weight: 700
      }
    }
  }
}

export default selectTheme
