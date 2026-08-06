import { normalizeColor } from 'grommet/utils'
import { css } from 'styled-components'

const theme = {
  button: {
    border: {
      radius: '4px',
      width: '0'
    },
    color: 'white',
    primary: {
      color: 'neutral-1'
    },
    extend: props => {
      const colorLight = normalizeColor('accent-1', props.theme)  // aka lightTeal,  #addde0
      const colorMid = normalizeColor('brand', props.theme)  // aka Zooniverse teal, #00979d
      const colorDark = normalizeColor('neutral-1', props.theme) // aka darkTeal, #005D69

      return css`
        transition: none;
        text-align: center;

        width: 100%;
        max-width: 350px;

        &:disabled {
          cursor: not-allowed;
          pointer-events: 'none';
        }
        &:hover:not(:disabled) {
          background: linear-gradient(${colorMid}, ${colorDark});
          box-shadow: none;
        }
        &:focus:not(:disabled) {
          outline: 2px solid ${colorLight};
          box-shadow: 0px 0px 10px 0px ${colorLight}99;
        }
        &:active:not(:disabled) {
          background: linear-gradient(${colorDark}, ${colorMid});
        }
    `}
  }
}

export default theme
