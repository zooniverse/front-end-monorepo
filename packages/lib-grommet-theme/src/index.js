import deepFreeze from 'deep-freeze'

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
  error: tomato,
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
    colors,
    edgeSize: {
      xxsmall: '5px',
      xsmall: `10px`,
      small: `20px`,
      medium: `30px`,
      large: `50px`,
      xlarge: `90px`,
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
      radius: '0px'
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
          size: "32px",
          height: "37px",
          maxWidth: "816px"
        },
        medium: {
          size: "32px",
          height: "37px",
          maxWidth: "1200px"
        },
        large: {
          size: "82px",
          height: "88px",
          maxWidth: "1968px"
        },
        xlarge: {
          size: "114px",
          height: "120px",
          maxWidth: "2736px"
        }
      },
      2: {
        // font: {},
        small: {
          size: "26px",
          height: "32px",
          maxWidth: "624px"
        },
        medium: {
          size: "30px",
          height: "36px",
          maxWidth: "816px"
        },
        large: {
          size: "50px",
          height: "56px",
          maxWidth: "1200px"
        },
        xlarge: {
          size: "66px",
          height: "72px",
          maxWidth: "1584px"
        }
      },
      3: {
        // font: {},
        small: {
          size: "22px",
          height: "28px",
          maxWidth: "528px"
        },
        medium: {
          size: "26px",
          height: "31px",
          maxWidth: "624px"
        },
        large: {
          size: "34px",
          height: "40px",
          maxWidth: "816px"
        },
        xlarge: {
          size: "42px",
          height: "48px",
          maxWidth: "1008px"
        }
      },
      4: { // Same font size as h3, but should be regular not bold.
        font: {
          weight: 'normal'
        },
        small: {
          size: "18px",
          height: "24px",
          maxWidth: "432px"
        },
        medium: {
          size: "26px",
          height: "31px",
          maxWidth: "432px"
        },
        large: {
          size: "18px",
          height: "24px",
          maxWidth: "432px"
        },
        xlarge: {
          size: "18px",
          height: "24px",
          maxWidth: "432px"
        }
      },
      5: {
        // font: {}
        small: {
          size: "14px",
          height: "17px",
          maxWidth: "384px"
        },
        medium: {
          size: "14px",
          height: "17px",
          maxWidth: "384px"
        },
        large: {
          size: "14px",
          height: "17px",
          maxWidth: "384px"
        },
        xlarge: {
          size: "14px",
          height: "17px",
          maxWidth: "384px"
        }
      },
      6: {
        // font: {},
        small: {
          size: "14px",
          height: "17px",
          maxWidth: "336px"
        },
        medium: {
          size: "14px",
          height: "17px",
          maxWidth: "336px"
        },
        large: {
          size: "14px",
          height: "17px",
          maxWidth: "336px"
        },
        xlarge: {
          size: "14px",
          height: "17px",
          maxWidth: "336px"
        }
      }
    },
    responsiveBreakpoint: "small",
    weight: 600,
    extend: props => `margin: ${props.margin || '10px 0 10px 0'}`
  },
  layer: {
    border: {
      radius: '0px'
    }
  },
  paragraph: {
    small: {
      size: '12px',
      height: '18px',
      maxWidth: '288px'
    },
    medium: {
      size: '14px',
      height: '22px',
      maxWidth: '336px'
    },
    large: {
      size: '18px',
      height: '26px',
      maxWidth: '432px'
    },
    xlarge: {
      size: '22px',
      height: '30px',
      maxWidth: '528px'
    },
    xxlarge: {
      size: '26px',
      height: '34px',
      maxWidth: '624px'
    },
    extend: props => `margin: ${props.margin || '1em 0 1em 0'}`
  },
  text: {
    xsmall: {
      size: "12px",
      height: "18px",
      maxWidth: "288px"
    },
    small: {
      size: "14px",
      height: "20px",
      maxWidth: "336px"
    },
    medium: {
      size: "18px",
      height: "24px",
      maxWidth: "432px"
    },
    large: {
      size: "22px",
      height: "28px",
      maxWidth: "528px"
    },
    xlarge: {
      size: "26px",
      height: "32px",
      maxWidth: "624px"
    },
    xxlarge: {
      size: "34px",
      height: "40px",
      maxWidth: "816px"
    }
  },
  radioButton: {
    icon: {
      size: 'small'
    },
    size: '15px'
  }
})

export default theme
