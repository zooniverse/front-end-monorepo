const deepFreeze = require('deep-freeze')

// Zooniverse brand: https://projects.invisionapp.com/dsm/zooniverse/primary-brand/folder/colors/5bbd0dbcd018e900118186e8
const brand = '#00979d'

// dark colors
const darkBlack = '#2D2D2D'
const lightBlack = '#272727'
const darkestGrey = '#333333'
const darkerGrey = '#404040'
const darkGrey = '#5C5C5C'

// light colors
const lightestGrey = '#eff2f5'
const lighterGrey = '#ebebeb'
const lightGrey = '#e2e5e9'
const grey = '#CBCCCB'
const midGrey = '#a6a7a9'
const moreMiddleGrey = '#979797'

// status
const tomato = '#E45950'
const pink = '#FFB6AA'
const darkGold = '#CC9200'
const green = '#078F52'

// accent colors
const mint = '#B8E986'
const lightGold = '#f6d885'
const lightNavy = '#6D91B3'
const lightTeal = '#addde0'

// neutral colors
const darkGreen = '#345446'
const darkTeal = '#005D69'
const navy = '#0C4881'
const gold = '#f0b200'

const accentColors = [
  mint, // accent-1
  lightTeal, // accent-2
  lightNavy, // accent-3
  lightGold // accent-4
]

const neutralColors = [
  darkGreen, // neutral-1
  darkTeal, // neutral-2
  navy, // neutral-3
  gold // neutral-4
]

const statusColors = {
  critical: tomato,
  error: pink,
  warning: darkGold,
  ok: green,
  unknown: grey,
  disabled: grey
}

const darkColors = [
  darkBlack, // dark-1
  lightBlack, // dark-2
  darkestGrey, // dark-3
  darkerGrey, // dark-4
  darkGrey, // dark-5
  darkGrey // dark-6 (same as dark-5, could be updated)
]

const lightColors = [
  lightestGrey, // light-1
  lighterGrey, // light-2
  lightGrey, // light-3
  grey, // light-4
  midGrey, // light-5
  moreMiddleGrey // light-6
]

const colors = {
  brand,
  border: {
    dark: 'dark-1',
    light: 'light-2'
  },
  focus: 'accent-2',
  placeholder: 'dark-6',
  statusColors,
  text: {
    dark: lightGrey,
    light: darkGrey
  }
}

const colorArray = (array, prefix) =>
  array.forEach((color, index) => {
    colors[`${prefix}-${index + 1}`] = color
  })

colorArray(accentColors, 'accent')
colorArray(darkColors, 'dark')
colorArray(lightColors, 'light')
colorArray(neutralColors, 'neutral')
Object.keys(statusColors).forEach((color) => {
  colors[`status-${color}`] = statusColors[color]
})

const theme = deepFreeze({
  global: {
    breakpoints: {
      small: {
        edgeSize: {
          small: `15px`,
          medium: `20px`,
          large: `25px`,
          xlarge: `30px`,

          'small-neg': `-15px`,
          'medium-neg': `-20px`,
          'large-neg': `-25px`,
          'xlarge-neg': `-30px`
        }
      }
    },
    colors,
    drop: {
      background: {
        dark: 'dark-1',
        light: 'light-1'
      }
    },
    edgeSize: {
      xxsmall: '5px',
      xsmall: `10px`,
      small: `20px`,
      medium: `30px`,
      large: `50px`,
      xlarge: `90px`,

      'xxsmall-neg': '-5px',
      'xsmall-neg': `-10px`,
      'small-neg': `-20px`,
      'medium-neg': `-30px`,
      'large-neg': `-50px`,
      'xlarge-neg': `-90px`
    },
    elevation: {
      light: {
        none: 'none',
        xsmall: '0px 1px 2px rgba(0, 0, 0, 0.30)',
        small: '0px 2px 4px rgba(0, 0, 0, 0.30)',
        medium: '0px 4px 8px rgba(0, 0, 0, 0.30)',
        large: '0px 8px 16px rgba(0, 0, 0, 0.30)',
        xlarge: '0px 12px 24px rgba(0, 0, 0, 0.30)'
      },
      dark: {
        none: 'none',
        xsmall: '0px 1px 2px rgba(0, 0, 0, 0.30)',
        small: '0px 2px 4px rgba(0, 0, 0, 0.30)',
        medium: '0px 4px 8px rgba(0, 0, 0, 0.30)',
        large: '0px 8px 16px rgba(0, 0, 0, 0.30)',
        xlarge: '0px 12px 24px rgba(0, 0, 0, 0.30)'
      }
    },
    font: {
      family: "'Karla', Arial, sans-serif",
      face: `
        @font-face {
          font-family: 'Karla';
          font-style: normal;
          font-weight: 400;
          src:
            local('Karla'),
            local('Karla-Regular'),
            url(https://fonts.gstatic.com/s/karla/v6/qkBbXvYC6trAT7RVLtyU5rZP.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: 'Karla';
          font-style: normal;
          font-weight: 700;
          src:
            local('Karla Bold'),
            local('Karla-Bold'),
            url(https://fonts.gstatic.com/s/karla/v6/qkBWXvYC6trAT7zuC8m5xLtlmgzD.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
      `
    }
  },
  anchor: {
    color: {
      dark: 'accent-2',
      light: 'brand'
    }
  },
  button: {
    border: {
      color: 'brand',
      radius: '0px'
    },
    padding: {
      // Accounting for the border width. Grommet's default border width is 2px
      horizontal: props => `${parseInt(props.theme.global.edgeSize.small) - 2}px`,
      vertical: props => `${parseInt(props.theme.global.edgeSize.xsmall) - 1}px`
    },
    primary: {
      color: 'brand'
    }
  },
  checkBox: {
    border: {
      color: {
        dark: 'light-3',
        light: 'dark-5'
      }
    },
    check: {
      color: {
        dark: 'accent-2',
        light: 'brand'
      }
    },
    color: {
      dark: 'accent-2',
      light: 'brand'
    },
    hover: {
      border: {
        color: {
          dark: 'accent-2',
          light: 'brand'
        }
      }
    },
    knob: {
      color: {
        dark: 'accent-2',
        light: 'brand'
      }
    },
    toggle: {
      border: {
        color: {
          dark: 'light-3',
          light: 'dark-5'
        }
      },
      color: {
        dark: 'light-3',
        light: 'dark-5'
      }
    }
  },
  heading: { // medium is the default
    // font: {},
    level: {
      1: {
        // "font": {},
        small: {
          size: '32px',
          height: '32px',
          maxWidth: '816px'
        },
        medium: {
          size: '32px',
          height: '37px',
          maxWidth: '1200px'
        },
        large: {
          size: '82px',
          height: '88px',
          maxWidth: '1968px'
        },
        xlarge: {
          size: '114px',
          height: '120px',
          maxWidth: '2736px'
        }
      },
      2: {
        // font: {},
        small: {
          size: '26px',
          height: '26px',
          maxWidth: '624px'
        },
        medium: {
          size: '30px',
          height: '36px',
          maxWidth: '816px'
        },
        large: {
          size: '50px',
          height: '56px',
          maxWidth: '1200px'
        },
        xlarge: {
          size: '66px',
          height: '72px',
          maxWidth: '1584px'
        }
      },
      3: {
        // font: {},
        small: {
          size: '22px',
          height: '22px',
          maxWidth: '528px'
        },
        medium: {
          size: '26px',
          height: '31px',
          maxWidth: '624px'
        },
        large: {
          size: '34px',
          height: '40px',
          maxWidth: '816px'
        },
        xlarge: {
          size: '42px',
          height: '48px',
          maxWidth: '1008px'
        }
      },
      4: { // Same font size as h3, but should be regular not bold.
        font: {
          weight: 'normal'
        },
        small: {
          size: '18px',
          height: '18px',
          maxWidth: '432px'
        },
        medium: {
          size: '26px',
          height: '31px',
          maxWidth: '432px'
        },
        large: {
          size: '18px',
          height: '24px',
          maxWidth: '432px'
        },
        xlarge: {
          size: '18px',
          height: '24px',
          maxWidth: '432px'
        }
      },
      5: {
        // font: {}
        small: {
          size: '14px',
          height: '14px',
          maxWidth: '384px'
        },
        medium: {
          size: '14px',
          height: '17px',
          maxWidth: '384px'
        },
        large: {
          size: '14px',
          height: '17px',
          maxWidth: '384px'
        },
        xlarge: {
          size: '14px',
          height: '17px',
          maxWidth: '384px'
        }
      },
      6: {
        // font: {},
        small: {
          size: '14px',
          height: '14px',
          maxWidth: '336px'
        },
        medium: {
          size: '14px',
          height: '17px',
          maxWidth: '336px'
        },
        large: {
          size: '14px',
          height: '17px',
          maxWidth: '336px'
        },
        xlarge: {
          size: '14px',
          height: '17px',
          maxWidth: '336px'
        }
      }
    },
    responsiveBreakpoint: 'small',
    weight: 600,
    extend: props => `margin: ${props.margin || '10px 0 10px 0'}`
  },
  layer: {
    background: {
      dark: 'dark-1',
      light: 'light-1'
    },
    border: {
      radius: '0px'
    }
  },
  paragraph: {
    small: {
      size: '14px',
      height: '14px',
      maxWidth: '100%'
    },
    medium: {
      size: '14px',
      height: '18px',
      maxWidth: '100%'
    },
    large: {
      size: '18px',
      height: '22px',
      maxWidth: '100%'
    },
    xlarge: {
      size: '22px',
      height: '26px',
      maxWidth: '100%'
    },
    xxlarge: {
      size: '26px',
      height: '30px',
      maxWidth: '100%'
    },
    extend: props => `margin: ${props.margin || '1em 0 1em 0'}`
  },
  radioButton: {
    check: {
      color: {
        dark: 'accent-2',
        light: 'brand'
      }
    },
    color: {
      dark: 'accent-2',
      light: 'brand'
    },
    icon: {
      size: '15px',
      extend: `
        circle {
          r: 10px;
        }
      `
    },
    size: '15px'
  },
  select: {
    icons: {
      color: {
        dark: 'accent-2',
        light: 'brand'
      }
    }
  },
  text: {
    xsmall: {
      size: '12px',
      height: '16px',
      maxWidth: '100%'
    },
    small: {
      size: '14px',
      height: '14px',
      maxWidth: '100%'
    },
    medium: {
      size: '14px',
      height: '18px',
      maxWidth: '100%'
    },
    large: {
      size: '22px',
      height: '26px',
      maxWidth: '100%'
    },
    xlarge: {
      size: '26px',
      height: '30px',
      maxWidth: '100%'
    },
    xxlarge: {
      size: '34px',
      height: '38px',
      maxWidth: '100%'
    }
  }
})

module.exports = theme
