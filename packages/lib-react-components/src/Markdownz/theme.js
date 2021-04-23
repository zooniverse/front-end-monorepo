import { css } from 'styled-components'

export default {
  anchor: {
    fontWeight: 400,
    hover: {
      fontWeight: 600
    },
    textDecoration: 'underline'
  },
  heading: { // medium is the default
    color: {
      dark: 'accent-1',
      light: 'neutral-1'
    },
    level: {
      1: {
        // "font": {},
        small: {
          size: '26px',
          height: '31px',
          maxWidth: '816px'
        },
        medium: {
          size: '26px',
          height: '31px',
          maxWidth: '1200px'
        },
        large: {
          size: '46px',
          height: '51px',
          maxWidth: '1968px'
        },
        xlarge: {
          size: '66px',
          height: '71px',
          maxWidth: '2736px'
        }
      },
      2: {
        small: {
          size: '22px',
          height: '27px',
          maxWidth: '816px'
        },
        medium: {
          size: '22px',
          height: '27px',
          maxWidth: '816px'
        },
        large: {
          size: '42px',
          height: '47px',
          maxWidth: '1968px'
        },
        xlarge: {
          size: '62px',
          height: '67px',
          maxWidth: '2736px'
        }
      },
      3: {
        small: {
          size: '18px',
          height: '23px',
          maxWidth: '528px'
        },
        medium: {
          size: '18px',
          height: '23px',
          maxWidth: '528px'
        },
        large: {
          size: '38px',
          height: '43px',
          maxWidth: '816px'
        },
        xlarge: {
          size: '58px',
          height: '63px',
          maxWidth: '1008px'
        }
      },
      4: {
        font: {
          weight: 'bold'
        },
        small: {
          size: '16px',
          height: '21px',
          maxWidth: '432px'
        },
        medium: {
          size: '16px',
          height: '21px',
          maxWidth: '432px'
        },
        large: {
          size: '36px',
          height: '41px',
          maxWidth: '432px'
        },
        xlarge: {
          size: '56px',
          height: '61px',
          maxWidth: '432px'
        }
      },
      5: {
        small: {
          size: '14px',
          height: '19px',
          maxWidth: '384px'
        },
        medium: {
          size: '14px',
          height: '19px',
          maxWidth: '384px'
        },
        large: {
          size: '34px',
          height: '39px',
          maxWidth: '384px'
        },
        xlarge: {
          size: '54px',
          height: '59px',
          maxWidth: '384px'
        }
      },
      6: {
        small: {
          size: '12px',
          height: '17px',
          maxWidth: '336px'
        },
        medium: {
          size: '12px',
          height: '17px',
          maxWidth: '336px'
        },
        large: {
          size: '32px',
          height: '37px',
          maxWidth: '384px'
        },
        xlarge: {
          size: '52px',
          height: '57px',
          maxWidth: '384px'
        }
      }
    },
    responsiveBreakpoint: 'small',
    weight: 600,
    extend: props => css`
      letter-spacing: -0.5px;
      margin: ${props.margin || '10px 0 10px 0'};
    `
  }
}