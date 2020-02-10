import { darken } from 'polished'
import { css } from 'styled-components'

const theme = {
  button: {
    border: {
      color: 'status-ok',
      width: '1px'
    },
    color: 'white',
    extend: props => {
      const { theme: { dark, global: { colors } } } = props
      const darkerStatusOkColor = darken(0.15, colors['status-ok'])
      const borderColor = dark ? colors['accent-1'] : colors['status-ok']
      return css`
        background: ${colors['status-ok']};
        box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
        flex: 1 1 50%;
        text-transform: capitalize;

        &:disabled:hover {
          cursor: not-allowed;
        }

        &:focus:not(:disabled),
        &:hover:not(:disabled) {
          background: ${darkerStatusOkColor};
          border-color: ${borderColor};
          box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
        }
      `
    },
    padding: {
      horizontal: props => props.theme.global.edgeSize.small,
      vertical: props => props.theme.global.edgeSize.xsmall
    }
  }
}

export default theme
